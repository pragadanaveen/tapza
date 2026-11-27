import type {ConfigVariant, LayoutConfig} from './types';
import {normalConfig} from './variants/normal';
import {pongalConfig} from './variants/pongal';

export type VariantDefinition = {
  id: ConfigVariant;
  label: string;
  shortLabel: string;
  config: LayoutConfig;
};

export const VARIANTS: Record<ConfigVariant, VariantDefinition> = {
  normal: {
    id: 'normal',
    label: 'Everyday care',
    shortLabel: 'Everyday',
    config: normalConfig,
  },
  pongal: {
    id: 'pongal',
    label: 'Pongal festival',
    shortLabel: 'Pongal',
    config: pongalConfig,
  },
};

export const DEFAULT_VARIANT: ConfigVariant = 'normal';
export const DEFAULT_CONFIG = normalConfig;
