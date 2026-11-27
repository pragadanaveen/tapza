import type {FestivalConfig} from '../config/types';
import type {hit, motion, radii, spacing, typography} from './tokens';

export type AppearanceMode = 'system' | 'light' | 'dark';
export type ResolvedAppearance = 'light' | 'dark';

export type ThemeColors = {
  primary: string;
  primaryFill: string;
  secondary: string;
  secondaryText: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentText: string;

  onPrimary: string;
  onSecondary: string;
  onAccent: string;

  border: string;
  subtle: string;
  scrim: string;

  success: string;
  danger: string;
  warning: string;
  disabled: string;
};

export type GlassTokens = {
  blurType: 'light' | 'dark';
  blurAmount: number;
  tint: string;
  tintStrong: string;
  tintSoft: string;
  border: string;
  borderStrong: string;
  highlight: string;
  shadow: string;
  fallback: string;
  fallbackStrong: string;
  tabBarTint: string;
  sheetTint: string;
  scrim: string;
  activePill: string;
  activePillText: string;
};

export type AmbientTokens = {
  gradient: [string, string, string];
  orbPrimary: string;
  orbSecondary: string;
  orbAccent: string;
  line: string;
};

export type Theme = {
  colors: ThemeColors;
  glass: GlassTokens;
  ambient: AmbientTokens;
  appearance: ResolvedAppearance;
  festival?: FestivalConfig;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  hit: typeof hit;
  motion: typeof motion;
  isDark: boolean;
};
