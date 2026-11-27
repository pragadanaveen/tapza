import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createProfileStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  return StyleSheet.create({
    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: 148,
      gap: spacing.md,
    },
    header: {
      paddingTop: spacing.xs,
      paddingBottom: spacing.sm,
      gap: spacing.xxs,
    },
    headerTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    headerIntro: {
      ...typography.body,
      color: colors.textSecondary,
    },
    identityCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.lg,
    },
    identityCopy: {
      flex: 1,
      gap: 2,
    },
    identityName: {
      ...typography.h2,
      color: colors.textPrimary,
    },
    identityMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    identityPhone: {
      ...typography.label,
      color: colors.primary,
      marginTop: spacing.xxs,
    },
    section: {
      gap: spacing.sm,
      marginTop: spacing.md,
    },
    sectionTitle: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    card: {
      padding: spacing.lg,
      gap: spacing.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingVertical: spacing.xxs,
    },
    rowCopy: {
      flex: 1,
      gap: 1,
    },
    rowLabel: {
      ...typography.label,
      color: colors.textPrimary,
    },
    rowHint: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    rowValue: {
      ...typography.label,
      color: colors.textPrimary,
      textAlign: 'right',
    },
    badgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.xs,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    segmentedSpacing: {
      marginTop: spacing.xs,
    },
    divider: {
      height: 1,
      backgroundColor: theme.glass.border,
      marginVertical: spacing.xs,
    },
    demoNote: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    statusBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: alpha(colors.warning, 0.08),
      borderWidth: 1,
      borderColor: alpha(colors.warning, 0.28),
      borderRadius: radii.md,
      padding: spacing.sm,
      marginTop: spacing.xs,
    },
    statusBannerText: {
      ...typography.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    loadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.sm,
    },
    loadingText: {
      ...typography.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    actions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    actionButton: {
      flexGrow: 1,
    },
    footer: {
      paddingTop: spacing.xl,
      paddingBottom: spacing.xxl,
      alignItems: 'center',
      gap: spacing.xxs,
    },
    footerTitle: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    footerText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    switch: {
      transform: [{scaleX: 0.9}, {scaleY: 0.9}],
    },
  });
}

export type ProfileStyles = ReturnType<typeof createProfileStyles>;
