import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp, NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootTabParamList = {
  home: undefined;
  bookings: undefined;
  prescriptions: undefined;
  profile: undefined;
};

export type BookingParams = {
  doctorId?: string;
  doctorName?: string;
  specialty?: string;
  photoUrl?: string;
  feeInr?: number;
  serviceId?: string;
  serviceName?: string;
  servicePriceInr?: number;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList> | undefined;
  Booking: BookingParams | undefined;
  PrescriptionDetail: {prescriptionId: string};
};

export type TabNavigation<RouteName extends keyof RootTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, RouteName>,
    NativeStackNavigationProp<RootStackParamList>
  >;

export type StackNavigation<RouteName extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, RouteName>;
