import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

import type {RootTabParamList} from '../navigation/types';
import {AppText, EmptyState, Screen} from '../ui/components';
import {useScreenStyles} from '../ui/styles';

type Navigation = BottomTabNavigationProp<RootTabParamList>;

export function BookingsScreen() {
  const navigation = useNavigation<Navigation>();
  const styles = useScreenStyles();

  return (
    <Screen>
      <View style={styles.placeholderHeader}>
        <AppText variant="h1" style={styles.placeholderTitle}>
          Bookings
        </AppText>
        <AppText variant="body" style={styles.placeholderBody}>
          Your confirmed visits and clinic appointments will live here.
        </AppText>
      </View>
      <EmptyState
        icon="calendar"
        title="No bookings yet"
        message="When you book a doctor or a clinic service, the visit will appear here with its date and time."
        actionLabel="Find care"
        onAction={() => navigation.navigate('home')}
      />
    </Screen>
  );
}
