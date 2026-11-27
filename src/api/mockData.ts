import type {Doctor, Prescription} from './types';

const PHOTO_ANANYA =
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80';
const PHOTO_IMRAN =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80';
const PHOTO_LAKSHMI =
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80';

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Rao',
    specialty: 'General Physician',
    photoUrl: PHOTO_ANANYA,
    feeInr: 500,
    languages: ['Telugu', 'Hindi', 'English'],
  },
  {
    id: 'dr-imran',
    name: 'Dr. Imran Khan',
    specialty: 'Dermatologist',
    photoUrl: PHOTO_IMRAN,
    feeInr: 650,
    languages: ['Hindi', 'English'],
  },
  {
    id: 'dr-lakshmi',
    name: 'Dr. Lakshmi Prasad',
    specialty: 'Paediatrician',
    photoUrl: PHOTO_LAKSHMI,
    feeInr: 550,
    languages: ['Telugu', 'English'],
  },
];

const SLOT_TIMES: Record<string, string[]> = {
  'dr-ananya': [
    '09:00',
    '09:30',
    '10:30',
    '11:30',
    '12:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ],
  'dr-imran': ['10:00', '11:00', '11:45', '16:00', '17:00', '18:30'],
  'dr-lakshmi': ['09:30', '10:30', '11:30', '15:30', '16:30', '17:30'],
};

export function slotTimesFor(doctorId: string): string[] {
  return SLOT_TIMES[doctorId] ?? SLOT_TIMES['dr-ananya'];
}

export function slotIdFor(doctorId: string, date: string, time: string) {
  return `${doctorId}__${date}__${time.replace(':', '')}`;
}

function daysAgo(days: number, hour = 10): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

/**
 * Two realistic Hyderabad prescriptions plus one older Vijayawada visit.
 * Doses are intentionally mixed across morning, afternoon and night so the
 * schedule screen has something meaningful to show.
 */
export const PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-1042',
    issuedAt: daysAgo(2, 11),
    doctorName: 'Dr. Ananya Rao',
    clinicName: 'Tapza Clinic, Jubilee Hills',
    medicines: [
      {
        id: 'med-azithro',
        name: 'Azithromycin 500 mg',
        dose: '1 tablet after food',
        days: 3,
        timing: ['morning'],
      },
      {
        id: 'med-paracetamol',
        name: 'Paracetamol 650 mg',
        dose: '1 tablet if fever',
        days: 3,
        timing: ['morning', 'afternoon', 'night'],
      },
      {
        id: 'med-pantoprazole',
        name: 'Pantoprazole 40 mg',
        dose: '1 tablet before breakfast',
        days: 5,
        timing: ['morning'],
      },
      {
        id: 'med-ors',
        name: 'ORS sachet',
        dose: '1 sachet in 1 litre water',
        days: 2,
        timing: ['afternoon'],
      },
    ],
  },
  {
    id: 'rx-0987',
    issuedAt: daysAgo(12, 17),
    doctorName: 'Dr. Imran Khan',
    clinicName: 'Tapza Skin & Care, Jubilee Hills',
    medicines: [
      {
        id: 'med-cetirizine',
        name: 'Cetirizine 10 mg',
        dose: '1 tablet at bedtime',
        days: 5,
        timing: ['night'],
      },
      {
        id: 'med-mupirocin',
        name: 'Mupirocin cream 2%',
        dose: 'Apply a thin layer on the rash',
        days: 7,
        timing: ['morning', 'night'],
      },
      {
        id: 'med-vitd',
        name: 'Vitamin D3 60K',
        dose: '1 sachet with milk, once a week',
        days: 28,
        timing: ['morning'],
      },
    ],
  },
  {
    id: 'rx-0764',
    issuedAt: daysAgo(22, 9),
    doctorName: 'Dr. Lakshmi Prasad',
    clinicName: 'Tapza Children’s Clinic, Vijayawada',
    medicines: [
      {
        id: 'med-amoxicillin',
        name: 'Amoxicillin 250 mg',
        dose: '5 ml with a measuring cup',
        days: 5,
        timing: ['morning', 'afternoon', 'night'],
      },
      {
        id: 'med-zinc',
        name: 'Zinc syrup',
        dose: '5 ml after food',
        days: 14,
        timing: ['afternoon'],
      },
    ],
  },
];
