import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

import {fetchPrescriptions} from '../api/client';
import type {Prescription, Timing} from '../api/types';
import {
  cancelAllReminders,
  syncPrescriptionReminders,
} from '../reminders/reminders';

const TAKEN_KEY = '@tapza/taken-doses-v1';
const REMINDERS_KEY = '@tapza/reminders-v1';

export type PrescriptionStatus = 'idle' | 'loading' | 'ready' | 'error';

export const TIMINGS: readonly Timing[] = ['morning', 'afternoon', 'night'];

function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function doseKey(
  prescriptionId: string,
  medicineId: string,
  timing: Timing,
  date = localDateKey(),
): string {
  return `${date}::${prescriptionId}::${medicineId}::${timing}`;
}

type PrescriptionState = {
  items: Prescription[];
  status: PrescriptionStatus;
  error: string | null;
  taken: Record<string, true>;
  /** Prescriptions the patient asked to be reminded about, by id. */
  reminders: Record<string, true>;
  hydrated: boolean;
  load: (force?: boolean) => Promise<void>;
  hydrate: () => Promise<void>;
  toggleDose: (
    prescriptionId: string,
    medicineId: string,
    timing: Timing,
  ) => void;
  toggleReminder: (prescriptionId: string) => Promise<void>;
  syncAllReminders: () => Promise<void>;
  resetTaken: () => Promise<void>;
  resetReminders: () => Promise<void>;
};

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Your prescriptions could not be loaded right now.';
}

let hydration: Promise<void> | null = null;

export const usePrescriptionStore = create<PrescriptionState>((set, get) => ({
  items: [],
  status: 'idle',
  error: null,
  taken: {},
  reminders: {},
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) {
      return;
    }
    if (hydration) {
      return hydration;
    }

    hydration = (async () => {
      try {
        const [rawTaken, rawReminders] = await Promise.all([
          AsyncStorage.getItem(TAKEN_KEY),
          AsyncStorage.getItem(REMINDERS_KEY),
        ]);
        if (rawTaken) {
          const parsed = JSON.parse(rawTaken) as Record<string, true>;
          if (parsed && typeof parsed === 'object') {
            set({taken: parsed});
          }
        }
        if (rawReminders) {
          const parsed = JSON.parse(rawReminders) as Record<string, true>;
          if (parsed && typeof parsed === 'object') {
            set({reminders: parsed});
          }
        }
      } catch {
        // Dose history and reminder choices are a convenience; never block
        // the app on them.
      } finally {
        set({hydrated: true});
        hydration = null;
      }
    })();

    return hydration;
  },

  load: async (force = false) => {
    const state = get();
    if (state.status === 'loading') {
      return;
    }
    if (!force && state.status === 'ready') {
      return;
    }

    set({status: 'loading', error: null});
    try {
      const items = await fetchPrescriptions();
      set({items, status: 'ready', error: null});
    } catch (error) {
      set({status: 'error', error: messageOf(error)});
    }
  },

  toggleDose: (prescriptionId, medicineId, timing) => {
    const key = doseKey(prescriptionId, medicineId, timing);
    const next = {...get().taken};

    if (next[key]) {
      delete next[key];
    } else {
      next[key] = true;
    }

    set({taken: next});
    AsyncStorage.setItem(TAKEN_KEY, JSON.stringify(next)).catch(() => {
      // The in-memory state still works if persistence fails.
    });
  },

  resetTaken: async () => {
    set({taken: {}});
    try {
      await AsyncStorage.removeItem(TAKEN_KEY);
    } catch {
      // Nothing else to do.
    }
  },

  toggleReminder: async prescriptionId => {
    const enabled = !Boolean(get().reminders[prescriptionId]);
    const reminders = {...get().reminders};

    if (enabled) {
      reminders[prescriptionId] = true;
    } else {
      delete reminders[prescriptionId];
    }

    // Flip the switch first so the UI answers immediately, then let the
    // scheduler catch up with it.
    set({reminders});
    AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders)).catch(
      () => {
        // The session keeps the choice even if persistence fails.
      },
    );

    const prescription = get().items.find(item => item.id === prescriptionId);
    if (!prescription) {
      return;
    }

    try {
      await syncPrescriptionReminders(prescription, enabled);
    } catch {
      // A device that refuses notifications must not break the screen; the
      // Profile screen reports the permission state instead.
    }
  },

  syncAllReminders: async () => {
    const {items, reminders} = get();
    for (const prescription of items) {
      try {
        await syncPrescriptionReminders(
          prescription,
          Boolean(reminders[prescription.id]),
        );
      } catch {
        // Same best-effort contract as toggleReminder.
      }
    }
  },

  resetReminders: async () => {
    set({reminders: {}});
    try {
      await AsyncStorage.removeItem(REMINDERS_KEY);
      await cancelAllReminders();
    } catch {
      // Nothing else to do.
    }
  },
}));
