import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createHomeStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  return StyleSheet.create({
    scrollContent: {
      paddingBottom: 148,
    },
    headerWrap: {
      marginHorizontal: spacing.lg,
      marginTop: spacing.xs,
      marginBottom: spacing.lg,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.sm,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    headerText: {
      flex: 1,
      gap: 2,
    },
    headerKicker: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      letterSpacing: 1.1,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    headerTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    headerMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.xxs,
    },
    headerMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    headerDot: {
      width: 3,
      height: 3,
      borderRadius: 2,
      backgroundColor: colors.border,
    },
    compactWrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 30,
    },
    compactGlass: {
      marginHorizontal: spacing.lg,
    },
    compactHeader: {
      minHeight: 58,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    compactLogo: {
      width: 32,
      height: 32,
      borderRadius: radii.pill,
      backgroundColor: colors.primaryFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    compactCopy: {
      flex: 1,
      gap: 1,
    },
    compactTitle: {
      ...typography.label,
      color: colors.textPrimary,
    },
    compactMeta: {
      ...typography.caption,
      fontSize: 10,
      lineHeight: 13,
      color: colors.textSecondary,
    },

    // Config state banner
    configBanner: {
      marginTop: spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: alpha(colors.warning, 0.3),
      backgroundColor: alpha(colors.warning, 0.09),
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    configBannerIcon: {
      width: 30,
      height: 30,
      borderRadius: radii.pill,
      backgroundColor: alpha(colors.warning, 0.16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    configBannerBody: {
      flex: 1,
      gap: 1,
    },
    configBannerTitle: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      color: colors.textPrimary,
    },
    configBannerMessage: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    configBannerAction: {
      minHeight: 44,
      minWidth: 52,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xs,
    },
    configBannerActionText: {
      ...typography.label,
      color: colors.primary,
    },
    loadingBanner: {
      marginTop: spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.subtle,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    loadingBannerText: {
      ...typography.caption,
      color: colors.textSecondary,
      flex: 1,
    },

    // Skeleton mirrors the real home rhythm
    skeletonHeader: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.lg,
      gap: spacing.sm,
    },
    skeletonHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    skeletonHeaderCopy: {
      flex: 1,
      gap: spacing.xs,
    },
    skeletonTitle: {
      height: 26,
      width: '62%',
    },
    skeletonLine: {
      height: 11,
      width: '88%',
    },
    skeletonAvatar: {
      width: 64,
      height: 64,
      borderRadius: radii.pill,
    },
    skeletonHero: {
      height: 300,
      borderRadius: 0,
    },
    skeletonBand: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      gap: spacing.md,
      backgroundColor: colors.surface,
    },
    skeletonBandAlt: {
      backgroundColor: colors.background,
    },
    skeletonSectionTitle: {
      height: 20,
      width: '46%',
    },
    skeletonRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    skeletonTile: {
      flex: 1,
      height: 88,
      borderRadius: radii.lg,
    },
    skeletonChip: {
      width: 84,
      height: 40,
      borderRadius: radii.pill,
    },
    skeletonDoctorRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    skeletonDoctorCard: {
      width: 230,
      height: 150,
      borderRadius: radii.lg,
    },
    skeletonServiceRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    skeletonServiceCard: {
      width: '48%',
      height: 180,
      borderRadius: radii.lg,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xxl,
      paddingBottom: spacing.xxxl,
      alignItems: 'center',
      gap: spacing.xxs,
    },
    footerTitle: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      letterSpacing: 0.8,
      color: colors.primary,
      textTransform: 'uppercase',
    },
    footerText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
}

export type HomeStyles = ReturnType<typeof createHomeStyles>;
