export type ScreenName =
  | 'home'
  | 'bookings'
  | 'prescriptions'
  | 'profile';

export type FestivalConfig = {
  name: string;
  greeting: string;
  bannerImageUrl: string;
};

export type ThemePalette = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
};

export type ThemeConfig = ThemePalette & {
  primary: string;
  secondary: string;
  accent: string;
  dark?: ThemePalette;
  festival?: FestivalConfig;
};

export type TabConfig = {
  id: string;
  label: string;
  icon: string;
  screen: ScreenName;
};

export type SectionBackground =
  | {kind: 'color'; value: string}
  | {kind: 'gradient'; value: string}
  | {kind: 'image'; value: string};

export type SectionConfig = {
  id: string;
  type: string;
  background: SectionBackground;
  title?: string;
  items: unknown[];
};

export type LayoutConfig = {
  version: number;
  theme: ThemeConfig;
  tabs: TabConfig[];
  sections: SectionConfig[];
};

export type ConfigVariant = 'normal' | 'pongal';
