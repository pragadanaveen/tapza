import {Image, Pressable, View} from 'react-native';

import type {SectionConfig} from '../config/types';
import {AppText, Badge, Price} from '../ui/components';
import {useSectionStyles} from '../ui/styles';
import {parseServices} from './parse';
import type {ServiceItem} from './types';

type ServiceGridProps = {
  section: SectionConfig;
  onBook: (service: ServiceItem) => void;
};

export function ServiceGrid({section, onBook}: ServiceGridProps) {
  const styles = useSectionStyles();
  const services = parseServices(section);

  if (services.length === 0) {
    return null;
  }

  return (
    <View style={styles.serviceGrid}>
      {services.map(service => (
        <Pressable
          key={service.id}
          accessibilityRole="button"
          accessibilityLabel={`${service.name}, ₹${service.priceInr}. Book appointment.`}
          onPress={() => onBook(service)}
          style={({pressed}) => [
            styles.serviceCard,
            pressed && styles.serviceCardPressed,
          ]}>
          <View style={styles.serviceImageWrap}>
            <Image
              accessible={false}
              source={{uri: service.imageUrl}}
              style={styles.serviceImage}
            />
            {service.badge ? (
              <View style={styles.serviceBadgeWrap}>
                <Badge label={service.badge} tone="accent" />
              </View>
            ) : null}
          </View>
          <View style={styles.serviceBody}>
            <AppText
              variant="label"
              numberOfLines={2}
              style={styles.serviceName}>
              {service.name}
            </AppText>
            <View style={styles.serviceMeta}>
              <Price amount={service.priceInr} />
              <AppText variant="caption" style={styles.serviceMetaText}>
                30 min
              </AppText>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
