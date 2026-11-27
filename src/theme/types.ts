import type {FestivalConfig} from '../config/types';
import type {hit, motion, radii, spacing, typography} from './tokens';

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;

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

export type Theme = {
  colors: ThemeColors;
  festival?: FestivalConfig;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  hit: typeof hit;
  motion: typeof motion;
  isDark: boolean;
};
