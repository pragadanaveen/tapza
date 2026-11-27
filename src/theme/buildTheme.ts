import type {ThemeConfig} from '../config/types';
import {
  alpha,
  contrastRatio,
  luminance,
  readableOn,
  withContrast,
} from './color';
import {hit, motion, radii, spacing, typography} from './tokens';
import type {Theme, ThemeColors} from './types';

function accessibleText(
  color: string,
  backgrounds: string[],
  fallback: string,
): string {
  return backgrounds.every(background => contrastRatio(color, background) >= 4.5)
    ? color
    : fallback;
}

/**
 * Turns the remote palette into the complete theme used by the app.
 *
 * Nothing in a component should have to guess an on-colour, border or
 * disabled state. It all comes from here.
 */
export function buildTheme(remote: ThemeConfig): Theme {
  const isDark = luminance(remote.background) < 0.45;

  const textPrimary = accessibleText(
    remote.textPrimary,
    [remote.background, remote.surface],
    readableOn(remote.background),
  );

  const textSecondary = accessibleText(
    remote.textSecondary,
    [remote.background, remote.surface],
    textPrimary,
  );

  const colors: ThemeColors = {
    primary: remote.primary,
    secondary: remote.secondary,
    background: remote.background,
    surface: remote.surface,
    textPrimary,
    textSecondary,
    accent: remote.accent,

    onPrimary: readableOn(remote.primary),
    onSecondary: readableOn(remote.secondary),
    onAccent: readableOn(remote.accent),

    border: alpha(textPrimary, 0.1),
    subtle: alpha(textPrimary, 0.05),
    scrim: 'rgba(0, 0, 0, 0.38)',

    success: isDark ? '#4ADE80' : '#177245',
    danger: isDark ? '#F87171' : '#B42318',
    warning: isDark ? '#FBBF24' : '#B54708',
    disabled: alpha(textPrimary, 0.38),
  };

  return {
    colors,
    festival: remote.festival,
    spacing,
    radii,
    typography,
    hit,
    motion,
    isDark,
  };
}
