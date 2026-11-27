import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createBookingsStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  return StyleSheet.create({
    listContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: 120,
    },
    header: {
      paddingTop: spacing.xs,
      paddingBottom: spacing.md,
      gap: spacing.xs,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    headerTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    headerIntro: {
      ...typography.body,
      color: colors.textSecondary,
    },
    groupLabel: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 0.9,
      textTransform: 'uppercase',
      color: colors.primary,
      marginTop: spacing.sm,
      marginBottom: spacing.sm,
    },
    card: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.lg,
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    dateBadge: {
      width: 54,
      borderRadius: radii.md,
      backgroundColor: alpha(colors.primary, 0.09),
      paddingVertical: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    },
    dateDay: {
      ...typography.h2,
      color: colors.primary,
      fontWeight: '700',
    },
    dateMonth: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    cardCopy: {
      flex: 1,
      gap: 2,
    },
    doctorName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    specialty: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    time: {
      ...typography.label,
      fontWeight: '600',
      color: colors.primary,
      marginTop: spacing.xs,
    },
    clinic: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    service: {
      ...typography.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    pendingNote: {
      ...typography.caption,
      color: colors.warning,
      flex: 1,
    },
    emptyWrap: {
      paddingTop: spacing.xl,
    },
    footer: {
      paddingVertical: spacing.xl,
      alignItems: 'center',
      gap: spacing.xxs,
    },
    footerText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
}

export type BookingsStyles = ReturnType<typeof createBookingsStyles>;
