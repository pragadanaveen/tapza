import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ApiError, createBooking, fetchDoctors, fetchSlots} from '../api/client';
import {CLINIC_NAME} from '../api/constants';
import type {Booking, Doctor, Slot} from '../api/types';
import {useI18n} from '../i18n/useI18n';
import type {
  BookingParams,
  RootStackParamList,
  StackNavigation,
} from '../navigation/types';
import {useBookingStore} from '../store/bookingStore';
import {
  AmbientBackground,
  AppText,
  Avatar,
  Button,
  EmptyState,
  ErrorState,
  IconButton,
  Price,
  Skeleton,
} from '../ui/components';
import {useBookingStyles, useCommonStyles} from '../ui/styles';
import {
  buildDateOptions,
  formatTime,
  formatTimeRange,
} from '../utils/date';
import {
  BookingResultOverlay,
  type BookingOverlayState,
} from './BookingResultOverlay';

const SNAP_POINTS = ['62%'];

type DoctorsStatus = 'loading' | 'ready' | 'error';
type SlotsStatus = 'idle' | 'loading' | 'ready' | 'error';

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

function doctorFromParams(params: BookingParams): Doctor | null {
  if (
    !params.doctorId ||
    !params.doctorName ||
    !params.specialty ||
    params.feeInr === undefined
  ) {
    return null;
  }
  return {
    id: params.doctorId,
    name: params.doctorName,
    specialty: params.specialty,
    photoUrl: params.photoUrl ?? '',
    feeInr: params.feeInr,
    languages: [],
  };
}

