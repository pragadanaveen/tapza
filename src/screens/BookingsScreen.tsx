import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import type {BookingRecord} from '../api/types';
import {useI18n} from '../i18n/useI18n';
import type {TabNavigation} from '../navigation/types';
import {useBookingStore} from '../store/bookingStore';
import {useTheme} from '../theme/ThemeProvider';
import {
  AmbientBackground,
  AppText,
  Badge,
  Button,
  EmptyState,
} from '../ui/components';
import {useBookingsStyles, useCommonStyles} from '../ui/styles';
import {dayBadge, formatDateTime} from '../utils/date';

const HOUR_MS = 60 * 60 * 1000;

function isUpcoming(booking: BookingRecord): boolean {
  return new Date(booking.startsAt).getTime() >= Date.now() - HOUR_MS;
}

function BookingCard({booking}: {booking: BookingRecord}) {
  const styles = useBookingsStyles();
  const common = useCommonStyles();
  const theme = useTheme();
  const {t} = useI18n();
  const date = dayBadge(booking.startsAt);
  const pending = booking.syncState === 'pending';

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.dateBadge}>
          <AppText style={styles.dateDay}>{date.day}</AppText>
          <AppText style={styles.dateMonth}>{date.month}</AppText>
        </View>
        <View style={styles.cardCopy}>
          <AppText style={styles.doctorName}>{booking.doctorName}</AppText>
          <AppText style={styles.specialty}>{booking.specialty}</AppText>
          <AppText style={styles.time}>
            {formatDateTime(booking.startsAt)}
          </AppText>
          <AppText style={styles.clinic}>{booking.clinicName}</AppText>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <AppText style={styles.service}>
          {booking.serviceName ?? 'In-clinic consultation'} · ₹
          {booking.feeInr}
        </AppText>
        {pending ? (
          <View style={common.inlineRow}>
            <ActivityIndicator size="small" color={theme.colors.warning} />
            <AppText style={styles.pendingNote}>
              {t('bookings.pending')}
            </AppText>
          </View>
        ) : (
          <Badge label={t('bookings.confirmed')} tone="success" />
        )}
      </View>
    </View>
  );
}

export function BookingsScreen() {
  const navigation = useNavigation<TabNavigation<'bookings'>>();
  const styles = useBookingsStyles();
  const common = useCommonStyles();
  const bookings = useBookingStore(store => store.bookings);
  const {t} = useI18n();

  const ordered = [...bookings].sort(
    (first, second) =>
      new Date(first.startsAt).getTime() -
      new Date(second.startsAt).getTime(),
  );
  const upcoming = ordered.filter(isUpcoming);
  const past = ordered
    .filter(item => !isUpcoming(item))
    .sort(
      (first, second) =>
        new Date(second.startsAt).getTime() -
        new Date(first.startsAt).getTime(),
    );
  const pendingCount = bookings.filter(
    item => item.syncState === 'pending',
  ).length;

  return (
    <SafeAreaView edges={['top']} style={common.screen}>
      <AmbientBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={common.flexOne}>
              <AppText
                accessibilityRole="header"
                variant="h1"
                style={styles.headerTitle}>
                {t('bookings.title')}
              </AppText>
              <AppText style={styles.headerIntro}>
                {t('bookings.intro')}
              </AppText>
            </View>
            {pendingCount > 0 ? (
              <Badge
                label={t('bookings.saving', {count: pendingCount})}
                tone="warning"
              />
            ) : null}
          </View>
        </View>

        {bookings.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="calendar"
              title={t('bookings.emptyTitle')}
              message={t('bookings.emptyMessage')}
              actionLabel={t('bookings.emptyAction')}
              onAction={() => navigation.navigate('Booking')}
            />
          </View>
        ) : (
          <>
            {upcoming.length > 0 ? (
              <>
                <AppText style={styles.groupLabel}>
                  {t('bookings.upcomingVisits')}
                </AppText>
                {upcoming.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </>
            ) : null}

            {past.length > 0 ? (
              <>
                <AppText style={styles.groupLabel}>
                  {t('bookings.pastVisits')}
                </AppText>
                {past.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </>
            ) : null}

            <Button
              label={t('bookings.bookAnother')}
              icon="calendar"
              variant="secondary"
              onPress={() => navigation.navigate('Booking')}
            />

            <View style={styles.footer}>
              <AppText style={styles.footerText}>
                {t('bookings.payNote')}
              </AppText>
              <AppText style={styles.footerText}>
                {t('bookings.holdNote')}
              </AppText>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
