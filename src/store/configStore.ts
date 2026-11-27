import {create} from 'zustand';

import {DEFAULT_CONFIG, DEFAULT_VARIANT} from '../config';
import {
  loadConfig,
  type ConfigSource,
} from '../config/service';
import type {ConfigVariant, LayoutConfig} from '../config/types';

export type ConfigStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'stale'
  | 'fallback'
  | 'error';

type ConfigState = {
  /** The variant whose config is currently on screen. */
  variant: ConfigVariant;
  /** The variant the user last asked for. */
  requestedVariant: ConfigVariant;
  config: LayoutConfig;
  status: ConfigStatus;
  error: string | null;
  source: ConfigSource | null;
  lastUpdated: string | null;
  initialized: boolean;
  bootstrap: () => Promise<void>;
  switchVariant: (variant: ConfigVariant) => Promise<void>;
  retry: () => Promise<void>;
  reload: () => Promise<void>;
};

let requestId = 0;

export const useConfigStore = create<ConfigState>((set, get) => {
  async function runLoad(
    variant: ConfigVariant,
    mode: 'boot' | 'switch' | 'reload',
  ) {
    const token = ++requestId;
    set({status: 'loading', error: null});

    const result = await loadConfig(variant);
    if (token !== requestId) {
      return;
    }

    const failedSwitch =
      mode !== 'boot' &&
      (result.source === 'fallback' ||
        (result.source === 'cache' && result.variant !== variant));

    if (failedSwitch) {
      set({
        status: 'error',
        error:
          result.error ??
          'The new theme could not be loaded. The current theme is still active.',
        initialized: true,
        requestedVariant: variant,
      });
      return;
    }

    set({
      config: result.config,
      variant: result.variant,
      requestedVariant: result.variant,
      status:
        result.source === 'remote'
          ? 'ready'
          : result.source === 'cache'
            ? 'stale'
            : 'fallback',
      error: result.error,
      source: result.source,
      lastUpdated: result.savedAt,
      initialized: true,
    });
  }

  return {
    variant: DEFAULT_VARIANT,
    requestedVariant: DEFAULT_VARIANT,
    config: DEFAULT_CONFIG,
    status: 'idle',
    error: null,
    source: null,
    lastUpdated: null,
    initialized: false,

    bootstrap: async () => {
      if (get().initialized || get().status !== 'idle') {
        return;
      }
      await runLoad(get().requestedVariant, 'boot');
    },

    switchVariant: async variant => {
      const state = get();
      if (variant === state.variant && state.status === 'ready') {
        return;
      }
      set({requestedVariant: variant});
      await runLoad(variant, 'switch');
    },

    retry: async () => {
      await runLoad(get().requestedVariant, 'reload');
    },

    reload: async () => {
      await runLoad(get().requestedVariant, 'reload');
    },
  };
});
