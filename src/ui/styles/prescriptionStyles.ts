import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createPrescriptionStyles(theme: Theme) {
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
    headerTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    headerIntro: {
      ...typography.body,
      color: colors.textSecondary,
    },

    // Today's dose summary
    overviewCard: {
      backgroundColor: colors.primary,
      borderRadius: radii.xl,
      padding: spacing.lg,
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    overviewTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    overviewCopy: {
      flex: 1,
      gap: 2,
    },
    overviewLabel: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: alpha(colors.onPrimary, 0.78),
    },
    overviewCount: {
      ...typography.h1,
      color: colors.onPrimary,
    },
    overviewMeta: {
      ...typography.caption,
      color: alpha(colors.onPrimary, 0.82),
    },
    overviewProgressTrack: {
      height: 8,
      borderRadius: radii.pill,
      backgroundColor: alpha(colors.onPrimary, 0.22),
      overflow: 'hidden',
    },
    overviewProgressFill: {
      height: '100%',
      borderRadius: radii.pill,
      backgroundColor: colors.onPrimary,
    },
    overviewHint: {
      ...typography.caption,
      color: alpha(colors.onPrimary, 0.82),
    },

    // Prescription list
    list: {
      gap: spacing.md,
    },
    rxCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.lg,
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    rxCardPressed: {
      opacity: 0.82,
    },
    rxTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    rxDate: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    rxDoctor: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
      marginTop: spacing.xxs,
    },
    rxClinic: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    rxMedicineList: {
      gap: spacing.xxs,
      marginTop: spacing.xxs,
    },
    rxMedicineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    rxBullet: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.primary,
    },
    rxMedicineText: {
      ...typography.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    rxFooter: {
      paddingTop: spacing.sm,
      marginTop: spacing.xxs,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: spacing.xs,
    },
    rxFooterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    rxFooterLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    rxFooterValue: {
      ...typography.label,
      fontWeight: '700',
      color: colors.primary,
    },
    rxProgressTrack: {
      height: 6,
      borderRadius: radii.pill,
      backgroundColor: colors.subtle,
      overflow: 'hidden',
    },
    rxProgressFill: {
      height: '100%',
      borderRadius: radii.pill,
      backgroundColor: colors.primary,
    },
    skeletonCard: {
      height: 172,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
    },
    skeletonTitle: {
      height: 16,
      width: '54%',
      marginBottom: spacing.sm,
    },
    skeletonLine: {
      height: 10,
      width: '86%',
      marginBottom: spacing.xs,
    },
    inlineError: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.sm,
      borderRadius: radii.md,
      backgroundColor: alpha(colors.danger, 0.09),
      borderWidth: 1,
      borderColor: alpha(colors.danger, 0.22),
      marginBottom: spacing.md,
    },
    inlineErrorText: {
      ...typography.caption,
      color: colors.danger,
      flex: 1,
    },

    // Detail
    detailContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xs,
      paddingBottom: 120,
    },
    detailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingTop: spacing.xs,
      paddingBottom: spacing.sm,
    },
    detailHeaderCopy: {
      flex: 1,
      gap: 1,
    },
    detailKicker: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 0.9,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    detailTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    detailSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    metaCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.lg,
      gap: spacing.xs,
      marginTop: spacing.sm,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingVertical: spacing.xxs,
    },
    metaLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      flexShrink: 0,
    },
    metaValue: {
      ...typography.label,
      fontWeight: '600',
      color: colors.textPrimary,
      textAlign: 'right',
      flexShrink: 1,
    },
    detailSectionHeader: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: spacing.sm,
      marginTop: spacing.xl,
      marginBottom: spacing.md,
    },
    detailSectionTitle: {
      ...typography.h2,
      color: colors.textPrimary,
    },
    detailSectionMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    medicineCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.lg,
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    medicineTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    medicineName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
      flex: 1,
    },
    medicineDose: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xxs,
    },
    medicineDays: {
      ...typography.caption,
      fontWeight: '600',
      color: colors.primary,
    },
    timingRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    timingChip: {
      flex: 1,
      minHeight: 66,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.xxs,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xxs,
    },
    timingChipTaken: {
      borderColor: colors.success,
      backgroundColor: alpha(colors.success, 0.12),
    },
    timingChipPressed: {
      opacity: 0.76,
    },
    timingChipDisabled: {
      backgroundColor: colors.subtle,
      borderColor: colors.border,
      opacity: 0.72,
    },
    timingLabel: {
      ...typography.caption,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    timingLabelTaken: {
      color: colors.success,
      fontWeight: '700',
    },
    timingLabelDisabled: {
      color: colors.textSecondary,
    },
    timingStateDisabled: {
      color: colors.textSecondary,
    },
    timingState: {
      ...typography.caption,
      fontSize: 9,
      lineHeight: 12,
      color: colors.textSecondary,
    },
    timingStateTaken: {
      color: colors.success,
    },
    scheduleNote: {
      backgroundColor: colors.subtle,
      borderRadius: radii.md,
      padding: spacing.md,
      marginTop: spacing.sm,
      gap: spacing.xxs,
    },
    scheduleNoteTitle: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    scheduleNoteText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    footerSpacer: {
      height: spacing.lg,
    },
  });
}

export type PrescriptionStyles = ReturnType<typeof createPrescriptionStyles>;
