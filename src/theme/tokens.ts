/**
 * Local design tokens.
 *
 * The remote config owns colour. These values own rhythm, shape and motion.
 * Components never read these directly — they receive them through `Theme`.
 */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

export const typography = {
  display: {fontSize: 34, lineHeight: 42, fontWeight: '700'},
  h1: {fontSize: 26, lineHeight: 34, fontWeight: '700'},
  h2: {fontSize: 20, lineHeight: 28, fontWeight: '600'},
  body: {fontSize: 16, lineHeight: 24, fontWeight: '400'},
  label: {fontSize: 14, lineHeight: 20, fontWeight: '600'},
  caption: {fontSize: 12, lineHeight: 16, fontWeight: '500'},
} as const;

export const hit = {
  min: 44,
} as const;

export const motion = {
  fast: 140,
  base: 220,
  slow: 320,
} as const;
