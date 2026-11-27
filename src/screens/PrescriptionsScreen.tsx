import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

import type {RootTabParamList} from '../navigation/types';
import {AppText, EmptyState, Screen} from '../ui/components';
import {useScreenStyles} from '../ui/styles';

type Navigation = BottomTabNavigationProp<RootTabParamList>;

export function PrescriptionsScreen() {
  const navigation = useNavigation<Navigation>();
  const styles = useScreenStyles();

  return (
    <Screen>
      <View style={styles.placeholderHeader}>
        <AppText variant="h1" style={styles.placeholderTitle}>
          Prescriptions
        </AppText>
        <AppText variant="body" style={styles.placeholderBody}>
          Your medicines, doses and today’s schedule will appear here.
        </AppText>
      </View>
      <EmptyState
        icon="medkit"
        title="No prescriptions yet"
        message="After a visit, the doctor’s prescription will show up here with a morning, afternoon and night schedule."
        actionLabel="Book a visit"
        onAction={() => navigation.navigate('home')}
      />
    </Screen>
  );
}
