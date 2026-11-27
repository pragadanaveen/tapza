import {StyleSheet} from 'react-native';

import type {Theme} from '../../theme/types';

export function createNavigationStyles(theme: Theme) {
  const {colors, spacing, radii, typography, glass} = theme;

  return StyleSheet.create({
    tabBarWrap: {
      position: 'absolute',
      left: spacing.lg,
      right: spacing.lg,
      zIndex: 50,
    },
    tabBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      padding: 6,
      minHeight: 60,
    },
    tabItem: {
      flexGrow: 1,
      flexShrink: 1,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radii.pill,
    },
    tabItemActive: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      flexDirection: 'row',
      gap: 6,
      paddingHorizontal: spacing.md,
      backgroundColor: glass.activePill,
    },
    tabItemPressed: {
      opacity: 0.74,
    },
    tabIconWrap: {
      minWidth: 44,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabIconWrapActive: {
      minWidth: 0,
      minHeight: 0,
    },
    tabLabel: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      fontSize: 12,
      lineHeight: 16,
      color: glass.activePillText,
    },
    tabBarSpacer: {
      height: 88,
    },
    tabBadge: {
      position: 'absolute',
      top: 4,
      right: 8,
      minWidth: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.danger,
    },
  });
}

export type NavigationStyles = ReturnType<typeof createNavigationStyles>;
