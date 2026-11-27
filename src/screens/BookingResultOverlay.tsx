import {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import type {BookingRecord} from '../api/types';
import {readableOn} from '../theme/color';
import {useI18n} from '../i18n/useI18n';
import {useTheme} from '../theme/ThemeProvider';
import {AppText, Button} from '../ui/components';
import {useBookingStyles} from '../ui/styles';
import {formatDateTime} from '../utils/date';

export type BookingOverlayState =
  | {
      kind: 'success';
      booking: BookingRecord;
    }
  | {
      kind: 'error';
      booking: BookingRecord;
      title: string;
      message: string;
      canRetry: boolean;
    };

type BookingResultOverlayProps = {
  state: BookingOverlayState;
  onRetry: () => void;
  onChooseAnother: () => void;
  onViewBookings: () => void;
  onDone: () => void;
};

export function BookingResultOverlay({
  state,
  onRetry,
  onChooseAnother,
  onViewBookings,
  onDone,
}: BookingResultOverlayProps) {
  const {t} = useI18n();
  const styles = useBookingStyles();
  const theme = useTheme();
  const appear = useSharedValue(0);
  const ring = useSharedValue(0);

  useEffect(() => {
    appear.value = withTiming(1, {duration: 240});
    ring.value = withRepeat(withTiming(1, {duration: 1600}), -1, false);

    return () => {
      cancelAnimation(appear);
      cancelAnimation(ring);
    };
  }, [appear, ring]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: appear.value,
    transform: [{translateY: (1 - appear.value) * 18}],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{scale: 0.65 + appear.value * 0.35}],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: (1 - ring.value) * 0.6,
    transform: [{scale: 1 + ring.value * 0.2}],
  }));

  const success = state.kind === 'success';
  const booking = state.booking;
  const iconColor = readableOn(
    success ? theme.colors.success : theme.colors.danger,
  );

  return (
    <View
      accessibilityViewIsModal
      style={styles.overlay}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.overlayScroll}>
        <Animated.View style={[styles.overlayContent, contentStyle]}>
          <Animated.View
            style={[
              styles.successHalo,
              !success && styles.errorHalo,
              haloStyle,
            ]}>
            {success ? (
              <Animated.View
                style={[styles.successRing, ringStyle]}
              />
            ) : (
              <Animated.View
                style={[styles.successRing, styles.errorRing, ringStyle]}
              />
            )}
            <View
              style={[
                styles.successCircle,
                !success && styles.errorCircle,
              ]}>
              <Ionicons
                name={success ? 'checkmark' : 'close'}
                size={42}
                color={iconColor}
              />
            </View>
          </Animated.View>

          <AppText
            variant="caption"
            style={[
              styles.overlayKicker,
              !success && styles.overlayKickerError,
            ]}>
            {success ? t('overlay.confirmedKicker') : t('overlay.failedKicker')}
          </AppText>
          <AppText
            accessibilityRole="header"
            variant="h1"
            style={styles.overlayTitle}>
            {success ? t('overlay.bookedTitle') : state.title}
          </AppText>
          <AppText variant="body" style={styles.overlayBody}>
            {success
              ? t('overlay.bookedBody', {
                  doctor: booking.doctorName,
                  when: formatDateTime(booking.startsAt),
                })
              : state.message}
          </AppText>

          <View style={styles.overlayCard}>
            <View style={styles.overlayRow}>
              <AppText variant="caption" style={styles.overlayLabel}>
                {t('overlay.doctor')}
              </AppText>
              <AppText variant="label" style={styles.overlayValue}>
                {booking.doctorName}
              </AppText>
            </View>
            <View style={styles.overlayRow}>
              <AppText variant="caption" style={styles.overlayLabel}>
                {t('overlay.when')}
              </AppText>
              <AppText variant="label" style={styles.overlayValue}>
                {formatDateTime(booking.startsAt)}
              </AppText>
            </View>
            <View style={styles.overlayRow}>
              <AppText variant="caption" style={styles.overlayLabel}>
                {t('overlay.where')}
              </AppText>
              <AppText variant="label" style={styles.overlayValue}>
                {booking.clinicName}
              </AppText>
            </View>
            {booking.serviceName ? (
              <View style={styles.overlayRow}>
                <AppText variant="caption" style={styles.overlayLabel}>
                  {t('overlay.service')}
                </AppText>
                <AppText variant="label" style={styles.overlayValue}>
                  {booking.serviceName}
                </AppText>
              </View>
            ) : null}
            <View style={styles.overlayRow}>
              <AppText variant="caption" style={styles.overlayLabel}>
                {t('overlay.consultation')}
              </AppText>
              <AppText variant="label" style={styles.overlayValue}>
                {t('overlay.feePayClinic', {fee: booking.feeInr})}
              </AppText>
            </View>
          </View>

          {success ? (
            <View style={styles.overlayActions}>
              <Button
                label={t('overlay.viewBookings')}
                icon="calendar"
                onPress={onViewBookings}
              />
              <Button
                label={t('overlay.backHome')}
                variant="secondary"
                onPress={onDone}
              />
            </View>
          ) : (
            <View style={styles.overlayActions}>
              {state.canRetry ? (
                <Button
                  label={t('overlay.tryAgain')}
                  icon="refresh"
                  onPress={onRetry}
                />
              ) : null}
              <Button
                label={t('overlay.chooseAnother')}
                variant={state.canRetry ? 'secondary' : 'primary'}
                onPress={onChooseAnother}
              />
              {!state.canRetry ? (
                <Button label={t('overlay.close')} variant="ghost" onPress={onDone} />
              ) : null}
            </View>
          )}

          <View style={styles.overlayMeta}>
            <Ionicons
              name={success ? 'checkmark-circle-outline' : 'alert-circle-outline'}
              size={14}
              color={theme.colors.textSecondary}
            />
            <AppText variant="caption" style={styles.overlayMetaText}>
              {success
                ? t('overlay.whatsapp')
                : t('overlay.nothingCharged')}
            </AppText>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
