import {StyleSheet} from 'react-native';

import type {Theme} from '../../theme/types';

/**
 * Screen-only layout lives here too. Screens themselves must not create
 * StyleSheets or contain layout numbers.
 */
export function createScreenStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  return StyleSheet.create({
    labHeader: {
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      gap: spacing.sm,
    },
    labKicker: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    labTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    labIntro: {
      ...typography.body,
      color: colors.textSecondary,
    },
    labSection: {
      marginTop: spacing.xxl,
    },
    mtSm: {
      marginTop: spacing.sm,
    },
    mtMd: {
      marginTop: spacing.md,
    },
    labSectionHead: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
      gap: spacing.sm,
    },
    labSectionTitle: {
      ...typography.h2,
      color: colors.textPrimary,
    },
    labSectionMeta: {
      ...typography.caption,
      color: colors.textSecondary,
      flexShrink: 1,
      textAlign: 'right',
    },
    variantRow: {
      marginTop: spacing.lg,
      gap: spacing.sm,
    },
    variantHint: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    paletteGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    paletteItem: {
      width: '48%',
      borderRadius: radii.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    paletteSwatch: {
      minHeight: 62,
      padding: spacing.sm,
      justifyContent: 'flex-end',
      gap: 2,
    },
    paletteName: {
      ...typography.caption,
      fontWeight: '700',
    },
    paletteValue: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '500',
    },
    contrastRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.md,
    },
    contrastPill: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radii.pill,
      backgroundColor: colors.subtle,
    },
    contrastText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    typeRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    typeLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      width: 74,
    },
    typeSample: {
      flex: 1,
      color: colors.textPrimary,
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    doctorCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    doctorInfo: {
      flex: 1,
      gap: 2,
    },
    doctorName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    doctorMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    doctorFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
      gap: spacing.sm,
    },
    serviceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    serviceImage: {
      width: 76,
      height: 76,
      borderRadius: radii.md,
      backgroundColor: colors.subtle,
    },
    serviceInfo: {
      flex: 1,
      gap: spacing.xs,
    },
    serviceName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    previewSection: {
      minHeight: 128,
      justifyContent: 'flex-end',
    },
    previewHero: {
      minHeight: 210,
      justifyContent: 'flex-end',
    },
    previewOffer: {
      minHeight: 88,
      justifyContent: 'center',
    },
    previewEyebrow: {
      ...typography.caption,
      fontWeight: '600',
    },
    previewTitle: {
      ...typography.h2,
      fontWeight: '700',
    },
    previewBody: {
      ...typography.body,
      marginTop: spacing.xs,
    },
    previewChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.sm,
    },
    previewChip: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radii.pill,
    },
    previewChipText: {
      ...typography.caption,
      fontWeight: '600',
    },
    placeholderHeader: {
      paddingTop: spacing.xl,
      paddingBottom: spacing.sm,
      gap: spacing.sm,
    },
    placeholderTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    placeholderBody: {
      ...typography.body,
      color: colors.textSecondary,
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    profileLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      flexShrink: 1,
    },
    profileValue: {
      ...typography.label,
      color: colors.textPrimary,
      textAlign: 'right',
      flexShrink: 1,
    },
    note: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.sm,
    },
    flexOne: {
      flex: 1,
    },
  });
}

export type ScreenStyles = ReturnType<typeof createScreenStyles>;
