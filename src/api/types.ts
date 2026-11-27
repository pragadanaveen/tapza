export type Timing = 'morning' | 'afternoon' | 'night';

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  feeInr: number;
  languages: string[];
};

export type Slot = {
  id: string;
  doctorId: string;
  startsAt: string;
  endsAt: string;
  available: boolean;
};

export type Booking = {
  id: string;
  doctorId: string;
  slotId: string;
  startsAt: string;
  endsAt: string;
  status: 'confirmed';
  createdAt: string;
  doctorName: string;
  specialty: string;
  photoUrl: string;
  feeInr: number;
  clinicName: string;
  serviceName?: string;
};

export type BookingRecord = Booking & {
  syncState: 'pending' | 'confirmed';
};

export type Medicine = {
  id: string;
  name: string;
  dose: string;
  days: number;
  timing: Timing[];
};

export type Prescription = {
  id: string;
  issuedAt: string;
  doctorName: string;
  clinicName: string;
  medicines: Medicine[];
};
