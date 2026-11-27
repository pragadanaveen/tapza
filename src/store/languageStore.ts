import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

import {DEFAULT_LOCALE, isLocale} from '../i18n';
import type {Locale} from '../i18n/types';

const STORAGE_KEY = 'tapza.language.v1';

type LanguageState = {
  locale: Locale;
  hydrated: boolean;
  setLocale: (locale: Locale) => Promise<void>;
  hydrate: () => Promise<void>;
};

/**
 * The chosen language survives a restart, like the appearance preference it
 * sits next to. A language choice that resets on every launch would be worse
 * than no choice at all for a user who reads only Telugu.
 */
export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: DEFAULT_LOCALE,
  hydrated: false,

  setLocale: async locale => {
    set({locale});
    try {
      await AsyncStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // The session keeps the new language even if it cannot be persisted.
    }
  },

  hydrate: async () => {
    if (get().hydrated) {
      return;
    }

    let locale: Locale = DEFAULT_LOCALE;
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) {
        locale = stored;
      }
    } catch {
      locale = DEFAULT_LOCALE;
    }

    set({locale, hydrated: true});
  },
}));
