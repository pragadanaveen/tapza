import {normalConfig} from '../config/variants/normal';
import {pongalConfig} from '../config/variants/pongal';
import type {ConfigVariant} from '../config/types';
import {LATENCY_MS, useNetworkStore} from '../store/networkStore';
import {CLINIC_NAME} from './constants';
import {
  DOCTORS,
  PRESCRIPTIONS,
  slotIdFor,
  slotTimesFor,
} from './mockData';
import type {Booking, Doctor, Prescription, Slot} from './types';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestScope = 'config' | 'general' | 'booking';

function delay(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
}

async function simulate(scope: RequestScope) {
  const {latency, failureMode} = useNetworkStore.getState();
  await delay(LATENCY_MS[latency]);

  if (failureMode === 'all') {
    throw new ApiError(
      503,
      'You appear to be offline. Check your connection and try again.',
    );
  }

  if (scope === 'config' && failureMode === 'config') {
    throw new ApiError(
      503,
      'The clinic configuration could not be reached. We will use the last saved copy.',
    );
  }

  if (scope === 'booking') {
    if (failureMode === 'booking') {
      throw new ApiError(
        503,
        'The booking service is temporarily unavailable. Please try again.',
      );
    }
    if (failureMode === 'slotConflict') {
      throw new ApiError(
        409,
        'That slot was just taken. Please choose another time.',
      );
    }
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const bookedSlotIds = new Set<string>();

function ensureDoctor(doctorId: string): Doctor {
  const doctor = DOCTORS.find(item => item.id === doctorId);
  if (!doctor) {
    throw new ApiError(404, 'That doctor could not be found.');
  }
  return doctor;
}

function isValidDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseDateKey(value: string): Date {
  if (!isValidDateKey(value)) {
    throw new ApiError(400, 'Please choose a valid date.');
  }
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year!, month! - 1, day!);
}

function combine(date: string, time: string): Date {
  const base = parseDateKey(date);
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(base);
  result.setHours(hours!, minutes!, 0, 0);
  return result;
}

function isPast(startsAt: Date): boolean {
  return startsAt.getTime() <= Date.now() + 20 * 60 * 1000;
}

function buildSlot(
  doctorId: string,
  date: string,
  time: string,
  index: number,
): Slot {
  const startsAt = combine(date, time);
  const endsAt = new Date(startsAt.getTime() + 30 * 60 * 1000);
  const day = parseDateKey(date).getDate();
  const doctorIndex = DOCTORS.findIndex(doctor => doctor.id === doctorId);
  const id = slotIdFor(doctorId, date, time);
  const blockedByClinic = (day + index + doctorIndex) % 7 === 0;

  return {
    id,
    doctorId,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    available: !isPast(startsAt) && !blockedByClinic && !bookedSlotIds.has(id),
  };
}

function slotsFor(doctorId: string, date: string): Slot[] {
  ensureDoctor(doctorId);
  return slotTimesFor(doctorId)
    .map((time, index) => buildSlot(doctorId, date, time, index))
    .sort(
      (first, second) =>
        new Date(first.startsAt).getTime() -
        new Date(second.startsAt).getTime(),
    );
}

export async function fetchConfig(variant: ConfigVariant) {
  await simulate('config');
  return clone(variant === 'pongal' ? pongalConfig : normalConfig);
}

export async function fetchDoctors(): Promise<Doctor[]> {
  await simulate('general');
  if (useNetworkStore.getState().emptyLists) {
    return [];
  }
  return clone(DOCTORS);
}

export async function fetchSlots(
  doctorId: string,
  date: string,
): Promise<Slot[]> {
  await simulate('general');
  ensureDoctor(doctorId);
  if (useNetworkStore.getState().emptyLists) {
    return [];
  }
  return slotsFor(doctorId, date);
}

export async function createBooking(input: {
  doctorId: string;
  slotId: string;
}): Promise<Booking> {
  await simulate('booking');

  const doctor = ensureDoctor(input.doctorId);
  const [doctorId, date, compactTime] = input.slotId.split('__');
  if (!doctorId || !date || !compactTime) {
    throw new ApiError(400, 'That slot could not be found.');
  }

  const time = `${compactTime.slice(0, 2)}:${compactTime.slice(2, 4)}`;
  const index = slotTimesFor(doctorId).indexOf(time);
  if (doctorId !== input.doctorId || index < 0) {
    throw new ApiError(400, 'That slot could not be found.');
  }

  const slot = buildSlot(doctorId, date, time, index);
  if (!slot.available) {
    throw new ApiError(
      409,
      'That slot was just taken. Please choose another time.',
    );
  }

  bookedSlotIds.add(slot.id);

  return {
    id: `bk-${Date.now()}`,
    doctorId,
    slotId: slot.id,
    startsAt: slot.startsAt,
    endsAt: slot.endsAt,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    doctorName: doctor.name,
    specialty: doctor.specialty,
    photoUrl: doctor.photoUrl,
    feeInr: doctor.feeInr,
    clinicName: CLINIC_NAME,
  };
}

export async function fetchPrescriptions(): Promise<Prescription[]> {
  await simulate('general');
  if (useNetworkStore.getState().emptyLists) {
    return [];
  }
  return clone(PRESCRIPTIONS);
}

/** Local demo reset. Booked slots are held in memory by the mock. */
export function resetMockApi() {
  bookedSlotIds.clear();
}
