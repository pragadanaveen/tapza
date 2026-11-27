import type {AmbientTokens, GlassTokens, ResolvedAppearance} from './types';

type GlassFamily = 'everyday' | 'festival';

const LIGHT_GLASS: GlassTokens = {
  blurType: 'light',
  blurAmount: 24,
  tint: 'rgba(255, 255, 255, 0.46)',
  tintStrong: 'rgba(255, 255, 255, 0.64)',
  tintSoft: 'rgba(255, 255, 255, 0.32)',
  border: 'rgba(255, 255, 255, 0.68)',
  borderStrong: 'rgba(255, 255, 255, 0.86)',
  highlight: 'rgba(255, 255, 255, 0.92)',
  shadow: 'rgba(76, 29, 149, 0.18)',
  fallback: 'rgba(250, 250, 250, 0.90)',
  fallbackStrong: 'rgba(255, 255, 255, 0.95)',
  tabBarTint: 'rgba(255, 255, 255, 0.52)',
  sheetTint: 'rgba(255, 255, 255, 0.84)',
  scrim: 'rgba(24, 24, 27, 0.30)',
  activePill: '#7C3AED',
  activePillText: '#FFFFFF',
};

const DARK_GLASS: GlassTokens = {
  blurType: 'dark',
  blurAmount: 30,
  tint: 'rgba(24, 24, 27, 0.44)',
  tintStrong: 'rgba(24, 24, 27, 0.62)',
  tintSoft: 'rgba(24, 24, 27, 0.30)',
  border: 'rgba(255, 255, 255, 0.14)',
  borderStrong: 'rgba(255, 255, 255, 0.22)',
  highlight: 'rgba(255, 255, 255, 0.16)',
  shadow: 'rgba(0, 0, 0, 0.52)',
  fallback: 'rgba(20, 20, 25, 0.90)',
  fallbackStrong: 'rgba(28, 28, 34, 0.95)',
  tabBarTint: 'rgba(18, 18, 22, 0.58)',
  sheetTint: 'rgba(18, 18, 22, 0.88)',
  scrim: 'rgba(0, 0, 0, 0.50)',
  activePill: '#7C3AED',
  activePillText: '#FFFFFF',
};

export function glassFor(
  appearance: ResolvedAppearance,
  family: GlassFamily,
): GlassTokens {
  const base = appearance === 'dark' ? DARK_GLASS : LIGHT_GLASS;

  if (family === 'festival') {
    // Harvest glass: cream paper in light mode, wine-black in dark, so the
    // festival never falls back to the everyday violet tint or shadow.
    return appearance === 'light'
      ? {
          ...base,
          tint: 'rgba(255, 252, 247, 0.48)',
          tintStrong: 'rgba(255, 252, 247, 0.66)',
          tabBarTint: 'rgba(255, 252, 247, 0.54)',
          shadow: 'rgba(122, 31, 61, 0.20)',
          activePill: '#7A1F3D',
        }
      : {
          ...base,
          tint: 'rgba(37, 18, 26, 0.52)',
          tintStrong: 'rgba(37, 18, 26, 0.70)',
          tabBarTint: 'rgba(21, 10, 15, 0.64)',
          shadow: 'rgba(0, 0, 0, 0.56)',
          activePill: '#A33B57',
        };
  }

  return base;
}

const EVERYDAY_LIGHT: AmbientTokens = {
  gradient: ['#FAFAFA', '#F5F3FF', '#EDE9FE'],
  orbPrimary: 'rgba(139, 92, 246, 0.34)',
  orbSecondary: 'rgba(196, 181, 253, 0.48)',
  orbAccent: 'rgba(240, 171, 252, 0.26)',
  line: 'rgba(255, 255, 255, 0.42)',
};

const EVERYDAY_DARK: AmbientTokens = {
  gradient: ['#0B0B0E', '#121018', '#1A1026'],
  orbPrimary: 'rgba(124, 58, 237, 0.32)',
  orbSecondary: 'rgba(76, 29, 149, 0.44)',
  orbAccent: 'rgba(219, 39, 119, 0.20)',
  line: 'rgba(255, 255, 255, 0.07)',
};

const FESTIVAL_LIGHT: AmbientTokens = {
  gradient: ['#FBF7F0', '#F7EFE4', '#F3E7D3'],
  orbPrimary: 'rgba(122, 31, 61, 0.26)',
  orbSecondary: 'rgba(201, 162, 39, 0.26)',
  orbAccent: 'rgba(163, 59, 87, 0.30)',
  line: 'rgba(255, 255, 255, 0.46)',
};

const FESTIVAL_DARK: AmbientTokens = {
  gradient: ['#150A0F', '#1F0E15', '#2E1410'],
  orbPrimary: 'rgba(163, 59, 87, 0.34)',
  orbSecondary: 'rgba(201, 162, 39, 0.22)',
  orbAccent: 'rgba(122, 31, 61, 0.44)',
  line: 'rgba(255, 255, 255, 0.08)',
};

export function ambientFor(
  appearance: ResolvedAppearance,
  family: GlassFamily,
): AmbientTokens {
  if (family === 'festival') {
    return appearance === 'dark' ? FESTIVAL_DARK : FESTIVAL_LIGHT;
  }

  return appearance === 'dark' ? EVERYDAY_DARK : EVERYDAY_LIGHT;
}
