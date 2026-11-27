import type {Medicine, Prescription} from '../api/types';
import {dateKey, parseDateKey} from './date';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 1-based day of a course. `issuedAt` is an ISO timestamp; both ends are
 * normalised to local calendar days so daylight-saving or time-of-day cannot
 * make a three-day course last four.
 */
export function courseDay(issuedAt: string, today = new Date()): number {
  const issued = parseDateKey(dateKey(new Date(issuedAt)));
  const current = parseDateKey(dateKey(today));
  return Math.floor((current.getTime() - issued.getTime()) / DAY_MS) + 1;
}

export function isMedicineActive(
  medicine: Medicine,
  issuedAt: string,
  today = new Date(),
): boolean {
  const day = courseDay(issuedAt, today);
  return day >= 1 && day <= medicine.days;
}

export function activeMedicines(
  prescription: Prescription,
  today = new Date(),
): Medicine[] {
  return prescription.medicines.filter(medicine =>
    isMedicineActive(medicine, prescription.issuedAt, today),
  );
}

export function doseCount(medicines: readonly Medicine[]): number {
  return medicines.reduce((total, medicine) => total + medicine.timing.length, 0);
}
