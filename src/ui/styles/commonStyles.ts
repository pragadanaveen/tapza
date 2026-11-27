import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

/**
 * The universal style registry.
 *
 * Every shared component and screen consumes these keys. Component files
 * contain no StyleSheet.create, no hex values and no spacing numbers.
 */
export function createCommonStyles(theme: Theme) {
  const {colors, spacing, radii, typography, hit} = theme;

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    screenContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: 120,
    },
    scrollContent: {
      paddingBottom: 120,
    },
    container: {
      paddingHorizontal: spacing.lg,
    },
    flexOne: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrap: {
      flexWrap: 'wrap',
    },
    gapXs: {gap: spacing.xs},
    gapSm: {gap: spacing.sm},
    gapMd: {gap: spacing.md},
    gapLg: {gap: spacing.lg},
    mtSm: {marginTop: spacing.sm},
    mtMd: {marginTop: spacing.md},
    mtLg: {marginTop: spacing.lg},
    mtXl: {marginTop: spacing.xl},
    mbSm: {marginBottom: spacing.sm},
    mbMd: {marginBottom: spacing.md},
    mbLg: {marginBottom: spacing.lg},
    mbXl: {marginBottom: spacing.xl},
    section: {marginBottom: spacing.xxl},
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginVertical: spacing.lg,
    },
    textCenter: {textAlign: 'center'},

    // Type scale
    typeDisplay: {...typography.display},
    typeH1: {...typography.h1},
    typeH2: {...typography.h2},
    typeBody: {...typography.body},
    typeLabel: {...typography.label},
    typeCaption: {...typography.caption},

    // Text tones
    tonePrimary: {color: colors.textPrimary},
    toneSecondary: {color: colors.textSecondary},
    toneOnPrimary: {color: colors.onPrimary},
    toneOnAccent: {color: colors.onAccent},
    toneAccent: {color: colors.accent},
    tonePrimaryBrand: {color: colors.primary},
    toneDanger: {color: colors.danger},
    toneSuccess: {color: colors.success},
    toneDisabled: {color: colors.disabled},

    // Surfaces
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      shadowColor: colors.textPrimary,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
    cardTight: {
      padding: spacing.md,
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    cardQuiet: {
      backgroundColor: colors.subtle,
      borderRadius: radii.lg,
      padding: spacing.lg,
    },
    panel: {
      backgroundColor: colors.surface,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
    },

    // Buttons
    buttonBase: {
      minHeight: hit.min,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    buttonPrimary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    buttonSecondary: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    buttonGhost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    buttonSm: {
      minHeight: 40,
      paddingHorizontal: spacing.md,
      borderRadius: radii.sm,
    },
    buttonMd: {
      minHeight: 48,
    },
    buttonLg: {
      minHeight: 54,
      borderRadius: radii.lg,
    },
    buttonPressed: {
      opacity: 0.86,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonTextBase: {
      ...typography.label,
      fontWeight: '600',
    },
    buttonTextPrimary: {
      color: colors.onPrimary,
    },
    buttonTextSecondary: {
      color: colors.textPrimary,
    },
    buttonTextGhost: {
      color: colors.primary,
    },
    buttonTextDisabled: {
      color: colors.disabled,
    },

    // Icon buttons
    iconButton: {
      width: hit.min,
      height: hit.min,
      borderRadius: radii.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconButtonGhost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    iconButtonPressed: {
      opacity: 0.7,
    },

    // Chips
    chip: {
      minHeight: 40,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
    },
    chipSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipPressed: {
      opacity: 0.8,
    },
    chipText: {
      ...typography.label,
      fontWeight: '500',
      color: colors.textPrimary,
    },
    chipTextSelected: {
      color: colors.onPrimary,
      fontWeight: '600',
    },

    // Segmented control
    segmented: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      padding: spacing.xs,
      borderRadius: radii.pill,
      backgroundColor: colors.subtle,
      borderWidth: 1,
      borderColor: colors.border,
    },
    segmentedItem: {
      flex: 1,
      minHeight: 40,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.sm,
    },
    segmentedItemActive: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    segmentedText: {
      ...typography.label,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    segmentedTextActive: {
      color: colors.primary,
      fontWeight: '600',
    },

    // Badges
    badge: {
      alignSelf: 'flex-start',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radii.pill,
    },
    badgeNeutral: {backgroundColor: colors.subtle},
    badgeAccent: {backgroundColor: alpha(colors.accent, 0.18)},
    badgeSuccess: {backgroundColor: alpha(colors.success, 0.14)},
    badgeWarning: {backgroundColor: alpha(colors.warning, 0.16)},
    badgeDanger: {backgroundColor: alpha(colors.danger, 0.12)},
    badgeText: {
      ...typography.caption,
      fontWeight: '600',
    },
    badgeTextNeutral: {color: colors.textSecondary},
    badgeTextAccent: {color: colors.textPrimary},
    badgeTextSuccess: {color: colors.success},
    badgeTextWarning: {color: colors.warning},
    badgeTextDanger: {color: colors.danger},

    // Avatar
    avatar: {
      width: 52,
      height: 52,
      borderRadius: radii.pill,
      backgroundColor: colors.subtle,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    avatarSm: {width: 40, height: 40},
    avatarLg: {width: 64, height: 64},
    avatarImage: {width: '100%', height: '100%'},
    avatarText: {
      ...typography.label,
      fontWeight: '700',
      color: colors.primary,
    },

    // Skeleton
    skeleton: {
      backgroundColor: colors.subtle,
      borderRadius: radii.md,
      overflow: 'hidden',
    },
    skeletonLine: {height: 12, borderRadius: radii.sm},
    skeletonCircle: {borderRadius: radii.pill},

    // Empty / error
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xxxl,
      paddingHorizontal: spacing.lg,
      gap: spacing.sm,
    },
    emptyIcon: {
      width: 64,
      height: 64,
      borderRadius: radii.pill,
      backgroundColor: colors.subtle,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    emptyTitle: {
      ...typography.h2,
      color: colors.textPrimary,
      textAlign: 'center',
    },
    emptyMessage: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    errorIcon: {
      backgroundColor: alpha(colors.danger, 0.1),
    },

    // Price
    price: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    priceMuted: {
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
}

export type CommonStyles = ReturnType<typeof createCommonStyles>;
