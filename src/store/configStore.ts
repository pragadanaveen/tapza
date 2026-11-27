import {create} from 'zustand';

import {
  DEFAULT_CONFIG,
  DEFAULT_VARIANT,
  VARIANTS,
} from '../config';
import type {ConfigVariant, LayoutConfig} from '../config/types';

type ConfigState = {
  variant: ConfigVariant;
  config: LayoutConfig;
  setVariant: (variant: ConfigVariant) => void;
  setConfig: (config: LayoutConfig) => void;
};

/**
 * Phase 1: bundled configs, switched in memory.
 *
 * Phase 2 will replace `setVariant` with a mocked GET /config call and cache
 * the last good config. The UI will not need to change.
 */
export const useConfigStore = create<ConfigState>(set => ({
  variant: DEFAULT_VARIANT,
  config: DEFAULT_CONFIG,
  setVariant: variant => set({variant, config: VARIANTS[variant].config}),
  setConfig: config => set({config}),
}));
