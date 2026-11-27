import type {LayoutConfig} from '../types';

const FESTIVAL_BANNER =
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80';
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
 * Pongal at Tapza.
 *
 * Deliberately different from the everyday config: the banner, colours,
 * section order, tab order and a few items all change at runtime.
 */
export const pongalConfig: LayoutConfig = {
  version: 1,
  theme: {
    primary: '#245C3A',
    secondary: '#B5542D',
    background: '#FFF6E4',
    surface: '#FFFDF8',
    textPrimary: '#2A2118',
    textSecondary: '#6E5C4C',
    accent: '#D99A1E',
    festival: {
      name: 'Pongal',
      greeting: 'Happy Pongal',
      bannerImageUrl: FESTIVAL_BANNER,
    },
  },
  tabs: [
    {id: 'home', label: 'Home', icon: 'home', screen: 'home'},
    {id: 'meds', label: 'Meds', icon: 'medkit', screen: 'prescriptions'},
    {id: 'bookings', label: 'Bookings', icon: 'calendar', screen: 'bookings'},
    {id: 'profile', label: 'Profile', icon: 'person', screen: 'profile'},
  ],
  sections: [
    {
      id: 'hero',
      type: 'hero_banner',
      title: 'Pongal care',
      background: {
        kind: 'image',
        value: FESTIVAL_BANNER,
      },
      items: [
        {
          id: 'hero-pongal',
          eyebrow: 'Tapza Clinic · Jubilee Hills',
          title: 'Happy Pongal',
          subtitle:
            'Celebrate with family. We will keep the care close — book a festive health check.',
          ctaLabel: 'Book a festive check',
          imageUrl: FESTIVAL_BANNER,
        },
      ],
    },
    {
      id: 'offer',
      type: 'offer_strip',
      background: {kind: 'color', value: '#D99A1E'},
      items: [
        {
          id: 'offer-pongal',
          message: 'Pongal offer: 20% off health checkups this week',
        },
      ],
    },
    {
      id: 'categories',
      type: 'category_chips',
      title: 'Festive care',
      background: {kind: 'color', value: '#FFF6E4'},
      items: [
        {id: 'checkups', label: 'Health checkups', icon: 'heart'},
        {id: 'consult', label: 'Consult', icon: 'stethoscope'},
        {id: 'pharmacy', label: 'Pharmacy', icon: 'medkit'},
        {id: 'vaccines', label: 'Vaccines', icon: 'shield-checkmark'},
        {id: 'family', label: 'Family care', icon: 'people'},
      ],
    },
    {
      id: 'services',
      type: 'service_grid',
      title: 'Pongal packages',
      background: {kind: 'color', value: '#FFFDF8'},
      items: [
        {
          id: 'pongal-package',
          name: 'Pongal family checkup',
          priceInr: 999,
          imageUrl: CARE_IMAGE,
          badge: 'Pongal special',
          doctorId: 'dr-ananya',
        },
        {
          id: 'sugar-panel',
          name: 'Sugar & BP screening',
          priceInr: 399,
          imageUrl: PILLS_IMAGE,
          badge: 'Save ₹200',
          doctorId: 'dr-ananya',
        },
        {
          id: 'wound-care',
          name: 'Dressing & wound care',
          priceInr: 300,
          imageUrl: CARE_IMAGE,
          doctorId: 'dr-imran',
        },
        {
          id: 'flu-vaccine',
          name: 'Flu vaccine',
          priceInr: 450,
          imageUrl: CARE_IMAGE,
          doctorId: 'dr-lakshmi',
        },
      ],
    },
    {
      id: 'doctors',
      type: 'doctor_carousel',
      title: 'Doctors on duty this Pongal',
      background: {kind: 'color', value: '#F3EAD8'},
      items: [
        {
          id: 'dr-ananya',
          name: 'Dr. Ananya Rao',
          specialty: 'General Physician',
          photoUrl: DOCTOR_ONE,
          feeInr: 500,
          languages: ['Telugu', 'Hindi', 'English'],
          nextSlot: 'Today, 11:00 AM',
        },
        {
          id: 'dr-lakshmi',
          name: 'Dr. Lakshmi Prasad',
          specialty: 'Paediatrician',
          photoUrl: DOCTOR_THREE,
          feeInr: 550,
          languages: ['Telugu', 'English'],
          nextSlot: 'Today, 3:30 PM',
        },
        {
          id: 'dr-imran',
          name: 'Dr. Imran Khan',
          specialty: 'Dermatologist',
          photoUrl: DOCTOR_TWO,
          feeInr: 650,
          languages: ['Hindi', 'English'],
          nextSlot: 'Tomorrow, 9:30 AM',
        },
      ],
    },
    {
      id: 'quick-actions',
      type: 'quick_actions',
      title: 'Quick actions',
      background: {kind: 'color', value: '#FFFDF8'},
      items: [
        {id: 'book', label: 'Book', icon: 'calendar', action: 'book'},
        {id: 'prescriptions', label: 'Prescriptions', icon: 'document', action: 'prescriptions'},
        {id: 'reminders', label: 'Reminders', icon: 'alarm', action: 'reminders'},
        {id: 'family', label: 'Family', icon: 'people', action: 'family'},
      ],
    },
  ],
};
