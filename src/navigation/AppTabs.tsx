import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import {BookingsScreen} from '../screens/BookingsScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {PrescriptionsScreen} from '../screens/PrescriptionsScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {ConfigTabBar} from './ConfigTabBar';
import type {RootTabParamList} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => (
  <ConfigTabBar {...props} />
);

export function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        animation: 'fade',
      }}
      tabBar={renderTabBar}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="bookings" component={BookingsScreen} />
      <Tab.Screen name="prescriptions" component={PrescriptionsScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
