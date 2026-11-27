import type {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Pressable, ScrollView, Switch, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthorizationStatus} from '@notifee/react-native';

import type {Timing} from '../api/types';
import {useI18n} from '../i18n/useI18n';
import {
  getPermissionStatus,
  requestPermission,
} from '../reminders/reminders';
import type {
  RootStackParamList,
  StackNavigation,
} from '../navigation/types';
import {
  doseKey,
  usePrescriptionStore,
} from '../store/prescriptionStore';
import {useTheme} from '../theme/ThemeProvider';
import {
  AmbientBackground,
  AppText,
  Badge,
  Button,
  ErrorState,
  IconButton,
  Skeleton,
} from '../ui/components';
import {iconName} from '../ui/icons';
import {
  useCommonStyles,
  usePrescriptionStyles,
} from '../ui/styles';
import {formatIssuedAt} from '../utils/date';
import {
  courseDay,
  isMedicineActive,
} from '../utils/prescriptions';

const TIMING_ICON: Record<Timing, string> = {
  morning: 'sunny',
  afternoon: 'partly-sunny',
  night: 'moon',
};

export function PrescriptionDetailScreen() {
  const navigation = useNavigation<StackNavigation<'PrescriptionDetail'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PrescriptionDetail'>>();
  const theme = useTheme();
  const styles = usePrescriptionStyles();
  const common = useCommonStyles();

  const items = usePrescriptionStore(store => store.items);
  const status = usePrescriptionStore(store => store.status);
  const error = usePrescriptionStore(store => store.error);
  const taken = usePrescriptionStore(store => store.taken);
  const hydrate = usePrescriptionStore(store => store.hydrate);
  const load = usePrescriptionStore(store => store.load);
  const toggleDose = usePrescriptionStore(store => store.toggleDose);
  const prescription = items.find(
    item => item.id === route.params.prescriptionId,
  );
  const reminders = usePrescriptionStore(store => store.reminders);
  const toggleReminder = usePrescriptionStore(
    store => store.toggleReminder,
  );
  const {t} = useI18n();
  const [notificationsAllowed, setNotificationsAllowed] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    let active = true;
    getPermissionStatus()
      .then(status => {
        if (active) {
          setNotificationsAllowed(status !== AuthorizationStatus.DENIED);
        }
      })
      .catch(() => {
        if (active) {
          setNotificationsAllowed(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const reminderOn = Boolean(prescription && reminders[prescription.id]);

  const onChangeReminder = async (next: boolean) => {
    if (!prescription) {
      return;
    }
    if (next && notificationsAllowed === false) {
      const granted = await requestPermission();
      setNotificationsAllowed(granted);
      if (!granted) {
        return;
      }
    }
    await toggleReminder(prescription.id);
  };


  useEffect(() => {
    void hydrate();
    if (status === 'idle') {
      void load();
    }
  }, [hydrate, load, status]);

  const day = prescription ? courseDay(prescription.issuedAt) : 0;
  const activeDoses =
    prescription?.medicines.reduce(
      (total, medicine) =>
        isMedicineActive(medicine, prescription.issuedAt)
          ? total + medicine.timing.length
          : total,
      0,
    ) ?? 0;
  const takenDoses =
    prescription?.medicines.reduce((total, medicine) => {
      if (!isMedicineActive(medicine, prescription.issuedAt)) {
        return total;
      }
      return (
        total +
        medicine.timing.filter(timing =>
          Boolean(taken[doseKey(prescription.id, medicine.id, timing)]),
        ).length
      );
    }, 0) ?? 0;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={common.screen}>
      <AmbientBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailContent}>
        <View style={styles.detailHeader}>
          <IconButton
            icon="arrow-back"
            accessibilityLabel="Go back to prescriptions"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.detailHeaderCopy}>
            <AppText style={styles.detailKicker}>
              {t('rx.detailKicker')}
            </AppText>
            <AppText
              accessibilityRole="header"
              variant="h1"
              style={styles.detailTitle}>
              {prescription
                ? prescription.doctorName
                : t('rx.detailFallbackTitle')}
            </AppText>
            <AppText style={styles.detailSubtitle}>
              {prescription
                ? `${formatIssuedAt(prescription.issuedAt)} · Tapza Care`
                : t('rx.detailLoading')}
            </AppText>
          </View>
        </View>

        {!prescription && status === 'error' ? (
          <ErrorState
            title={t('rx.errorTitle')}
            message={error ?? t('rx.errorMessage')}
            onRetry={() => {
              void load(true);
            }}
          />
        ) : !prescription ? (
          <View style={styles.list}>
            <Skeleton style={styles.skeletonCard} />
            <Skeleton style={styles.skeletonCard} />
          </View>
        ) : (
          <>
            <View style={styles.metaCard}>
              <View style={styles.metaRow}>
                <AppText style={styles.metaLabel}>
                  {t('rx.prescribedBy')}
                </AppText>
                <AppText style={styles.metaValue}>
                  {prescription.doctorName}
                </AppText>
              </View>
              <View style={styles.metaRow}>
                <AppText style={styles.metaLabel}>{t('rx.clinic')}</AppText>
                <AppText style={styles.metaValue}>
                  {prescription.clinicName}
                </AppText>
              </View>
              <View style={styles.metaRow}>
                <AppText style={styles.metaLabel}>{t('rx.issuedOn')}</AppText>
                <AppText style={styles.metaValue}>
                  {formatIssuedAt(prescription.issuedAt)}
                </AppText>
              </View>
              <View style={styles.metaRow}>
                <AppText style={styles.metaLabel}>{t('rx.courseDay')}</AppText>
                <AppText style={styles.metaValue}>
                  {day > 0 ? t('rx.day', {day}) : '—'}
                </AppText>
              </View>
            </View>

            <View style={styles.metaCard}>
              <View style={styles.metaRow}>
                <AppText style={styles.metaLabel}>{t('remind.title')}</AppText>
                <Switch
                  accessibilityLabel={t('remind.title')}
                  value={reminderOn}
                  disabled={!prescription || notificationsAllowed === false}
                  onValueChange={next => {
                    void onChangeReminder(next);
                  }}
                  trackColor={{
                    false: theme.colors.border,
                    true: theme.colors.primaryFill,
                  }}
                  thumbColor={theme.colors.surface}
                  ios_backgroundColor={theme.colors.border}
                />
              </View>
              <AppText style={styles.scheduleNoteText}>
                {notificationsAllowed === false
                  ? t('remind.blocked')
                  : reminderOn
                    ? t('remind.on')
                    : t('remind.off')}
                {' · '}
                {t('remind.hint')}
              </AppText>
              {notificationsAllowed === false ? (
                <Button
                  label={t('remind.grant')}
                  variant="secondary"
                  size="sm"
                  onPress={() => {
                    void requestPermission().then(setNotificationsAllowed);
                  }}
                />
              ) : null}
            </View>

            <View style={styles.detailSectionHeader}>
              <AppText variant="h2" style={styles.detailSectionTitle}>
                {t('rx.medicines')}
              </AppText>
              <AppText style={styles.detailSectionMeta}>
                {t('rx.dosesTakenToday', {
                  taken: takenDoses,
                  total: activeDoses,
                })}
              </AppText>
            </View>

            <View style={styles.list}>
              {prescription.medicines.map(medicine => {
                const active = isMedicineActive(
                  medicine,
                  prescription.issuedAt,
                );
                return (
                  <View key={medicine.id} style={styles.medicineCard}>
                    <View style={styles.medicineTop}>
                      <View style={common.flexOne}>
                        <AppText style={styles.medicineName}>
                          {medicine.name}
                        </AppText>
                        <AppText style={styles.medicineDose}>
                          {medicine.dose}
                        </AppText>
                      </View>
                      <Badge
                        label={
                          active
                            ? t('rx.dayOf', {day, days: medicine.days})
                            : t('rx.completed')
                        }
                        tone={active ? 'success' : 'neutral'}
                      />
                    </View>

                    <View style={styles.timingRow}>
                      {medicine.timing.map(timing => {
                        const icon = TIMING_ICON[timing];
                        const isTaken = Boolean(
                          taken[
                            doseKey(
                              prescription.id,
                              medicine.id,
                              timing,
                            )
                          ],
                        );
                        const iconColor = !active
                          ? theme.colors.disabled
                          : isTaken
                            ? theme.colors.success
                            : theme.colors.textSecondary;

                        return (
                          <Pressable
                            key={timing}
                            accessibilityRole="checkbox"
                            accessibilityState={{
                              checked: isTaken,
                              disabled: !active,
                            }}
                            accessibilityLabel={`${t(
                              `timing.${timing}`,
                            )} dose of ${medicine.name}, ${
                              isTaken ? 'taken' : 'not taken'
                            }`}
                            disabled={!active}
                            onPress={() => {
                              toggleDose(
                                prescription.id,
                                medicine.id,
                                timing,
                              );
                            }}
                            style={({pressed}) => [
                              styles.timingChip,
                              isTaken && styles.timingChipTaken,
                              !active && styles.timingChipDisabled,
                              pressed && styles.timingChipPressed,
                            ]}>
                            <Ionicons
                              name={iconName(icon)}
                              size={16}
                              color={iconColor}
                            />
                            <AppText
                              style={[
                                styles.timingLabel,
                                isTaken && styles.timingLabelTaken,
                                !active && styles.timingLabelDisabled,
                              ]}>
                              {t(`timing.${timing}`)}
                            </AppText>
                            <AppText
                              style={[
                                styles.timingState,
                                isTaken && styles.timingStateTaken,
                                !active && styles.timingStateDisabled,
                              ]}>
                              {!active
                                ? t('rx.courseDone')
                                : isTaken
                                  ? t('rx.taken')
                                  : t('rx.markTaken')}
                            </AppText>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.scheduleNote}>
              <AppText style={styles.scheduleNoteTitle}>
                {t('rx.routineTitle')}
              </AppText>
              <AppText style={styles.scheduleNoteText}>
                {t('rx.routineBody1')}
              </AppText>
              <AppText style={styles.scheduleNoteText}>
                {t('rx.routineBody2')}
              </AppText>
            </View>

            <View style={styles.footerSpacer}>
              <AppText style={styles.rxClinic}>
                {takenDoses === 0
                  ? t('rx.noneMarked')
                  : takenDoses === 1
                    ? t('rx.markedTodayOne')
                    : t('rx.markedToday', {count: takenDoses})}
              </AppText>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
