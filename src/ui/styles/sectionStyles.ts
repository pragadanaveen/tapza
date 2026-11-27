import {StyleSheet} from 'react-native';

import type {Theme} from '../../theme/types';

export function createSectionStyles(theme: Theme) {
  const {spacing, radii} = theme;

  return StyleSheet.create({
    surface: {
      borderRadius: radii.xl,
      overflow: 'hidden',
    },
    image: {
      borderRadius: radii.xl,
    },
    content: {
      padding: spacing.lg,
    },
    scrim: {
      ...StyleSheet.absoluteFill,
    },
  });
}

export type SectionStyles = ReturnType<typeof createSectionStyles>;
