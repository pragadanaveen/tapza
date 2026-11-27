import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccessibilityInfo} from 'react-native';
import {create} from 'zustand';

import type {AppearanceMode} from '../theme/types';

const STORAGE_KEY = 'tapza.appearance.v1';

type AppearanceState = {
  preference: AppearanceMode;
  reduceTransparency: boolean;
  systemReduceTransparency: boolean;
  hydrated: boolean;
  setPreference: (preference: AppearanceMode) => Promise<void>;
  setReduceTransparency: (value: boolean) => Promise<void>;
  hydrate: () => Promise<void>;
};

type StoredAppearance = {
  preference?: AppearanceMode;
  reduceTransparency?: boolean;
};

function isAppearanceMode(value: unknown): value is AppearanceMode {
  return value === 'system' || value === 'light' || value === 'dark';
}

async function persist(state: StoredAppearance) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Appearance is a preference, not critical data. Keep the session usable.
  }
}

async function readSystemReduceTransparency(): Promise<boolean> {
  try {
    if (typeof AccessibilityInfo.isReduceTransparencyEnabled === 'function') {
      return await AccessibilityInfo.isReduceTransparencyEnabled();
    }
  } catch {
    // Some platforms do not expose the setting.
  }

  return false;
}

export const useAppearanceStore = create<AppearanceState>((set, get) => ({
  preference: 'system',
  reduceTransparency: false,
  systemReduceTransparency: false,
  hydrated: false,

  setPreference: async preference => {
    set({preference});
    await persist({
      preference,
      reduceTransparency: get().reduceTransparency,
    });
  },

  setReduceTransparency: async reduceTransparency => {
    set({reduceTransparency});
    await persist({
      preference: get().preference,
      reduceTransparency,
    });
  },

  hydrate: async () => {
    if (get().hydrated) {
      return;
    }

    const systemReduceTransparency = await readSystemReduceTransparency();
    let stored: StoredAppearance = {};

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        stored = JSON.parse(raw) as StoredAppearance;
      }
    } catch {
      stored = {};
    }

    set({
      preference: isAppearanceMode(stored.preference)
        ? stored.preference
        : 'system',
      reduceTransparency:
        typeof stored.reduceTransparency === 'boolean'
          ? stored.reduceTransparency
          : false,
      systemReduceTransparency,
      hydrated: true,
    });
  },
}));

export function glassIsReduced(): boolean {
  const state = useAppearanceStore.getState();
  return state.reduceTransparency || state.systemReduceTransparency;
}
