import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';

import type {Prescription, Timing} from '../api/types';
import {translate} from '../i18n';
import {useLanguageStore} from '../store/languageStore';
import {isMedicineActive} from '../utils/prescriptions';

const CHANNEL_ID = 'dose-reminders';
const ID_PREFIX = 'tapza-dose';

/**
 * Wall-clock time each slot of the day reminds the patient. Chosen around
 * an Indian household's day: breakfast, lunch, dinner.
 */
const TIMING_CLOCK: Record<Timing, {hour: number; minute: number}> = {
  morning: {hour: 8, minute: 0},
  afternoon: {hour: 13, minute: 0},
  night: {hour: 21, minute: 0},
};

const TIMING_ORDER: readonly Timing[] = ['morning', 'afternoon', 'night'];

function reminderId(prescriptionId: string, timing: Timing): string {
  return `${ID_PREFIX}-${prescriptionId}-${timing}`;
}

/** The next occurrence of a clock time, always in the future. */
function nextOccurrence(hour: number, minute: number): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);

  if (next.getTime() <= now.getTime()) {
    next.setDate(next.getDate() + 1);
  }

  return next.getTime();
}

let channelReady: Promise<string> | null = null;

/**
 * Android needs a channel before anything can be posted; iOS ignores it.
 * Created once and reused, because `createChannel` on every sync would
 * rebuild the channel and reset any user overrides they made in settings.
 */
export function ensureChannel(): Promise<string> {
  if (!channelReady) {
    channelReady = notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Medicine reminders',
      importance: AndroidImportance.HIGH,
    });
  }

  return channelReady;
}

/**
 * Reads the current notification permission without prompting.
 *
 * Notifee 9 only exposes a *request* API, so Android is answered from
 * `PermissionsAndroid` (notifications are install-time on < Android 13) and
 * iOS reports `NOT_DETERMINED` until the first request — which keeps the
 * toggle usable and lets the system prompt happen on the first enable.
 */
export async function getPermissionStatus(): Promise<AuthorizationStatus> {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version < 33) {
        return AuthorizationStatus.AUTHORIZED;
      }
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return granted
        ? AuthorizationStatus.AUTHORIZED
        : AuthorizationStatus.DENIED;
    }

    return AuthorizationStatus.NOT_DETERMINED;
  } catch {
    // If the native side cannot answer, treat it as not granted rather than
    // pretending reminders are on.
    return AuthorizationStatus.DENIED;
  }
}

/** Prompts once. Returns true when reminders may be scheduled. */
export async function requestPermission(): Promise<boolean> {
  try {
    const settings = await notifee.requestPermission();
    return (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    );
  } catch {
    return false;
  }
}

/** Medicines still in course, grouped by the slot they are taken in. */
function dosesFor(prescription: Prescription): Record<Timing, string[]> {
  const byTiming: Record<Timing, string[]> = {
    morning: [],
    afternoon: [],
    night: [],
  };

  for (const medicine of prescription.medicines) {
    if (!isMedicineActive(medicine, prescription.issuedAt)) {
      continue;
    }
    for (const timing of medicine.timing) {
      byTiming[timing].push(medicine.name);
    }
  }

  return byTiming;
}

export async function cancelPrescriptionReminders(
  prescriptionId: string,
): Promise<void> {
  await Promise.all(
    TIMING_ORDER.map(timing =>
      notifee.cancelNotification(reminderId(prescriptionId, timing)),
    ),
  );
}

/**
 * Replace the reminders for one prescription with a fresh set.
 *
 * Cancel-then-create keeps ids stable, so syncing twice never leaves a
 * duplicate notification behind, and a prescription whose course has ended
 * simply stops reminding.
 */
export async function syncPrescriptionReminders(
  prescription: Prescription,
  enabled: boolean,
): Promise<number> {
  await cancelPrescriptionReminders(prescription.id);
  if (!enabled) {
    return 0;
  }

  const status = await getPermissionStatus();
  if (status === AuthorizationStatus.DENIED) {
    return 0;
  }

  await ensureChannel();
  const locale = useLanguageStore.getState().locale;
  const doses = dosesFor(prescription);
  const medicines = prescription.medicines;
  let scheduled = 0;

  for (const timing of TIMING_ORDER) {
    const names = doses[timing];
    if (names.length === 0 || medicines.length === 0) {
      continue;
    }

    const body = translate(locale, 'remind.notifBody', {
      timing: translate(locale, `timing.${timing}`),
      medicines: names.join(', '),
    });

    await notifee.createTriggerNotification(
      {
        id: reminderId(prescription.id, timing),
        title: translate(locale, 'remind.notifTitle'),
        body,
        data: {prescriptionId: prescription.id, timing},
        android: {
          channelId: CHANNEL_ID,
          importance: AndroidImportance.HIGH,
          pressAction: {id: 'default'},
        },
        ios: {
          sound: 'default',
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: nextOccurrence(
          TIMING_CLOCK[timing].hour,
          TIMING_CLOCK[timing].minute,
        ),
        repeatFrequency: RepeatFrequency.DAILY,
      },
    );
    scheduled += 1;
  }

  return scheduled;
}

/** Drops every reminder this app has scheduled. */
export async function cancelAllReminders(): Promise<void> {
  // The app only ever schedules dose reminders, so a full sweep is safe and
  // is the only way to clear triggers whose ids we no longer track.
  await notifee.cancelAllNotifications();
}
