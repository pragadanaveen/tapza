import type {SectionConfig} from '../config/types';
import type {
  CategoryItem,
  DoctorItem,
  HeroItem,
  OfferItem,
  QuickActionItem,
  ServiceItem,
} from './types';

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0
    ? value
    : undefined;
}

function number(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function firstItem(section?: SectionConfig): Record<string, unknown> | null {
  return record(section?.items?.[0]);
}

export function parseHero(section?: SectionConfig): HeroItem | null {
  const item = firstItem(section);
  if (!item) {
    return null;
  }
  const title = text(item.title);
  if (!title) {
    return null;
  }
  return {
    id: text(item.id) ?? 'hero',
    eyebrow: text(item.eyebrow),
    title,
    subtitle: text(item.subtitle),
    ctaLabel: text(item.ctaLabel),
    imageUrl: text(item.imageUrl),
    highlights: strings(item.highlights),
  };
}

export function parseCategories(section?: SectionConfig): CategoryItem[] {
  return (section?.items ?? []).flatMap(value => {
    const item = record(value);
    const id = text(item?.id);
    const label = text(item?.label);
    if (!id || !label) {
      return [];
    }
    return [{id, label, icon: text(item?.icon)}];
  });
}

export function parseQuickActions(section?: SectionConfig): QuickActionItem[] {
  return (section?.items ?? []).flatMap(value => {
    const item = record(value);
    const id = text(item?.id);
    const label = text(item?.label);
    if (!id || !label) {
      return [];
    }
    return [
      {
        id,
        label,
        icon: text(item?.icon) ?? 'sparkles',
        action: text(item?.action) ?? id,
      },
    ];
  });
}

export function parseDoctors(section?: SectionConfig): DoctorItem[] {
  return (section?.items ?? []).flatMap(value => {
    const item = record(value);
    const id = text(item?.id);
    const name = text(item?.name);
    const specialty = text(item?.specialty);
    const photoUrl = text(item?.photoUrl);
    const feeInr = number(item?.feeInr);
    if (!id || !name || !specialty || !photoUrl || feeInr === undefined) {
      return [];
    }
    return [
      {
        id,
        name,
        specialty,
        photoUrl,
        feeInr,
        languages: strings(item?.languages),
        nextSlot: text(item?.nextSlot),
      },
    ];
  });
}

export function parseServices(section?: SectionConfig): ServiceItem[] {
  return (section?.items ?? []).flatMap(value => {
    const item = record(value);
    const id = text(item?.id);
    const name = text(item?.name);
    const priceInr = number(item?.priceInr);
    const imageUrl = text(item?.imageUrl);
    if (!id || !name || priceInr === undefined || !imageUrl) {
      return [];
    }
    return [
      {
        id,
        name,
        priceInr,
        imageUrl,
        badge: text(item?.badge),
        doctorId: text(item?.doctorId),
        doctorName: text(item?.doctorName),
        specialty: text(item?.specialty),
        photoUrl: text(item?.photoUrl),
        feeInr: number(item?.feeInr),
        description: text(item?.description),
      },
    ];
  });
}

export function parseOffer(section?: SectionConfig): OfferItem | null {
  const item = firstItem(section);
  const message = text(item?.message);
  if (!message) {
    return null;
  }
  return {id: text(item?.id) ?? 'offer', message};
}
