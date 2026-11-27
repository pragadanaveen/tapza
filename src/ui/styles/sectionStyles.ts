import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createSectionStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  // The festival edition frames its hero in antique gold rather than the
  // neutral glass hairline, so the photograph reads as a mounted print.
  const heroFrame = theme.festival
    ? theme.isDark
      ? 'rgba(201, 162, 39, 0.44)'
      : 'rgba(201, 162, 39, 0.58)'
    : theme.glass.border;

  return StyleSheet.create({
    // Generic themed background wrapper
    surface: {
      borderRadius: radii.xxl,
      overflow: 'hidden',
    },
    image: {
      borderRadius: radii.xxl,
    },
    content: {
      padding: spacing.lg,
    },
    scrim: {
      ...StyleSheet.absoluteFill,
    },
    gradientWash: {
      ...StyleSheet.absoluteFill,
      opacity: theme.isDark ? 0.14 : 0.20,
    },
    contentInner: {
      position: 'relative',
    },

    // Floating glass section cards
    band: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    bandContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xl,
    },
    bandHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    bandTitle: {
      ...typography.h2,
      flexShrink: 1,
    },
    bandAction: {
      minHeight: 44,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
      paddingLeft: spacing.sm,
    },
    bandActionText: {
      ...typography.label,
      color: colors.primary,
    },
    bandEmptyText: {
      ...typography.caption,
      color: colors.textSecondary,
      paddingVertical: spacing.md,
    },

    // Hero
    hero: {
      minHeight: 348,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
      borderRadius: radii.xxxl,
      borderWidth: 1,
      borderColor: heroFrame,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      backgroundColor: colors.primaryFill,
    },
    heroImageLayer: {
      ...StyleSheet.absoluteFill,
    },
    heroImage: {
      ...StyleSheet.absoluteFill,
    },
    heroImageFull: {
      opacity: 1,
    },
    heroImageDim: {
      opacity: 0.38,
    },
    heroTint: {
      ...StyleSheet.absoluteFill,
    },
    heroGlowLarge: {
      position: 'absolute',
      width: 260,
      height: 260,
      borderRadius: 130,
      top: -110,
      right: -80,
      backgroundColor: theme.glass.highlight,
      opacity: 0.18,
    },
    heroGlowSmall: {
      position: 'absolute',
      width: 160,
      height: 160,
      borderRadius: 80,
      bottom: -70,
      left: -40,
      backgroundColor: theme.glass.highlight,
      opacity: 0.12,
    },
    heroContentWrap: {
      padding: spacing.sm,
      zIndex: 2,
    },
    heroContent: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xl,
      gap: spacing.xs,
    },
    heroTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      flexWrap: 'wrap',
      marginBottom: spacing.sm,
    },
    heroFestivalPill: {
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: heroFrame,
      backgroundColor: theme.glass.tintStrong,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    heroFestivalText: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      letterSpacing: 0.4,
      color: colors.accentText,
    },
    heroEyebrow: {
      ...typography.caption,
      color: colors.textSecondary,
      letterSpacing: 0.4,
    },
    heroTitle: {
      ...typography.display,
      fontSize: 30,
      lineHeight: 36,
      color: colors.textPrimary,
    },
    heroSubtitle: {
      ...typography.body,
      marginTop: spacing.xs,
      color: colors.textSecondary,
      maxWidth: '96%',
    },
    heroHighlights: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.md,
    },
    heroHighlight: {
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.tintSoft,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
    },
    heroHighlightText: {
      ...typography.caption,
      color: colors.textPrimary,
    },
    heroCtaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginTop: spacing.lg,
      flexWrap: 'wrap',
    },
    heroCtaMeta: {
      ...typography.caption,
      color: colors.textSecondary,
      flexShrink: 1,
    },

    // Horizontal shelves
    horizontalScroll: {
      marginHorizontal: -spacing.lg,
    },
    horizontalContent: {
      paddingHorizontal: spacing.lg,
      gap: spacing.sm,
    },

    // Quick actions
    quickGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    quickTile: {
      flexBasis: '47%',
      flexGrow: 1,
      minHeight: 68,
      backgroundColor: theme.glass.tintSoft,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    quickTilePressed: {
      opacity: 0.75,
    },
    quickIconWrap: {
      width: 38,
      height: 38,
      borderRadius: radii.pill,
      backgroundColor: alpha(colors.primaryFill, 0.12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickLabel: {
      ...typography.caption,
      fontFamily: typography.label.fontFamily,
      fontSize: 13,
      lineHeight: 18,
      textAlign: 'left',
      flex: 1,
      color: colors.textPrimary,
    },

    // Doctor shelf
    doctorCard: {
      width: 272,
      backgroundColor: theme.glass.tintSoft,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.xl,
      padding: spacing.md,
      gap: spacing.xs,
    },
    doctorCardPressed: {
      opacity: 0.82,
    },
    doctorTop: {
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
    doctorSpecialty: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    doctorLanguages: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    doctorSlotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    doctorSlotText: {
      ...typography.caption,
      color: colors.success,
      fontWeight: '600',
      flexShrink: 1,
    },
    doctorFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    doctorFeeWrap: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.xxs,
    },
    doctorFeeMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    doctorBookLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
    },
    doctorBookText: {
      ...typography.label,
      fontWeight: '700',
      color: colors.primary,
    },

    // Service grid
    serviceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    serviceCard: {
      width: '48%',
      backgroundColor: theme.glass.tintSoft,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      overflow: 'hidden',
    },
    serviceCardPressed: {
      opacity: 0.82,
    },
    serviceImageWrap: {
      position: 'relative',
      height: 104,
      backgroundColor: colors.subtle,
    },
    serviceImage: {
      width: '100%',
      height: '100%',
    },
    serviceBadgeWrap: {
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
    },
    serviceBody: {
      padding: spacing.sm,
      gap: spacing.xxs,
    },
    serviceName: {
      ...typography.label,
      fontWeight: '600',
      color: colors.textPrimary,
      minHeight: 40,
    },
    serviceDescription: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    serviceMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.xs,
      marginTop: spacing.xxs,
    },
    serviceMetaText: {
      ...typography.caption,
      color: colors.textSecondary,
    },

    // Offer
    offerContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    offerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    offerIconWrap: {
      width: 34,
      height: 34,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    offerMessage: {
      ...typography.label,
      fontWeight: '600',
      flex: 1,
    },
  });
}

export type SectionStyles = ReturnType<typeof createSectionStyles>;
