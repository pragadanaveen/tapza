import {
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import type {Theme} from './types';

export function buildNavigationTheme(theme: Theme): NavigationTheme {
  return {
    ...DefaultTheme,
    dark: theme.isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.textPrimary,
      border: theme.colors.border,
      notification: theme.colors.accent,
    },
  };
}
