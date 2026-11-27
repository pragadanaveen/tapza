import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import {useColorScheme} from 'react-native';

import type {LayoutConfig} from '../config/types';
import {useAppearanceStore} from '../store/appearanceStore';
import {buildTheme} from './buildTheme';
import type {ResolvedAppearance, Theme} from './types';

const ThemeContext = createContext<Theme | null>(null);

type ThemeProviderProps = {
  config: LayoutConfig;
  children: ReactNode;
};

export function ThemeProvider({config, children}: ThemeProviderProps) {
  const preference = useAppearanceStore(store => store.preference);
  const systemScheme = useColorScheme();
  const appearance: ResolvedAppearance =
    preference === 'system'
      ? systemScheme === 'dark'
        ? 'dark'
        : 'light'
      : preference;

  const theme = useMemo(
    () => buildTheme(config.theme, appearance),
    [appearance, config.theme],
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }

  return theme;
}
