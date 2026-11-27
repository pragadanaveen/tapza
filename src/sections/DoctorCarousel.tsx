import {Pressable, ScrollView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {SectionConfig} from '../config/types';
import {useTheme} from '../theme/ThemeProvider';
import {Avatar, AppText, Price} from '../ui/components';
import {useSectionStyles} from '../ui/styles';
import {parseDoctors} from './parse';
import type {DoctorItem} from './types';

type DoctorCarouselProps = {
  section: SectionConfig;
  onBook: (doctor: DoctorItem) => void;
};

export function DoctorCarousel({section, onBook}: DoctorCarouselProps) {
  const styles = useSectionStyles();
  const theme = useTheme();
  const doctors = parseDoctors(section);

  if (doctors.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.horizontalScroll}
      contentContainerStyle={styles.horizontalContent}>
      {doctors.map(doctor => (
        <Pressable
          key={doctor.id}
          accessibilityRole="button"
          accessibilityLabel={`Book ${doctor.name}, ${doctor.specialty}, ₹${doctor.feeInr}`}
          onPress={() => onBook(doctor)}
          style={({pressed}) => [
            styles.doctorCard,
            pressed && styles.doctorCardPressed,
          ]}>
          <View style={styles.doctorTop}>
            <Avatar uri={doctor.photoUrl} name={doctor.name} size="lg" />
            <View style={styles.doctorInfo}>
              <AppText
                variant="label"
                numberOfLines={1}
                style={styles.doctorName}>
                {doctor.name}
              </AppText>
              <AppText
                variant="caption"
                numberOfLines={1}
                style={styles.doctorSpecialty}>
                {doctor.specialty}
              </AppText>
              <AppText
                variant="caption"
                numberOfLines={1}
                style={styles.doctorLanguages}>
                {doctor.languages.join(' · ')}
              </AppText>
            </View>
          </View>

          <View style={styles.doctorSlotRow}>
            <Ionicons
              name="time-outline"
              size={14}
              color={theme.colors.success}
            />
            <AppText
              variant="caption"
              numberOfLines={1}
              style={styles.doctorSlotText}>
              {doctor.nextSlot ?? 'Next slot available'}
            </AppText>
          </View>

          <View style={styles.doctorFooter}>
            <View style={styles.doctorFeeWrap}>
              <Price amount={doctor.feeInr} />
              <AppText variant="caption" style={styles.doctorFeeMeta}>
                / visit
              </AppText>
            </View>
            <View style={styles.doctorBookLink}>
              <AppText variant="label" style={styles.doctorBookText}>
                Book
              </AppText>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={theme.colors.primary}
              />
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
