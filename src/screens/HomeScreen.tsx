import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Pressable, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {
  ConfigStatus,
} from '../store/configStore';
import {useConfigStore} from '../store/configStore';
import {useI18n} from '../i18n/useI18n';
import {useTheme} from '../theme/ThemeProvider';
import {
  AmbientBackground,
  AppText,
  Avatar,
  Badge,
  EmptyState,
  GlassSurface,
} from '../ui/components';
import {useCommonStyles, useHomeStyles} from '../ui/styles';
import type {TabNavigation} from '../navigation/types';
import {SectionRenderer, type SectionEvents} from '../sections/SectionRenderer';
import {todayLongLabel} from '../utils/date';
import {HomeSkeleton} from './HomeSkeleton';

const STATUS_COPY: Record<
  Exclude<ConfigStatus, 'idle' | 'ready' | 'loading'>,
  {titleKey: 'home.bannerStale' | 'home.bannerFallback' | 'home.bannerError'; icon: string}
> = {
  stale: {titleKey: 'home.bannerStale', icon: 'alert'},
  fallback: {titleKey: 'home.bannerFallback', icon: 'alert'},
  error: {titleKey: 'home.bannerError', icon: 'alert'},
};

type BannerProps = {
  status: ConfigStatus;
  initialized: boolean;
  error: string | null;
  onRetry: () => void;
};

function ConfigStateBanner({
  status,
  initialized,
  error,
  onRetry,
}: BannerProps) {
  const styles = useHomeStyles();
  const theme = useTheme();
  const {t} = useI18n();

  if (status === 'loading' && initialized) {
    return (
      <View style={styles.loadingBanner}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <AppText variant="caption" style={styles.loadingBannerText}>
          {t('home.bannerUpdating')}
        </AppText>
      </View>
    );
  }

  if (status !== 'stale' && status !== 'fallback' && status !== 'error') {
    return null;
  }

  const copy = STATUS_COPY[status];

  return (
    <View style={styles.configBanner}>
      <View style={styles.configBannerIcon}>
        <Ionicons name={copy.icon} size={16} color={theme.colors.warning} />
      </View>
      <View style={styles.configBannerBody}>
        <AppText variant="caption" style={styles.configBannerTitle}>
          {t(copy.titleKey)}
        </AppText>
        <AppText
          variant="caption"
          numberOfLines={2}
          style={styles.configBannerMessage}>
          {status === 'error'
            ? t('home.bannerErrorBody', {
                error: error ?? 'The config could not be loaded.',
              })
            : t('home.bannerKeepUsing')}
        </AppText>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('common.retry')}
        onPress={onRetry}
        style={styles.configBannerAction}>
        <AppText style={styles.configBannerActionText}>
          {t('common.retry')}
        </AppText>
      </Pressable>
    </View>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<TabNavigation<'home'>>();
  const config = useConfigStore(store => store.config);
  const variant = useConfigStore(store => store.variant);
  const status = useConfigStore(store => store.status);
  const initialized = useConfigStore(store => store.initialized);
  const error = useConfigStore(store => store.error);
  const retry = useConfigStore(store => store.retry);
  const theme = useTheme();
  const styles = useHomeStyles();
  const common = useCommonStyles();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const {t} = useI18n();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const compactStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      scrollY.value,
      [30, 86],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: progress,
      transform: [{translateY: (1 - progress) * -10}],
    };
  });

  const events: SectionEvents = {
    onBookDoctor: doctor => {
      navigation.navigate('Booking', {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        photoUrl: doctor.photoUrl,
        feeInr: doctor.feeInr,
      });
    },
    onBookService: service => {
      navigation.navigate('Booking', {
        doctorId: service.doctorId,
        doctorName: service.doctorName,
        specialty: service.specialty,
        photoUrl: service.photoUrl,
        feeInr: service.feeInr,
        serviceId: service.id,
        serviceName: service.name,
        servicePriceInr: service.priceInr,
      });
    },
    onQuickAction: item => {
      if (item.action === 'prescriptions' || item.action === 'reminders') {
        navigation.navigate('prescriptions');
        return;
      }
      navigation.navigate('Booking');
    },
    onBrowse: () => navigation.navigate('Booking'),
  };

  return (
    <SafeAreaView edges={['top']} style={common.screen}>
      <AmbientBackground />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {!initialized ? (
          <HomeSkeleton />
        ) : (
          <>
            <View style={styles.headerWrap}>
              <GlassSurface
                radius={theme.radii.xxl}
                contentStyle={styles.header}>
                <View style={styles.headerRow}>
                  <View style={styles.headerText}>
                    <AppText
                      variant="caption"
                      style={styles.headerKicker}>
                      {t('home.eyebrow')}
                    </AppText>
                    <AppText
                      accessibilityRole="header"
                      variant="h1"
                      style={styles.headerTitle}>
                      {t('home.greeting', {name: 'Ravi'})}
                    </AppText>
                    <View style={styles.headerMetaRow}>
                      <AppText variant="caption" style={styles.headerMeta}>
                        {todayLongLabel()}
                      </AppText>
                      <View style={styles.headerDot} />
                      <AppText variant="caption" style={styles.headerMeta}>
                        {t('home.openTill')}
                      </AppText>
                    </View>
                  </View>
                  <Avatar name="Ravi Kumar" size="lg" />
                </View>

                {theme.festival ? (
                  <Badge
                    label={t('home.festivalBadge', {
                      greeting: theme.festival.greeting,
                    })}
                    tone="accent"
                  />
                ) : null}

                <ConfigStateBanner
                  status={status}
                  initialized={initialized}
                  error={error}
                  onRetry={() => {
                    void retry();
                  }}
                />
              </GlassSurface>
            </View>

            {config.sections.length > 0 ? (
              config.sections.map(section => (
                <SectionRenderer
                  key={`${variant}-${section.id}`}
                  section={section}
                  scrollY={scrollY}
                  events={events}
                />
              ))
            ) : (
              <EmptyState
                icon="sparkles"
                title={t('home.emptyTitle')}
                message={t('home.emptyMessage')}
                actionLabel={t('home.reloadConfig')}
                onAction={() => {
                  void retry();
                }}
              />
            )}

            <View style={styles.footer}>
              <AppText style={styles.footerTitle}>Tapza Care</AppText>
              <AppText style={styles.footerText}>
                {t('home.footerLine')}
              </AppText>
              <AppText style={styles.footerText}>
                {t('home.configVersion', {version: config.version})} ·{' '}
                {theme.festival
                  ? t('home.editionFestival', {name: theme.festival.name})
                  : t('home.editionEveryday')}
              </AppText>
            </View>
          </>
        )}
      </Animated.ScrollView>

      {initialized ? (
        <Animated.View
          pointerEvents="none"
          importantForAccessibility="no-hide-descendants"
          style={[
            styles.compactWrap,
            {paddingTop: insets.top + theme.spacing.xs},
            compactStyle,
          ]}>
          <GlassSurface
            kind="bar"
            radius={theme.radii.pill}
            tint={theme.glass.tabBarTint}
            style={styles.compactGlass}
            contentStyle={styles.compactHeader}>
            <View style={styles.compactLogo}>
              <Ionicons
                name="medical"
                size={16}
                color={theme.colors.onPrimary}
              />
            </View>
            <View style={styles.compactCopy}>
              <AppText style={styles.compactTitle}>Tapza Care</AppText>
              <AppText style={styles.compactMeta}>
                {theme.festival
                  ? t('home.compactFestival', {name: theme.festival.name})
                  : t('home.compactEveryday')}
              </AppText>
            </View>
          </GlassSurface>
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}
