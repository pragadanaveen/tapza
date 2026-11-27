import {en} from './locales/en';
import {hi} from './locales/hi';
import {te} from './locales/te';
import type {
  Locale,
  TranslationKey,
  TranslationParams,
  Translator,
} from './types';

type Catalogue = Record<TranslationKey, string>;

const CATALOGUES: Record<Locale, Catalogue> = {en, hi, te};

export type LocaleOption = {
  id: Locale;
  /** Shown in the picker in the app's own writing system. */
  label: string;
  /** Shown next to it so an English reader can still tell them apart. */
  hint: string;
};

export const LOCALES: LocaleOption[] = [
  {id: 'en', label: 'English', hint: 'English'},
  {id: 'hi', label: 'हिन्दी', hint: 'Hindi'},
  {id: 'te', label: 'తెలుగు', hint: 'Telugu'},
];

export const DEFAULT_LOCALE: Locale = 'en';

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}

/**
 * Translate a key in the given locale, falling back to English for a key the
 * catalogue is missing (a stale build) and to the raw key only as a last
 * resort so a typo is visible in development.
 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: TranslationParams,
): string {
  const catalogue = CATALOGUES[locale] ?? CATALOGUES.en;
  const template = catalogue[key] ?? CATALOGUES.en[key];

  if (template === undefined) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(`[i18n] missing key: ${key}`);
    }
    return key;
  }

  return interpolate(template, params);
}

/** Builds a `t` bound to one locale, so components can memoise it. */
export function createTranslator(locale: Locale): Translator {
  return (key, params) => translate(locale, key, params);
}

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'hi' || value === 'te';
}
