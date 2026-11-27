import {useMemo} from 'react';

import {useTheme} from '../../theme/ThemeProvider';
import {
  createCommonStyles,
  type CommonStyles,
} from './commonStyles';
import {createAmbientStyles, type AmbientStyles} from './ambientStyles';
import {createGlassStyles, type GlassStyles} from './glassStyles';
import {
  createNavigationStyles,
  type NavigationStyles,
} from './navigationStyles';
import {createHomeStyles, type HomeStyles} from './homeStyles';
import {
  createBookingStyles,
  type BookingStyles,
} from './bookingStyles';
import {
  createBookingsStyles,
  type BookingsStyles,
} from './bookingsStyles';
import {
  createPrescriptionStyles,
  type PrescriptionStyles,
} from './prescriptionStyles';
import {
  createProfileStyles,
  type ProfileStyles,
} from './profileStyles';
import {
  createScreenStyles,
  type ScreenStyles,
} from './screenStyles';
import {
  createSectionStyles,
  type SectionStyles,
} from './sectionStyles';

export type AppStyles = {
  common: CommonStyles;
  ambient: AmbientStyles;
  glass: GlassStyles;
  navigation: NavigationStyles;
  screen: ScreenStyles;
  section: SectionStyles;
  home: HomeStyles;
  booking: BookingStyles;
  bookings: BookingsStyles;
  prescription: PrescriptionStyles;
  profile: ProfileStyles;
};

export function useCommonStyles(): CommonStyles {
  const theme = useTheme();
  return useMemo(() => createCommonStyles(theme), [theme]);
}

export function useAmbientStyles(): AmbientStyles {
  const theme = useTheme();
  return useMemo(() => createAmbientStyles(theme), [theme]);
}

export function useGlassStyles(): GlassStyles {
  const theme = useTheme();
  return useMemo(() => createGlassStyles(theme), [theme]);
}

export function useNavigationStyles(): NavigationStyles {
  const theme = useTheme();
  return useMemo(() => createNavigationStyles(theme), [theme]);
}

export function useScreenStyles(): ScreenStyles {
  const theme = useTheme();
  return useMemo(() => createScreenStyles(theme), [theme]);
}

export function useSectionStyles(): SectionStyles {
  const theme = useTheme();
  return useMemo(() => createSectionStyles(theme), [theme]);
}

export function useHomeStyles(): HomeStyles {
  const theme = useTheme();
  return useMemo(() => createHomeStyles(theme), [theme]);
}

export function useBookingStyles(): BookingStyles {
  const theme = useTheme();
  return useMemo(() => createBookingStyles(theme), [theme]);
}

export function useBookingsStyles(): BookingsStyles {
  const theme = useTheme();
  return useMemo(() => createBookingsStyles(theme), [theme]);
}

export function usePrescriptionStyles(): PrescriptionStyles {
  const theme = useTheme();
  return useMemo(() => createPrescriptionStyles(theme), [theme]);
}

export function useProfileStyles(): ProfileStyles {
  const theme = useTheme();
  return useMemo(() => createProfileStyles(theme), [theme]);
}

/**
 * Optional aggregate hook for screens that genuinely need more than one
 * registry. It still creates each StyleSheet only once per theme.
 */
export function useAppStyles(): AppStyles {
  const common = useCommonStyles();
  const ambient = useAmbientStyles();
  const glass = useGlassStyles();
  const navigation = useNavigationStyles();
  const screen = useScreenStyles();
  const section = useSectionStyles();
  const home = useHomeStyles();
  const booking = useBookingStyles();
  const bookings = useBookingsStyles();
  const prescription = usePrescriptionStyles();
  const profile = useProfileStyles();

  return useMemo(
    () => ({
      common,
      ambient,
      glass,
      navigation,
      screen,
      section,
      home,
      booking,
      bookings,
      prescription,
      profile,
    }),
    [
      common,
      ambient,
      glass,
      navigation,
      screen,
      section,
      home,
      booking,
      bookings,
      prescription,
      profile,
    ],
  );
}

export type {
  CommonStyles,
  AmbientStyles,
  GlassStyles,
  NavigationStyles,
  ScreenStyles,
  SectionStyles,
  HomeStyles,
  BookingStyles,
  BookingsStyles,
  PrescriptionStyles,
  ProfileStyles,
};
