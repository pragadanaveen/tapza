import type {ThemeConfig, ThemePalette} from '../config/types';
import {
  alpha,
  contrastRatio,
  readableOn,
  tint,
} from './color';
import {ambientFor, glassFor} from './glass';
import {hit, motion, radii, spacing, typography} from './tokens';
import type {
  ResolvedAppearance,
  Theme,
  ThemeColors,
} from './types';

const DARK_FALLBACK: ThemePalette = {
  background: '#0B0B0E',
  surface: '#18181B',
  textPrimary: '#FAFAFA',
  textSecondary: '#A1A1AA',
};

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
 * The appearance mode chooses the light or dark palette, while the config
 * variant keeps ownership of the brand colour, accent, festival content and
 * section tints. Glass tokens are presentation, so they live here rather than
 * in the remote config.
 */
export function buildTheme(
  remote: ThemeConfig,
  appearance: ResolvedAppearance = 'light',
): Theme {
  const isDark = appearance === 'dark';
  const palette = isDark ? remote.dark ?? DARK_FALLBACK : remote;
  const family = remote.festival ? 'festival' : 'everyday';
  const glass = glassFor(appearance, family);
  const ambient = ambientFor(appearance, family);

  const textPrimary = accessibleText(
    palette.textPrimary,
    [palette.background, palette.surface],
    readableOn(palette.background),
  );

  const textSecondary = accessibleText(
    palette.textSecondary,
    [palette.background, palette.surface],
    textPrimary,
  );

  const primary = accessibleText(
    remote.primary,
    [palette.background],
    // On a dark surface the brand colour itself is usually too dim to read,
    // so lift it toward white rather than swapping in an unrelated hue.
    isDark ? tint(remote.primary, 0.45) : remote.primary,
  );

  const secondaryText = accessibleText(
    remote.secondary,
    [palette.background],
    primary,
  );

  const accentText = accessibleText(
    remote.accent,
    [palette.background],
    isDark ? '#FBBF24' : '#B45309',
  );

  const colors: ThemeColors = {
    primary,
    primaryFill: remote.primary,
    secondary: remote.secondary,
    secondaryText,
    background: palette.background,
    surface: palette.surface,
    textPrimary,
    textSecondary,
    accent: remote.accent,
    accentText,

    onPrimary: readableOn(remote.primary),
    onSecondary: readableOn(remote.secondary),
    onAccent: readableOn(remote.accent),

    border: isDark ? 'rgba(255, 255, 255, 0.12)' : alpha(textPrimary, 0.1),
    subtle: isDark ? 'rgba(255, 255, 255, 0.06)' : alpha(textPrimary, 0.05),
    scrim: glass.scrim,

    success: isDark ? '#4ADE80' : '#16A34A',
    danger: isDark ? '#F87171' : '#DC2626',
    warning: isDark ? '#FBBF24' : '#D97706',
    disabled: alpha(textPrimary, 0.38),
  };

  return {
    colors,
    glass,
    ambient,
    appearance,
    festival: remote.festival,
    spacing,
    radii,
    typography,
    hit,
    motion,
    isDark,
  };
}
