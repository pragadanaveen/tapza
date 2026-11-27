import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';

import type {LayoutConfig} from '../config/types';
import {buildTheme} from './buildTheme';
import type {Theme} from './types';

const ThemeContext = createContext<Theme | null>(null);

type ThemeProviderProps = {
  config: LayoutConfig;
  children: ReactNode;
};

export function ThemeProvider({config, children}: ThemeProviderProps) {
  const theme = useMemo(() => buildTheme(config.theme), [config.theme]);

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
