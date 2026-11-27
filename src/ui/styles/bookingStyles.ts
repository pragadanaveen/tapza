import {StyleSheet} from 'react-native';

import {alpha} from '../../theme/color';
import type {Theme} from '../../theme/types';

export function createBookingStyles(theme: Theme) {
  const {colors, spacing, radii, typography} = theme;

  return StyleSheet.create({
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: 120,
    },
    header: {
      paddingTop: spacing.xs,
      paddingBottom: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    headerCopy: {
      flex: 1,
      gap: 2,
    },
    headerKicker: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 0.9,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    headerTitle: {
      ...typography.h1,
      color: colors.textPrimary,
    },
    headerSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    section: {
      marginTop: spacing.xl,
      gap: spacing.sm,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    sectionTitle: {
      ...typography.h2,
      color: colors.textPrimary,
      flexShrink: 1,
    },
    sectionCaption: {
      ...typography.caption,
      color: colors.textSecondary,
      flexShrink: 1,
      textAlign: 'right',
    },
    serviceContext: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: colors.subtle,
      borderRadius: radii.md,
      padding: spacing.sm,
    },
    serviceContextCopy: {
      flex: 1,
      gap: 1,
    },
    serviceContextName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    serviceContextMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },

    // Doctor selection
    doctorList: {
      gap: spacing.sm,
    },
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.md,
    },
    doctorRowSelected: {
      borderColor: colors.primary,
      backgroundColor: alpha(colors.primary, 0.05),
    },
    doctorRowPressed: {
      opacity: 0.8,
    },
    doctorRowCopy: {
      flex: 1,
      gap: 2,
    },
    doctorRowName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    doctorRowSpecialty: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    doctorRowFee: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xxs,
    },
    selectedDoctorCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.md,
    },
    selectedDoctorCopy: {
      flex: 1,
      gap: 2,
    },
    selectedDoctorName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    selectedDoctorMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    headerActionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },

    // Date picker
    dateScroll: {
      marginHorizontal: -spacing.lg,
      marginTop: spacing.xs,
    },
    dateContent: {
      paddingHorizontal: spacing.lg,
      gap: spacing.sm,
    },
    dateChip: {
      minWidth: 84,
      minHeight: 68,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    },
    dateChipSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    dateChipPressed: {
      opacity: 0.8,
    },
    dateDay: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    dateDaySelected: {
      color: colors.onPrimary,
    },
    dateDate: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    dateDateSelected: {
      color: alpha(colors.onPrimary, 0.82),
    },

    // Slots
    slotsGroup: {
      marginTop: spacing.md,
      gap: spacing.sm,
    },
    slotsGroupLabel: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: colors.textSecondary,
    },
    slotsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    slotChip: {
      minWidth: 92,
      minHeight: 46,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slotChipSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    slotChipUnavailable: {
      backgroundColor: colors.subtle,
      borderColor: colors.subtle,
    },
    slotChipPressed: {
      opacity: 0.78,
    },
    slotText: {
      ...typography.label,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    slotTextSelected: {
      color: colors.onPrimary,
    },
    slotTextUnavailable: {
      color: colors.disabled,
      textDecorationLine: 'line-through',
    },
    slotsHint: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    slotsEmpty: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.lg,
      padding: spacing.lg,
      alignItems: 'center',
      gap: spacing.xs,
    },
    slotsEmptyTitle: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    slotsEmptyText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    slotSkeletonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    slotSkeleton: {
      width: 92,
      height: 46,
      borderRadius: radii.md,
    },
    doctorSkeleton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    doctorSkeletonAvatar: {
      width: 56,
      height: 56,
      borderRadius: radii.pill,
    },
    doctorSkeletonCopy: {
      flex: 1,
      gap: spacing.xs,
    },
    doctorSkeletonTitle: {
      height: 14,
      width: '58%',
    },
    doctorSkeletonLine: {
      height: 10,
      width: '78%',
    },
    footerNote: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xl,
      textAlign: 'center',
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
      marginTop: spacing.sm,
    },
    inlineErrorText: {
      ...typography.caption,
      color: colors.danger,
      flex: 1,
    },

    // Gesture-driven confirmation sheet
    sheetBackdrop: {
      backgroundColor: colors.textPrimary,
    },
    sheetBackground: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radii.xxl,
      borderTopRightRadius: radii.xxl,
    },
    sheetHandle: {
      backgroundColor: colors.border,
      width: 38,
    },
    sheetContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xs,
      paddingBottom: spacing.xxxl,
      gap: spacing.sm,
    },
    sheetKicker: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 0.9,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    sheetTitle: {
      ...typography.h2,
      color: colors.textPrimary,
    },
    sheetSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    sheetDoctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.subtle,
      borderRadius: radii.md,
      padding: spacing.sm,
      marginTop: spacing.xs,
    },
    sheetDoctorCopy: {
      flex: 1,
      gap: 1,
    },
    sheetDoctorName: {
      ...typography.label,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    sheetDoctorMeta: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    sheetSummary: {
      marginTop: spacing.xs,
    },
    sheetRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingVertical: spacing.xs,
    },
    sheetRowLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      flexShrink: 0,
    },
    sheetRowValue: {
      ...typography.label,
      fontWeight: '600',
      color: colors.textPrimary,
      textAlign: 'right',
      flexShrink: 1,
    },
    sheetFeeRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingTop: spacing.sm,
      marginTop: spacing.xs,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    sheetFeeLabel: {
      ...typography.label,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    sheetNote: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    sheetActions: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    sheetButton: {
      flex: 1,
    },

    // Success / failure overlay
    overlay: {
      ...StyleSheet.absoluteFill,
      zIndex: 100,
      backgroundColor: colors.background,
    },
    overlayScroll: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xxxl,
      paddingBottom: spacing.xxxl,
    },
    overlayContent: {
      alignItems: 'center',
      gap: spacing.xs,
    },
    successHalo: {
      width: 140,
      height: 140,
      borderRadius: radii.pill,
      backgroundColor: alpha(colors.success, 0.12),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    successRing: {
      position: 'absolute',
      width: 140,
      height: 140,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: alpha(colors.success, 0.3),
    },
    successCircle: {
      width: 88,
      height: 88,
      borderRadius: radii.pill,
      backgroundColor: colors.success,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorCircle: {
      backgroundColor: colors.danger,
    },
    errorHalo: {
      backgroundColor: alpha(colors.danger, 0.1),
    },
    errorRing: {
      borderColor: alpha(colors.danger, 0.28),
    },
    overlayKicker: {
      ...typography.caption,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.success,
      marginTop: spacing.sm,
    },
    overlayKickerError: {
      color: colors.danger,
    },
    overlayTitle: {
      ...typography.h1,
      color: colors.textPrimary,
      textAlign: 'center',
    },
    overlayBody: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: '90%',
    },
    overlayCard: {
      alignSelf: 'stretch',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.xl,
      padding: spacing.lg,
      gap: spacing.xs,
      marginTop: spacing.lg,
    },
    overlayRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingVertical: spacing.xxs,
    },
    overlayLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    overlayValue: {
      ...typography.label,
      fontWeight: '600',
      color: colors.textPrimary,
      textAlign: 'right',
      flexShrink: 1,
    },
    overlayActions: {
      alignSelf: 'stretch',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    overlayMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
      marginTop: spacing.md,
    },
    overlayMetaText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
  });
}

export type BookingStyles = ReturnType<typeof createBookingStyles>;
