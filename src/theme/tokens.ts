/**
 * Local design tokens.
 *
 * The remote config owns colour. These values own rhythm, shape, motion and
 * the bundled Alexi typeface.
 */
export const fontFamily = {
  regular: 'HankenGrotesk-Regular',
  medium: 'HankenGrotesk-Medium',
  semiBold: 'HankenGrotesk-SemiBold',
  bold: 'HankenGrotesk-Bold',
} as const;

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
  xxxl: 30,
  pill: 999,
} as const;

export const typography = {
  display: {fontFamily: fontFamily.bold, fontSize: 34, lineHeight: 40},
  h1: {fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 34},
  h2: {fontFamily: fontFamily.semiBold, fontSize: 20, lineHeight: 26},
  body: {fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24},
  label: {fontFamily: fontFamily.semiBold, fontSize: 14, lineHeight: 20},
  caption: {fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16},
} as const;

export const hit = {
  min: 44,
} as const;

export const motion = {
  fast: 140,
  base: 220,
  slow: 320,
} as const;
