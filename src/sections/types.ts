export type HeroItem = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  imageUrl?: string;
  highlights: string[];
};

export type CategoryItem = {
  id: string;
  label: string;
  icon?: string;
};

export type QuickActionItem = {
  id: string;
  label: string;
  icon: string;
  action: string;
};

export type DoctorItem = {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  feeInr: number;
  languages: string[];
  nextSlot?: string;
};

export type ServiceItem = {
  id: string;
  name: string;
  priceInr: number;
  imageUrl: string;
  badge?: string;
  doctorId?: string;
  doctorName?: string;
  specialty?: string;
  photoUrl?: string;
  feeInr?: number;
  description?: string;
};

export type OfferItem = {
  id: string;
  message: string;
};
