import {useMemo} from 'react';

import {useTheme} from '../../theme/ThemeProvider';
import {
  createCommonStyles,
  type CommonStyles,
} from './commonStyles';
import {
  createNavigationStyles,
  type NavigationStyles,
} from './navigationStyles';
import {
  createScreenStyles,
  type ScreenStyles,
} from './screenStyles';
import {
  createSectionStyles,
  type SectionStyles,
} from './sectionStyles';

export type AppStyles = {
  common: CommonStyles;
  navigation: NavigationStyles;
  screen: ScreenStyles;
  section: SectionStyles;
};

export function useCommonStyles(): CommonStyles {
  const theme = useTheme();
  return useMemo(() => createCommonStyles(theme), [theme]);
}

export function useNavigationStyles(): NavigationStyles {
  const theme = useTheme();
  return useMemo(() => createNavigationStyles(theme), [theme]);
}

export function useScreenStyles(): ScreenStyles {
  const theme = useTheme();
  return useMemo(() => createScreenStyles(theme), [theme]);
}

export function useSectionStyles(): SectionStyles {
  const theme = useTheme();
  return useMemo(() => createSectionStyles(theme), [theme]);
}

/**
 * Optional aggregate hook for screens that genuinely need more than one
 * registry. It still creates each StyleSheet only once per theme.
 */
export function useAppStyles(): AppStyles {
  const common = useCommonStyles();
  const navigation = useNavigationStyles();
  const screen = useScreenStyles();
  const section = useSectionStyles();

  return useMemo(
    () => ({common, navigation, screen, section}),
    [common, navigation, screen, section],
  );
}

export type {CommonStyles, NavigationStyles, ScreenStyles, SectionStyles};
