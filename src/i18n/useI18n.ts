import {useMemo} from 'react';

import {useLanguageStore} from '../store/languageStore';
import {createTranslator} from './index';
import type {Locale, TranslationKey, TranslationParams} from './types';

export type I18n = {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

/**
 * Single entry point for the app's language layer. `t` is memoised per
 * locale so screens that call it dozens of times per render do not rebuild
 * a closure on every render.
 */
export function useI18n(): I18n {
  const locale = useLanguageStore(store => store.locale);
  const setLocale = useLanguageStore(store => store.setLocale);

  const t = useMemo(() => createTranslator(locale), [locale]);

  return {locale, setLocale, t};
}
