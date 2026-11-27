import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {resetMockApi} from '../api/client';
import {VARIANTS} from '../config';
import {LOCALES} from '../i18n';
import {useI18n} from '../i18n/useI18n';
import type {Locale} from '../i18n/types';
import type {ConfigVariant} from '../config/types';
import type {ConfigSource} from '../config/service';
import {useAppearanceStore} from '../store/appearanceStore';
import {useBookingStore} from '../store/bookingStore';
import {
  useConfigStore,
  type ConfigStatus,
} from '../store/configStore';
import {
  useNetworkStore,
  type FailureMode,
  type LatencyPreset,
} from '../store/networkStore';
import {usePrescriptionStore} from '../store/prescriptionStore';
import {useTheme} from '../theme/ThemeProvider';
import type {AppearanceMode} from '../theme/types';
import {
  AmbientBackground,
  AppText,
  Avatar,
  Badge,
  type BadgeTone,
  Button,
  Chip,
  GlassSurface,
  SegmentedControl,
} from '../ui/components';
import {
  useCommonStyles,
  useProfileStyles,
} from '../ui/styles';
import {formatUpdatedAt} from '../utils/date';

const STATUS_COPY: Record<
  ConfigStatus,
  {label: string; hint: string; tone: BadgeTone}
> = {
  idle: {
    label: 'Idle',
    hint: 'The remote config has not been requested yet.',
    tone: 'neutral',
  },
  loading: {
    label: 'Syncing',
    hint: 'Fetching the latest clinic configuration…',
    tone: 'warning',
  },
  ready: {
    label: 'Remote config',
    hint: 'The live configuration is on screen and saved for offline use.',
    tone: 'success',
  },
  stale: {
    label: 'Saved copy',
    hint: 'The network was unavailable, so the last saved config is on screen.',
    tone: 'warning',
  },
  fallback: {
    label: 'Bundled defaults',
    hint: 'No saved config was available. The bundled theme keeps the app usable.',
    tone: 'warning',
  },
  error: {
    label: 'Switch failed',
    hint: 'The requested theme could not load, so the current theme stayed put.',
    tone: 'danger',
  },
};

const SOURCE_COPY: Record<ConfigSource, string> = {
  remote: 'Network',
  cache: 'Saved copy',
  fallback: 'Bundled default',
};

const LATENCY_OPTIONS: {id: LatencyPreset; label: string}[] = [
  {id: 'fast', label: 'Fast'},
  {id: 'normal', label: 'Normal'},
  {id: 'slow', label: 'Slow'},
];

const FAILURE_OPTIONS: {id: FailureMode; label: string}[] = [
  {id: 'none', label: 'No failures'},
  {id: 'all', label: 'Everything'},
  {id: 'config', label: 'Config'},
  {id: 'booking', label: 'Booking'},
  {id: 'slotConflict', label: 'Slot taken'},
];


