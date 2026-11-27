import type {ComponentType} from 'react';

import type {ScreenName, TabConfig} from '../config/types';
import {BookingsScreen} from '../screens/BookingsScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {PrescriptionsScreen} from '../screens/PrescriptionsScreen';
import {ProfileScreen} from '../screens/ProfileScreen';

export const SCREEN_REGISTRY: Record<ScreenName, ComponentType> = {
  home: HomeScreen,
  bookings: BookingsScreen,
  prescriptions: PrescriptionsScreen,
  profile: ProfileScreen,
};

export const FALLBACK_TABS: readonly TabConfig[] = [
  {id: 'home', label: 'Home', icon: 'home', screen: 'home'},
  {id: 'bookings', label: 'Bookings', icon: 'calendar', screen: 'bookings'},
  {id: 'meds', label: 'Meds', icon: 'medkit', screen: 'prescriptions'},
  {id: 'profile', label: 'Profile', icon: 'person', screen: 'profile'},
];

export function isScreenName(value: string): value is ScreenName {
  return value in SCREEN_REGISTRY;
}
