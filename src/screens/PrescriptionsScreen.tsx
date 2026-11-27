import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {Prescription} from '../api/types';
import {useI18n} from '../i18n/useI18n';
import type {Translator} from '../i18n/types';
import type {TabNavigation} from '../navigation/types';
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
  EmptyState,
  ErrorState,
  Skeleton,
} from '../ui/components';
import {
  useCommonStyles,
  usePrescriptionStyles,
} from '../ui/styles';
import {formatIssuedAt} from '../utils/date';
import {activeMedicines, doseCount} from '../utils/prescriptions';

function timingSummary(
  prescription: Prescription,
  t: Translator,
): string {
  const unique = Array.from(
    new Set(prescription.medicines.flatMap(medicine => medicine.timing)),
  );
  return unique.map(timing => t(`timing.${timing}`)).join(' · ');
}

export function PrescriptionsScreen() {
  const navigation = useNavigation<TabNavigation<'prescriptions'>>();
  const styles = usePrescriptionStyles();
  const common = useCommonStyles();
  const theme = useTheme();
  const {t} = useI18n();

  const items = usePrescriptionStore(store => store.items);
  const status = usePrescriptionStore(store => store.status);
  const error = usePrescriptionStore(store => store.error);
  const taken = usePrescriptionStore(store => store.taken);
  const hydrate = usePrescriptionStore(store => store.hydrate);
  const load = usePrescriptionStore(store => store.load);

  useEffect(() => {
    void hydrate();
    if (status === 'idle') {
      void load();
    }
  }, [hydrate, load, status]);

  const summary = useMemo(
    () =>
      items.map(prescription => {
        const active = activeMedicines(prescription);
        const total = doseCount(active);
        const completed = active.reduce(
          (count, medicine) =>
            count +
            medicine.timing.filter(timing =>
              Boolean(
                taken[doseKey(prescription.id, medicine.id, timing)],
              ),
            ).length,
          0,
        );

        return {prescription, active: active.length > 0, total, completed};
      }),
    [items, taken],
  );

  const totalDoses = summary.reduce((sum, item) => sum + item.total, 0);
  const takenDoses = summary.reduce((sum, item) => sum + item.completed, 0);
  const percent =
    totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
  const activePrescriptions = summary.filter(item => item.active).length;

  const loadingFirstTime = status === 'loading' && items.length === 0;
  const refreshing = status === 'loading' && items.length > 0;

  return (
    <SafeAreaView edges={['top']} style={common.screen}>
      <AmbientBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              void load(true);
            }}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }>
        <View style={styles.header}>
          <AppText
            accessibilityRole="header"
            variant="h1"
            style={styles.headerTitle}>
            {t('rx.title')}
          </AppText>
          <AppText style={styles.headerIntro}>{t('rx.intro')}</AppText>
        </View>

        {status === 'error' && items.length > 0 ? (
          <View style={styles.inlineError}>
            <Ionicons
              name="alert-circle-outline"
              size={18}
              color={theme.colors.danger}
            />
            <AppText style={styles.inlineErrorText}>
              {error ?? t('rx.refreshError')}
            </AppText>
            <Button
              label={t('common.retry')}
              variant="ghost"
              size="sm"
              onPress={() => {
                void load(true);
              }}
            />
          </View>
        ) : null}

        {loadingFirstTime ? (
          <View style={styles.list}>
            <Skeleton style={styles.skeletonTitle} />
            <Skeleton style={styles.skeletonCard} />
            <Skeleton style={styles.skeletonCard} />
          </View>
        ) : status === 'error' && items.length === 0 ? (
          <ErrorState
            title={t('rx.errorTitle')}
            message={error ?? t('rx.errorMessage')}
            onRetry={() => {
              void load(true);
            }}
          />
        ) : items.length === 0 ? (
          <EmptyState
            icon="medkit"
            title={t('rx.emptyTitle')}
            message={t('rx.emptyMessage')}
            actionLabel={t('common.bookVisit')}
            onAction={() => navigation.navigate('home')}
          />
        ) : (
          <>
            {totalDoses > 0 ? (
              <View style={styles.overviewCard}>
                <View style={styles.overviewTop}>
                  <View style={styles.overviewCopy}>
                    <AppText style={styles.overviewLabel}>
                      {t('rx.todayDoses')}
                    </AppText>
                    <AppText style={styles.overviewCount}>
                      {t('rx.doseCount', {taken: takenDoses, total: totalDoses})}
                    </AppText>
                    <AppText style={styles.overviewMeta}>
                      {activePrescriptions === 1
                        ? t('rx.activeOne', {percent})
                        : t('rx.activeMany', {
                            count: activePrescriptions,
                            percent,
                          })}
                    </AppText>
                  </View>
                  <Badge
                    label={
                      percent === 100 ? t('rx.allDone') : t('rx.keepGoing')
                    }
                    tone={percent === 100 ? 'success' : 'accent'}
                  />
                </View>
                <View style={styles.overviewProgressTrack}>
                  <View
                    style={[
                      styles.overviewProgressFill,
                      {width: `${percent}%`},
                    ]}
                  />
                </View>
                <AppText style={styles.overviewHint}>
                  {percent === 100
                    ? t('rx.hintAllDone')
                    : t('rx.hintOpen')}
                </AppText>
              </View>
            ) : null}

            <View style={styles.list}>
              {summary.map(({prescription, active, total, completed}) => (
                <Pressable
                  key={prescription.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Prescription from ${
                    prescription.doctorName
                  }, issued ${formatIssuedAt(prescription.issuedAt)}. ${
                    active
                      ? `${completed} of ${total} doses taken today.`
                      : 'Course completed.'
                  }`}
                  onPress={() =>
                    navigation.navigate('PrescriptionDetail', {
                      prescriptionId: prescription.id,
                    })
                  }
                  style={({pressed}) => [
                    styles.rxCard,
                    pressed && styles.rxCardPressed,
                  ]}>
                  <View style={styles.rxTop}>
                    <View style={common.flexOne}>
                      <AppText style={styles.rxDate}>
                        {t('rx.issued', {
                          date: formatIssuedAt(prescription.issuedAt),
                        })}
                      </AppText>
                      <AppText style={styles.rxDoctor}>
                        {prescription.doctorName}
                      </AppText>
                      <AppText style={styles.rxClinic}>
                        {prescription.clinicName}
                      </AppText>
                    </View>
                    <Badge
                      label={active ? t('rx.active') : t('rx.completed')}
                      tone={active ? 'success' : 'neutral'}
                    />
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={theme.colors.textSecondary}
                    />
                  </View>

                  <View style={styles.rxMedicineList}>
                    {prescription.medicines.slice(0, 3).map(medicine => (
                      <View key={medicine.id} style={styles.rxMedicineRow}>
                        <View style={styles.rxBullet} />
                        <AppText style={styles.rxMedicineText}>
                          {medicine.name} · {medicine.dose}
                        </AppText>
                      </View>
                    ))}
                    {prescription.medicines.length > 3 ? (
                      <AppText style={styles.rxMedicineText}>
                        {t('rx.moreMeds', {
                          count: prescription.medicines.length - 3,
                        })}
                      </AppText>
                    ) : null}
                  </View>

                  <View style={styles.rxFooter}>
                    <View style={styles.rxFooterRow}>
                      <AppText style={styles.rxFooterLabel}>
                        {timingSummary(prescription, t)}
                      </AppText>
                      <AppText style={styles.rxFooterValue}>
                        {active
                          ? t('rx.doseToday', {completed, total})
                          : t('rx.courseDone')}
                      </AppText>
                    </View>
                    {active ? (
                      <View style={styles.rxProgressTrack}>
                        <View
                          style={[
                            styles.rxProgressFill,
                            {
                              width: `${
                                total > 0
                                  ? Math.round((completed / total) * 100)
                                  : 0
                              }%`,
                            },
                          ]}
                        />
                      </View>
                    ) : null}
                  </View>
                </Pressable>
              ))}
            </View>

            <View style={styles.footerSpacer}>
              <AppText style={styles.rxClinic}>
                {t('rx.resetNote')}
              </AppText>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
