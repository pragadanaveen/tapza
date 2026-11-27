import type {ComponentProps} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<string, {active: IoniconName; inactive: IoniconName}> = {
  home: {active: 'home', inactive: 'home-outline'},
  calendar: {active: 'calendar', inactive: 'calendar-outline'},
  medkit: {active: 'medkit', inactive: 'medkit-outline'},
  person: {active: 'person', inactive: 'person-outline'},
  document: {active: 'document-text', inactive: 'document-text-outline'},
  alarm: {active: 'alarm', inactive: 'alarm-outline'},
  people: {active: 'people', inactive: 'people-outline'},
  medical: {active: 'medical', inactive: 'medical-outline'},
  stethoscope: {active: 'medical', inactive: 'medical-outline'},
  flask: {active: 'flask', inactive: 'flask-outline'},
  'shield-checkmark': {
    active: 'shield-checkmark',
    inactive: 'shield-checkmark-outline',
  },
  heart: {active: 'heart', inactive: 'heart-outline'},
  time: {active: 'time', inactive: 'time-outline'},
  location: {active: 'location', inactive: 'location-outline'},
  star: {active: 'star', inactive: 'star-outline'},
  checkmark: {active: 'checkmark-circle', inactive: 'checkmark-circle-outline'},
  alert: {active: 'alert-circle', inactive: 'alert-circle-outline'},
  close: {active: 'close', inactive: 'close'},
  refresh: {active: 'refresh', inactive: 'refresh'},
  search: {active: 'search', inactive: 'search'},
  notifications: {active: 'notifications', inactive: 'notifications-outline'},
  language: {active: 'language', inactive: 'language'},
  sparkles: {active: 'sparkles', inactive: 'sparkles-outline'},
  chevron: {active: 'chevron-forward', inactive: 'chevron-forward'},
  arrow: {active: 'arrow-forward', inactive: 'arrow-forward'},
};

export function iconName(name: string, active = false): IoniconName {
  const icon = ICONS[name];
  if (!icon) {
    return 'ellipse-outline';
  }
  return active ? icon.active : icon.inactive;
}

export type {IoniconName};