export function ProfileScreen() {
  const styles = useProfileStyles();
  const common = useCommonStyles();
  const theme = useTheme();

  const config = useConfigStore(store => store.config);
  const variant = useConfigStore(store => store.variant);
  const status = useConfigStore(store => store.status);
  const error = useConfigStore(store => store.error);
  const source = useConfigStore(store => store.source);
  const lastUpdated = useConfigStore(store => store.lastUpdated);
  const switchVariant = useConfigStore(store => store.switchVariant);
  const retry = useConfigStore(store => store.retry);

  const latency = useNetworkStore(store => store.latency);
  const failureMode = useNetworkStore(store => store.failureMode);
  const emptyLists = useNetworkStore(store => store.emptyLists);
  const setLatency = useNetworkStore(store => store.setLatency);
  const setFailureMode = useNetworkStore(store => store.setFailureMode);
  const setEmptyLists = useNetworkStore(store => store.setEmptyLists);
  const clearBookings = useBookingStore(store => store.clear);
  const resetTaken = usePrescriptionStore(store => store.resetTaken);

  const reminders = usePrescriptionStore(store => store.reminders);
  const resetReminders = usePrescriptionStore(store => store.resetReminders);
  const {t, locale, setLocale} = useI18n();
  const appearance = useAppearanceStore(store => store.preference);
  const setAppearance = useAppearanceStore(store => store.setPreference);
  const reduceTransparency = useAppearanceStore(
    store => store.reduceTransparency,
  );
  const systemReduceTransparency = useAppearanceStore(
    store => store.systemReduceTransparency,
  );
  const setReduceTransparency = useAppearanceStore(
    store => store.setReduceTransparency,
  );

  const [resetting, setResetting] = useState(false);
  const statusCopy = STATUS_COPY[status];
  const variantOptions = Object.values(VARIANTS).map(item => ({
    id: item.id,
    label: item.shortLabel,
  }));
  const appearanceOptions: {id: AppearanceMode; label: string}[] = [
    {id: 'system', label: t('profile.system')},
    {id: 'light', label: t('profile.light')},
    {id: 'dark', label: t('profile.dark')},
  ];
  const languageOptions = LOCALES.map(item => ({
    id: item.id,
    label: item.label,
  }));
  const reminderCount = Object.keys(reminders).length;

  const resetDemo = async () => {
    setResetting(true);
    useNetworkStore.getState().reset();
    clearBookings();
    resetMockApi();
    await resetTaken();
    setResetting(false);
    Alert.alert(
      'Demo reset',
      'Bookings, dose ticks and the demo switches are back to their starting state.',
    );
  };

  return (
    <SafeAreaView edges={['top']} style={common.screen}>
      <AmbientBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText
            accessibilityRole="header"
            variant="h1"
            style={styles.headerTitle}>
            {t('profile.title')}
          </AppText>
          <AppText style={styles.headerIntro}>{t('profile.intro')}</AppText>
        </View>

        <GlassSurface contentStyle={styles.identityCard}>
          <Avatar name="Ravi Kumar" size="lg" />
          <View style={styles.identityCopy}>
            <AppText style={styles.identityName}>Ravi Kumar</AppText>
            <AppText style={styles.identityMeta}>
              Jubilee Hills · Family account
            </AppText>
            <AppText style={styles.identityPhone}>+91 98490 12345</AppText>
          </View>
          <Badge label="Member" tone="accent" />
        </GlassSurface>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t('profile.appearance')}
          </AppText>
          <GlassSurface contentStyle={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>{t('profile.theme')}</AppText>
                <AppText style={styles.rowHint}>
                  Follow the phone, or lock the app to light or dark glass.
                </AppText>
              </View>
              <AppText style={styles.rowValue}>
                {appearance === 'system'
                  ? `${t('profile.system')} · ${
                      theme.isDark ? t('profile.dark') : t('profile.light')
                    }`
                  : theme.isDark
                    ? t('profile.dark')
                    : t('profile.light')}
              </AppText>
            </View>
            <SegmentedControl
              options={appearanceOptions}
              value={appearance}
              onChange={id => {
                void setAppearance(id as AppearanceMode);
              }}
              style={styles.segmentedSpacing}
            />

            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>
                  {t('profile.reduceTransparency')}
                </AppText>
                <AppText style={styles.rowHint}>
                  Replaces live blur with a frosted, opaque surface for easier
                  reading.
                </AppText>
              </View>
              <Switch
                accessibilityLabel="Reduce transparency and turn off live blur"
                value={reduceTransparency || systemReduceTransparency}
                onValueChange={value => {
                  void setReduceTransparency(value);
                }}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primaryFill,
                }}
                thumbColor={theme.colors.surface}
                ios_backgroundColor={theme.colors.border}
                style={styles.switch}
              />
            </View>
            {systemReduceTransparency ? (
              <AppText style={styles.demoNote}>
                Your phone’s accessibility setting is also asking apps to reduce
                transparency, so live blur stays off.
              </AppText>
            ) : (
              <AppText style={styles.demoNote}>
                Live blur is rendered by the device, so it follows the light or
                dark glass treatment automatically.
              </AppText>
            )}
          </GlassSurface>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t('profile.language')}
          </AppText>
          <GlassSurface contentStyle={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>
                  {t('profile.language')}
                </AppText>
                <AppText style={styles.rowHint}>
                  {t('profile.languageHint')}
                </AppText>
              </View>
            </View>
            <SegmentedControl
              options={languageOptions}
              value={locale}
              onChange={id => {
                void setLocale(id as Locale);
              }}
              style={styles.segmentedSpacing}
            />
          </GlassSurface>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t('profile.remindersSection')}
          </AppText>
          <GlassSurface contentStyle={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>{t('remind.title')}</AppText>
                <AppText style={styles.rowHint}>{t('remind.hint')}</AppText>
              </View>
              <AppText style={styles.rowValue}>
                {reminderCount > 0
                  ? t('profile.remindersOn', {count: reminderCount})
                  : t('profile.remindersOff')}
              </AppText>
            </View>
            {reminderCount > 0 ? (
              <Button
                label={t('profile.turnOffAll')}
                variant="ghost"
                size="sm"
                onPress={() => {
                  void resetReminders();
                }}
                style={styles.actionButton}
              />
            ) : null}
          </GlassSurface>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowCopy}>
              <AppText style={styles.sectionTitle}>
                {t('profile.clinicTheme')}
              </AppText>
              <AppText style={styles.rowHint}>
                Switch the config-driven theme at runtime.
              </AppText>
            </View>
            <Badge label={statusCopy.label} tone={statusCopy.tone} />
          </View>
          <GlassSurface contentStyle={styles.card}>
            <SegmentedControl
              options={variantOptions}
              value={variant}
              onChange={id => {
                void switchVariant(id as ConfigVariant);
              }}
            />
            <AppText style={styles.demoNote}>
              {VARIANTS[variant].label} changes colours, the home banner,
              section order and tab order. No screen component changes.
            </AppText>
            {status === 'loading' ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator
                  size="small"
                  color={theme.colors.primary}
                />
                <AppText style={styles.loadingText}>
                  Applying the new clinic config…
                </AppText>
              </View>
            ) : null}
            {(status === 'stale' ||
              status === 'fallback' ||
              status === 'error') && (
              <View style={styles.statusBanner}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={theme.colors.warning}
                />
                <AppText style={styles.statusBannerText}>
                  {error ?? statusCopy.hint}
                </AppText>
                <Button
                  label={t('common.retry')}
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    void retry();
                  }}
                />
              </View>
            )}
          </GlassSurface>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t('profile.remoteConfig')}
          </AppText>
          <GlassSurface contentStyle={styles.card}>
            <View style={styles.row}>
              <AppText style={styles.rowHint}>{t('profile.version')}</AppText>
              <AppText style={styles.rowValue}>v{config.version}</AppText>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <AppText style={styles.rowHint}>{t('profile.source')}</AppText>
              <AppText style={styles.rowValue}>
                {source ? SOURCE_COPY[source] : t('profile.notRequested')}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText style={styles.rowHint}>{t('profile.lastSaved')}</AppText>
              <AppText style={styles.rowValue}>
                {formatUpdatedAt(lastUpdated)}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText style={styles.rowHint}>{t('profile.festival')}</AppText>
              <AppText style={styles.rowValue}>
                {config.theme.festival?.name ?? t('profile.none')}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText style={styles.rowHint}>{t('profile.theme')}</AppText>
              <AppText style={styles.rowValue}>
                {theme.isDark
                  ? t('profile.darkSurface')
                  : t('profile.lightSurface')}{' '}
                · {theme.colors.primary}
              </AppText>
            </View>
            <View style={styles.actions}>
              <Button
                label={t('profile.reloadConfig')}
                icon="refresh"
                variant="secondary"
                size="sm"
                loading={status === 'loading'}
                onPress={() => {
                  void retry();
                }}
                style={styles.actionButton}
              />
              <Button
                label={t('profile.resetDemo')}
                icon="refresh"
                variant="ghost"
                size="sm"
                loading={resetting}
                onPress={() => {
                  Alert.alert(
                    'Reset demo data?',
                    'This clears bookings, today’s dose ticks and the network switches.',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Reset',
                        style: 'destructive',
                        onPress: () => {
                          void resetDemo();
                        },
                      },
                    ],
                  );
                }}
                style={styles.actionButton}
              />
            </View>
          </GlassSurface>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t('profile.demoResilience')}
          </AppText>
          <GlassSurface contentStyle={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>
                  {t('profile.networkLatency')}
                </AppText>
                <AppText style={styles.rowHint}>
                  Slow shows skeletons and the loading states for longer.
                </AppText>
              </View>
            </View>
            <SegmentedControl
              options={LATENCY_OPTIONS}
              value={latency}
              onChange={id => setLatency(id as LatencyPreset)}
              style={styles.segmentedSpacing}
            />

            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>
                  {t('profile.simulateFailure')}
                </AppText>
                <AppText style={styles.rowHint}>
                  The next request fails with a friendly, recoverable error.
                </AppText>
              </View>
            </View>
            <View style={styles.chips}>
              {FAILURE_OPTIONS.map(option => (
                <Chip
                  key={option.id}
                  label={option.label}
                  selected={failureMode === option.id}
                  onPress={() => setFailureMode(option.id)}
                />
              ))}
            </View>

            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.rowCopy}>
                <AppText style={styles.rowLabel}>
                  {t('profile.emptyLists')}
                </AppText>
                <AppText style={styles.rowHint}>
                  Doctors, slots and prescriptions return no items so the empty
                  states can be checked.
                </AppText>
              </View>
              <Switch
                accessibilityLabel="Return empty lists from the mock API"
                value={emptyLists}
                onValueChange={setEmptyLists}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primaryFill,
                }}
                thumbColor={theme.colors.surface}
                ios_backgroundColor={theme.colors.border}
                style={styles.switch}
              />
            </View>

            <AppText style={styles.demoNote}>
              These switches only affect the bundled mock API. They are here so
              the loading, failure, empty and conflict paths can be demonstrated
              without changing code.
            </AppText>
          </GlassSurface>
        </View>

        <View style={styles.footer}>
          <AppText style={styles.footerTitle}>Tapza Care</AppText>
          <AppText style={styles.footerText}>
            React Native assignment · build {config.version} ·{' '}
            {VARIANTS[variant].label}
          </AppText>
          <AppText style={styles.footerText}>
            Demo controls would be removed from a production build.
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
