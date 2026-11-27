import {View} from 'react-native';

import {Skeleton} from '../ui/components';
import {useHomeStyles} from '../ui/styles';

/**
 * Matches the rhythm of the real home: header, hero, quick actions, a doctor
 * shelf and a two-column service grid. The skeleton does not jump when the
 * real content lands.
 */
export function HomeSkeleton() {
  const styles = useHomeStyles();

  return (
    <View>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonHeaderRow}>
          <View style={styles.skeletonHeaderCopy}>
            <Skeleton style={styles.skeletonLine} />
            <Skeleton style={styles.skeletonTitle} />
            <Skeleton style={styles.skeletonLine} />
          </View>
          <Skeleton style={styles.skeletonAvatar} />
        </View>
      </View>

      <Skeleton style={styles.skeletonHero} />

      <View style={styles.skeletonBand}>
        <Skeleton style={styles.skeletonSectionTitle} />
        <View style={styles.skeletonRow}>
          {[0, 1, 2, 3].map(item => (
            <Skeleton key={item} style={styles.skeletonTile} />
          ))}
        </View>
      </View>

      <View style={[styles.skeletonBand, styles.skeletonBandAlt]}>
        <Skeleton style={styles.skeletonSectionTitle} />
        <View style={styles.skeletonRow}>
          {[0, 1, 2, 3].map(item => (
            <Skeleton key={item} style={styles.skeletonChip} />
          ))}
        </View>
      </View>

      <View style={styles.skeletonBand}>
        <Skeleton style={styles.skeletonSectionTitle} />
        <View style={styles.skeletonDoctorRow}>
          <Skeleton style={styles.skeletonDoctorCard} />
          <Skeleton style={styles.skeletonDoctorCard} />
        </View>
      </View>

      <View style={[styles.skeletonBand, styles.skeletonBandAlt]}>
        <Skeleton style={styles.skeletonSectionTitle} />
        <View style={styles.skeletonServiceRow}>
          {[0, 1, 2, 3].map(item => (
            <Skeleton key={item} style={styles.skeletonServiceCard} />
          ))}
        </View>
      </View>
    </View>
  );
}