export function BookingScreen() {
  const navigation = useNavigation<StackNavigation<'Booking'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Booking'>>();
  const params = route.params ?? {};
  const styles = useBookingStyles();
  const common = useCommonStyles();
  const {t} = useI18n();

  const addOptimistic = useBookingStore(store => store.addOptimistic);
  const reconcile = useBookingStore(store => store.reconcile);
  const rollback = useBookingStore(store => store.rollback);

  const [dateOptions] = useState(() => buildDateOptions(7));
  const [date, setDate] = useState(dateOptions[0]!.key);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsStatus, setDoctorsStatus] = useState<DoctorsStatus>('loading');
  const [doctorsError, setDoctorsError] = useState<string | null>(null);
  const [doctorsReload, setDoctorsReload] = useState(0);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(
    params.doctorId ?? null,
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsStatus, setSlotsStatus] = useState<SlotsStatus>('idle');
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [slotsReload, setSlotsReload] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [overlay, setOverlay] = useState<BookingOverlayState | null>(null);
  const [lastAttempt, setLastAttempt] = useState<{
    doctor: Doctor;
    slot: Slot;
  } | null>(null);
  const sheetRef = useRef<BottomSheetModal>(null);
  const paramDoctor = doctorFromParams(params);

  const selectedDoctor =
    doctors.find(doctor => doctor.id === selectedDoctorId) ??
    (paramDoctor?.id === selectedDoctorId ? paramDoctor : null);

  useEffect(() => {
    let active = true;
    setDoctorsStatus('loading');
    setDoctorsError(null);

    fetchDoctors()
      .then(list => {
        if (!active) {
          return;
        }
        setDoctors(list);
        setDoctorsStatus('ready');
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setDoctorsError(messageOf(error));
        setDoctorsStatus('error');
      });

    return () => {
      active = false;
    };
  }, [doctorsReload]);

  useEffect(() => {
    if (!selectedDoctorId) {
      setSlots([]);
      setSlotsStatus('idle');
      setSlotsError(null);
      return;
    }

    let active = true;
    setSlotsStatus('loading');
    setSlotsError(null);
    setSelectedSlot(null);

    fetchSlots(selectedDoctorId, date)
      .then(list => {
        if (!active) {
          return;
        }
        setSlots(list);
        setSlotsStatus('ready');
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setSlotsError(messageOf(error));
        setSlotsStatus('error');
      });

    return () => {
      active = false;
    };
  }, [date, selectedDoctorId, slotsReload]);

  const availableCount = slots.filter(slot => slot.available).length;

  const groups = useMemo(() => {
    const buckets = [
      {key: 'morning', label: 'Morning', slots: [] as Slot[]},
      {key: 'afternoon', label: 'Afternoon', slots: [] as Slot[]},
      {key: 'evening', label: 'Evening', slots: [] as Slot[]},
    ];

    for (const slot of slots) {
      const hour = new Date(slot.startsAt).getHours();
      if (hour < 12) {
        buckets[0]!.slots.push(slot);
      } else if (hour < 17) {
        buckets[1]!.slots.push(slot);
      } else {
        buckets[2]!.slots.push(slot);
      }
    }

    return buckets.filter(bucket => bucket.slots.length > 0);
  }, [slots]);

  const selectedDateLabel =
    dateOptions.find(option => option.key === date)?.longLabel ?? '';

  const nextDate = () => {
    const index = dateOptions.findIndex(option => option.key === date);
    const next = dateOptions[index + 1];
    if (next) {
      setDate(next.key);
    } else {
      setSlotsReload(value => value + 1);
    }
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={styles.sheetBackdrop}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.36}
        pressBehavior="close"
      />
    ),
    [styles.sheetBackdrop],
  );

  const submitBooking = async (doctor: Doctor, slot: Slot) => {
    const optimistic: Booking = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      doctorId: doctor.id,
      slotId: slot.id,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      photoUrl: doctor.photoUrl,
      feeInr: doctor.feeInr,
      clinicName: CLINIC_NAME,
      serviceName: params.serviceName,
    };

    const record = addOptimistic(optimistic);
    setLastAttempt({doctor, slot});
    setOverlay({kind: 'success', booking: record});

    try {
      const confirmed = await createBooking({
        doctorId: doctor.id,
        slotId: slot.id,
      });
      const confirmedRecord = {
        ...confirmed,
        serviceName: params.serviceName,
        syncState: 'confirmed' as const,
      };
      reconcile(record.id, confirmedRecord);
      setSlots(current =>
        current.map(item =>
          item.id === slot.id ? {...item, available: false} : item,
        ),
      );
      setOverlay(current =>
        current?.kind === 'success' && current.booking.id === record.id
          ? {kind: 'success', booking: confirmedRecord}
          : current,
      );
    } catch (error) {
      rollback(record.id);
      const conflict = error instanceof ApiError && error.status === 409;
      setOverlay({
        kind: 'error',
        booking: record,
        title: conflict
          ? 'That time was just taken'
          : 'Booking did not go through',
        message: messageOf(error),
        canRetry: !conflict,
      });
      if (conflict) {
        setSlotsReload(value => value + 1);
      }
    }
  };

  const confirmSelection = () => {
    if (!selectedSlot || !selectedDoctor) {
      return;
    }
    const slot = selectedSlot;
    const doctor = selectedDoctor;
    sheetRef.current?.dismiss();
    void submitBooking(doctor, slot);
  };

  const retryBooking = () => {
    if (!lastAttempt) {
      return;
    }
    setOverlay(null);
    void submitBooking(lastAttempt.doctor, lastAttempt.slot);
  };

  const chooseAnother = () => {
    setOverlay(null);
    setSelectedSlot(null);
    setSlotsReload(value => value + 1);
  };

  const goToBookings = () => {
    setOverlay(null);
    navigation.navigate('Tabs', {screen: 'bookings'});
  };

  const goHome = () => {
    setOverlay(null);
    navigation.navigate('Tabs', {screen: 'home'});
  };

  const doctorList =
    doctorsStatus === 'ready' && doctors.length > 0
      ? doctors
      : paramDoctor
        ? [paramDoctor]
        : [];

  return (
    <SafeAreaView edges={['top', 'bottom']} style={common.screen}>
      <AmbientBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-back"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerCopy}>
            <AppText variant="caption" style={styles.headerKicker}>
              {t('book.kicker')}
            </AppText>
            <AppText
              accessibilityRole="header"
              variant="h1"
              style={styles.headerTitle}>
              {t('book.title')}
            </AppText>
            <AppText variant="caption" style={styles.headerSubtitle}>
              {t('book.subtitle')}
            </AppText>
          </View>
        </View>

        {params.serviceName ? (
          <View style={styles.serviceContext}>
            <IconButton
              icon="document"
              accessibilityLabel="Service booking"
              ghost
            />
            <View style={styles.serviceContextCopy}>
              <AppText style={styles.serviceContextName}>
                {params.serviceName}
              </AppText>
              <AppText style={styles.serviceContextMeta}>
                {t('book.serviceClinic')}
              </AppText>
            </View>
            {params.servicePriceInr !== undefined ? (
              <Price amount={params.servicePriceInr} />
            ) : null}
          </View>
        ) : null}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h2" style={styles.sectionTitle}>
              {selectedDoctorId ? t('book.yourDoctor') : t('book.chooseDoctor')}
            </AppText>
            {selectedDoctorId && doctors.length > 1 ? (
              <Button
                label={t('book.change')}
                variant="ghost"
                size="sm"
                onPress={() => {
                  setSelectedDoctorId(null);
                  setSelectedSlot(null);
                }}
              />
            ) : null}
          </View>

          {selectedDoctorId && selectedDoctor ? (
            <View style={styles.selectedDoctorCard}>
              <Avatar
                uri={selectedDoctor.photoUrl}
                name={selectedDoctor.name}
                size="lg"
              />
              <View style={styles.selectedDoctorCopy}>
                <AppText style={styles.selectedDoctorName}>
                  {selectedDoctor.name}
                </AppText>
                <AppText style={styles.selectedDoctorMeta}>
                  {selectedDoctor.specialty}
                </AppText>
                <Price amount={selectedDoctor.feeInr} />
              </View>
            </View>
          ) : doctorsStatus === 'loading' && !selectedDoctor ? (
            <View style={styles.doctorList}>
              {[0, 1].map(item => (
                <View key={item} style={styles.doctorSkeleton}>
                  <Skeleton style={styles.doctorSkeletonAvatar} />
                  <View style={styles.doctorSkeletonCopy}>
                    <Skeleton style={styles.doctorSkeletonTitle} />
                    <Skeleton style={styles.doctorSkeletonLine} />
                  </View>
                </View>
              ))}
            </View>
          ) : doctorsStatus === 'error' && !selectedDoctor ? (
            <ErrorState
              title={t('book.doctorsErrorTitle')}
              message={doctorsError ?? t('rx.errorMessage')}
              onRetry={() => setDoctorsReload(value => value + 1)}
            />
          ) : !selectedDoctorId && doctorList.length === 0 ? (
            <EmptyState
              icon="stethoscope"
              title={t('book.doctorsEmptyTitle')}
              message={t('book.doctorsEmptyMessage')}
              actionLabel={t('book.refresh')}
              onAction={() => setDoctorsReload(value => value + 1)}
            />
          ) : !selectedDoctorId ? (
            <View style={styles.doctorList}>
              {doctorList.map(doctor => (
                <Pressable
                  key={doctor.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Choose ${doctor.name}, ${doctor.specialty}`}
                  onPress={() => {
                    setSelectedDoctorId(doctor.id);
                    setSelectedSlot(null);
                  }}
                  style={({pressed}) => [
                    styles.doctorRow,
                    pressed && styles.doctorRowPressed,
                  ]}>
                  <Avatar
                    uri={doctor.photoUrl}
                    name={doctor.name}
                    size="md"
                  />
                  <View style={styles.doctorRowCopy}>
                    <AppText style={styles.doctorRowName}>
                      {doctor.name}
                    </AppText>
                    <AppText style={styles.doctorRowSpecialty}>
                      {doctor.specialty}
                    </AppText>
                    <AppText style={styles.doctorRowFee}>
                      ₹{doctor.feeInr} · {doctor.languages.join(' · ')}
                    </AppText>
                  </View>
                  <IconButton
                    icon="chevron"
                    accessibilityLabel={`Select ${doctor.name}`}
                    ghost
                    onPress={() => {
                      setSelectedDoctorId(doctor.id);
                      setSelectedSlot(null);
                    }}
                  />
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        {selectedDoctorId ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppText variant="h2" style={styles.sectionTitle}>
                  {t('book.pickDate')}
                </AppText>
                <AppText variant="caption" style={styles.sectionCaption}>
                  {selectedDateLabel}
                </AppText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.dateScroll}
                contentContainerStyle={styles.dateContent}>
                {dateOptions.map(option => {
                  const active = option.key === date;
                  return (
                    <Pressable
                      key={option.key}
                      accessibilityRole="button"
                      accessibilityState={{selected: active}}
                      accessibilityLabel={`${option.dayLabel}, ${option.dateLabel}`}
                      onPress={() => setDate(option.key)}
                      style={({pressed}) => [
                        styles.dateChip,
                        active && styles.dateChipSelected,
                        pressed && styles.dateChipPressed,
                      ]}>
                      <AppText
                        variant="caption"
                        style={[
                          styles.dateDay,
                          active && styles.dateDaySelected,
                        ]}>
                        {option.dayLabel}
                      </AppText>
                      <AppText
                        variant="caption"
                        style={[
                          styles.dateDate,
                          active && styles.dateDateSelected,
                        ]}>
                        {option.dateLabel}
                      </AppText>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppText variant="h2" style={styles.sectionTitle}>
                  {t('book.pickTime')}
                </AppText>
                {slotsStatus === 'ready' ? (
                  <AppText variant="caption" style={styles.sectionCaption}>
                    {t('book.openSlots', {count: availableCount})}
                  </AppText>
                ) : null}
              </View>

              {slotsStatus === 'loading' ? (
                <View style={styles.slotSkeletonRow}>
                  {[0, 1, 2, 3, 4, 5].map(item => (
                    <Skeleton key={item} style={styles.slotSkeleton} />
                  ))}
                </View>
              ) : slotsStatus === 'error' ? (
                <ErrorState
                  title={t('book.timesErrorTitle')}
                  message={slotsError ?? t('rx.errorMessage')}
                  onRetry={() => setSlotsReload(value => value + 1)}
                />
              ) : slots.length === 0 ? (
                <View style={styles.slotsEmpty}>
                  <AppText style={styles.slotsEmptyTitle}>
                    {t('book.noSlotsTitle')}
                  </AppText>
                  <AppText style={styles.slotsEmptyText}>
                    {t('book.noSlotsMessage')}
                  </AppText>
                  <Button
                    label={t('book.nextDay')}
                    variant="secondary"
                    size="sm"
                    onPress={nextDate}
                  />
                </View>
              ) : (
                <>
                  {groups.map(group => (
                    <View key={group.key} style={styles.slotsGroup}>
                      <AppText style={styles.slotsGroupLabel}>
                        {group.label}
                      </AppText>
                      <View style={styles.slotsGrid}>
                        {group.slots.map(slot => (
                          <Pressable
                            key={slot.id}
                            accessibilityRole="button"
                            accessibilityState={{
                              disabled: !slot.available,
                              selected: selectedSlot?.id === slot.id,
                            }}
                            accessibilityLabel={`${formatTime(
                              slot.startsAt,
                            )}, ${slot.available ? 'available' : 'taken'}`}
                            disabled={!slot.available}
                            onPress={() => {
                              setSelectedSlot(slot);
                              sheetRef.current?.present();
                            }}
                            style={({pressed}) => [
                              styles.slotChip,
                              !slot.available && styles.slotChipUnavailable,
                              selectedSlot?.id === slot.id &&
                                styles.slotChipSelected,
                              pressed && styles.slotChipPressed,
                            ]}>
                            <AppText
                              variant="label"
                              style={[
                                styles.slotText,
                                !slot.available && styles.slotTextUnavailable,
                                selectedSlot?.id === slot.id &&
                                  styles.slotTextSelected,
                              ]}>
                              {formatTime(slot.startsAt)}
                            </AppText>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  ))}
                  <AppText variant="caption" style={styles.slotsHint}>
                    {availableCount > 0
                      ? t('book.slotsHint')
                      : t('book.slotsTaken')}
                  </AppText>
                </>
              )}
            </View>
          </>
        ) : (
          <AppText variant="caption" style={styles.slotsHint}>
            {t('book.chooseDoctorFirst')}
          </AppText>
        )}

        <AppText variant="caption" style={styles.footerNote}>
          {t('book.footerNote')}
        </AppText>
      </ScrollView>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={SNAP_POINTS}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        onDismiss={() => setSelectedSlot(null)}>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetContent}>
          <AppText variant="caption" style={styles.sheetKicker}>
            {t('book.sheetKicker')}
          </AppText>
          <AppText
            accessibilityRole="header"
            variant="h2"
            style={styles.sheetTitle}>
            {t('book.sheetTitle')}
          </AppText>
          <AppText variant="caption" style={styles.sheetSubtitle}>
            {t('book.sheetSubtitle')}
          </AppText>

          {selectedDoctor && selectedSlot ? (
            <>
              <View style={styles.sheetDoctorRow}>
                <Avatar
                  uri={selectedDoctor.photoUrl}
                  name={selectedDoctor.name}
                  size="sm"
                />
                <View style={styles.sheetDoctorCopy}>
                  <AppText style={styles.sheetDoctorName}>
                    {selectedDoctor.name}
                  </AppText>
                  <AppText style={styles.sheetDoctorMeta}>
                    {selectedDoctor.specialty}
                  </AppText>
                </View>
              </View>

              <View style={styles.sheetSummary}>
                <View style={styles.sheetRow}>
                  <AppText variant="caption" style={styles.sheetRowLabel}>
                    {t('book.date')}
                  </AppText>
                  <AppText variant="label" style={styles.sheetRowValue}>
                    {selectedDateLabel}
                  </AppText>
                </View>
                <View style={styles.sheetRow}>
                  <AppText variant="caption" style={styles.sheetRowLabel}>
                    {t('book.time')}
                  </AppText>
                  <AppText variant="label" style={styles.sheetRowValue}>
                    {formatTimeRange(
                      selectedSlot.startsAt,
                      selectedSlot.endsAt,
                    )}
                  </AppText>
                </View>
                {params.serviceName ? (
                  <View style={styles.sheetRow}>
                    <AppText variant="caption" style={styles.sheetRowLabel}>
                      {t('book.service')}
                    </AppText>
                    <AppText variant="label" style={styles.sheetRowValue}>
                      {params.serviceName}
                    </AppText>
                  </View>
                ) : null}
                <View style={styles.sheetRow}>
                  <AppText variant="caption" style={styles.sheetRowLabel}>
                    {t('book.visit')}
                  </AppText>
                  <AppText variant="label" style={styles.sheetRowValue}>
                    {t('book.visitValue')}
                  </AppText>
                </View>
              </View>

              <View style={styles.sheetFeeRow}>
                <AppText style={styles.sheetFeeLabel}>
                  {t('book.fee')}
                </AppText>
                <Price amount={selectedDoctor.feeInr} />
              </View>
              <AppText variant="caption" style={styles.sheetNote}>
                {t('book.sheetNote')}
              </AppText>

              <View style={styles.sheetActions}>
                <Button
                  label={t('book.notNow')}
                  variant="secondary"
                  style={styles.sheetButton}
                  onPress={() => sheetRef.current?.dismiss()}
                />
                <Button
                  label={t('book.confirm')}
                  style={styles.sheetButton}
                  onPress={confirmSelection}
                />
              </View>
            </>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheetModal>

      {overlay ? (
        <BookingResultOverlay
          key={`${overlay.kind}-${overlay.booking.id}`}
          state={overlay}
          onRetry={retryBooking}
          onChooseAnother={chooseAnother}
          onViewBookings={goToBookings}
          onDone={goHome}
        />
      ) : null}
    </SafeAreaView>
  );
}
