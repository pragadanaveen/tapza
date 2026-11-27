import type {en} from './locales/en';

/** Languages the app ships with. */
export type Locale = 'en' | 'hi' | 'te';

/** Every translatable string in the app. Derived from the English catalogue. */
export type TranslationKey = keyof typeof en;

/** Values substituted into `{placeholders}`. */
export type TranslationParams = Record<string, string | number>;

export type Translator = (
  key: TranslationKey,
  params?: TranslationParams,
) => string;
