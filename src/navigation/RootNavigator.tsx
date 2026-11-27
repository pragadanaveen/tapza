import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BookingScreen} from '../screens/BookingScreen';
import {PrescriptionDetailScreen} from '../screens/PrescriptionDetailScreen';
import {useTheme} from '../theme/ThemeProvider';
import {AppTabs} from './AppTabs';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.colors.background},
      }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="PrescriptionDetail"
        component={PrescriptionDetailScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
