import type {LayoutConfig} from '../types';

const CLINIC_IMAGE =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80';
const DOCTOR_ONE =
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80';
const DOCTOR_TWO =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80';
const DOCTOR_THREE =
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80';
const PILLS_IMAGE =
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
const CARE_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80';

/**
 * Everyday care.
 *
 * This is the config the app boots with. All colour, tab order and home
 * section order lives here so an admin can change it without a release.
 */
export const normalConfig: LayoutConfig = {
  version: 1,
  theme: {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#18181B',
    textSecondary: '#52525B',
    accent: '#C4B5FD',
    dark: {
      background: '#0B0B0E',
      surface: '#18181B',
      textPrimary: '#FAFAFA',
      textSecondary: '#A1A1AA',
    },
  },
  tabs: [
    {id: 'home', label: 'Home', icon: 'home', screen: 'home'},
    {id: 'bookings', label: 'Bookings', icon: 'calendar', screen: 'bookings'},
    {id: 'meds', label: 'Meds', icon: 'medkit', screen: 'prescriptions'},
    {id: 'profile', label: 'Profile', icon: 'person', screen: 'profile'},
  ],
  sections: [
    {
      id: 'hero',
      type: 'hero_banner',
      title: 'Care, close to home',
      background: {
        kind: 'gradient',
        value: '#7C3AED,#4C1D95',
      },
      items: [
        {
          id: 'hero-everyday',
          eyebrow: 'Tapza Clinic · Jubilee Hills',
          title: 'Care for your family, close to home',
          subtitle:
            'Book a doctor, order medicines or check a prescription — all in one place.',
          ctaLabel: 'Book a visit',
          imageUrl: CLINIC_IMAGE,
          highlights: ['Open today · 9 AM–7 PM', 'Jubilee Hills, Hyderabad'],
        },
      ],
    },
    {
      id: 'quick-actions',
      type: 'quick_actions',
      title: 'What do you need?',
      background: {kind: 'color', value: '#FFFFFF'},
      items: [
        {id: 'book', label: 'Book', icon: 'calendar', action: 'book'},
        {id: 'prescriptions', label: 'Prescriptions', icon: 'document', action: 'prescriptions'},
        {id: 'reminders', label: 'Reminders', icon: 'alarm', action: 'reminders'},
        {id: 'family', label: 'Family', icon: 'people', action: 'family'},
      ],
    },
    {
      id: 'categories',
      type: 'category_chips',
      title: 'Explore care',
      background: {kind: 'color', value: '#EDE9FE'},
      items: [
        {id: 'consult', label: 'Consult', icon: 'stethoscope'},
        {id: 'labs', label: 'Lab tests', icon: 'flask'},
        {id: 'pharmacy', label: 'Pharmacy', icon: 'medkit'},
        {id: 'vaccines', label: 'Vaccines', icon: 'shield-checkmark'},
        {id: 'home-care', label: 'Home care', icon: 'home'},
      ],
    },
    {
      id: 'doctors',
      type: 'doctor_carousel',
      title: 'Doctors available today',
      background: {kind: 'color', value: '#F5F3FF'},
      items: [
        {
          id: 'dr-ananya',
          name: 'Dr. Ananya Rao',
          specialty: 'General Physician',
          photoUrl: DOCTOR_ONE,
          feeInr: 500,
          languages: ['Telugu', 'Hindi', 'English'],
          nextSlot: 'Today, 10:30 AM',
        },
        {
          id: 'dr-imran',
          name: 'Dr. Imran Khan',
          specialty: 'Dermatologist',
          photoUrl: DOCTOR_TWO,
          feeInr: 650,
          languages: ['Hindi', 'English'],
          nextSlot: 'Today, 12:00 PM',
        },
        {
          id: 'dr-lakshmi',
          name: 'Dr. Lakshmi Prasad',
          specialty: 'Paediatrician',
          photoUrl: DOCTOR_THREE,
          feeInr: 550,
          languages: ['Telugu', 'English'],
          nextSlot: 'Today, 4:15 PM',
        },
      ],
    },
    {
      id: 'services',
      type: 'service_grid',
      title: 'Clinic services',
      background: {kind: 'color', value: '#FFFFFF'},
      items: [
        {
          id: 'full-body',
          name: 'Full body checkup',
          priceInr: 1499,
          imageUrl: CARE_IMAGE,
          badge: 'Popular',
          doctorId: 'dr-ananya',
          doctorName: 'Dr. Ananya Rao',
          specialty: 'General Physician',
          feeInr: 500,
        },
        {
          id: 'diabetes-panel',
          name: 'Diabetes care panel',
          priceInr: 599,
          imageUrl: PILLS_IMAGE,
          doctorId: 'dr-ananya',
          doctorName: 'Dr. Ananya Rao',
          specialty: 'General Physician',
          feeInr: 500,
        },
        {
          id: 'dressing',
          name: 'Dressing & wound care',
          priceInr: 300,
          imageUrl: CLINIC_IMAGE,
          doctorId: 'dr-imran',
          doctorName: 'Dr. Imran Khan',
          specialty: 'Dermatologist',
          feeInr: 650,
        },
        {
          id: 'flu-vaccine',
          name: 'Flu vaccine',
          priceInr: 450,
          imageUrl: CARE_IMAGE,
          badge: 'Walk-in',
          doctorId: 'dr-lakshmi',
          doctorName: 'Dr. Lakshmi Prasad',
          specialty: 'Paediatrician',
          feeInr: 550,
        },
      ],
    },
    {
      id: 'offer',
      type: 'offer_strip',
      background: {kind: 'color', value: '#F59E0B'},
      items: [
        {
          id: 'offer-everyday',
          message: 'Free follow-up within 7 days of your visit',
        },
      ],
    },
  ],
};
