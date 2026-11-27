import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createNavigationStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  return StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.xs,
      paddingHorizontal: spacing.sm,
      shadowColor: colors.textPrimary,
      shadowOffset: {width: 0, height: -4},
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 8,
    },
    tabItem: {
      flex: 1,
      minHeight: 56,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xs,
      gap: 2,
    },
    tabItemPressed: {
      opacity: 0.72,
    },
    tabIconWrap: {
      minWidth: 40,
      height: 28,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabIconWrapActive: {
      backgroundColor: alpha(colors.primary, 0.12),
    },
    tabLabel: {
      ...typography.caption,
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    tabLabelActive: {
      color: colors.primary,
      fontWeight: '700',
    },
  });
}

export type NavigationStyles = ReturnType<typeof createNavigationStyles>;
