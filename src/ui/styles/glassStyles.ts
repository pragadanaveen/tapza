import {StyleSheet} from 'react-native';

import type {Theme} from '../../theme/types';

export function createGlassStyles(theme: Theme) {
  const {glass} = theme;

  return StyleSheet.create({
    wrapper: {
      position: 'relative',
    },
    shadow: {
      shadowColor: glass.shadow,
      shadowOffset: {width: 0, height: 12},
      shadowOpacity: 1,
      shadowRadius: 26,
      elevation: 10,
    },
    flat: {
      shadowOpacity: 0,
      elevation: 0,
    },
    clip: {
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: glass.border,
      backgroundColor: glass.fallback,
    },
    clipBlurred: {
      backgroundColor: 'transparent',
    },
    clipFallback: {
      backgroundColor: glass.fallback,
    },
    blur: {
      ...StyleSheet.absoluteFill,
    },
    tint: {
      ...StyleSheet.absoluteFill,
    },
    highlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: glass.highlight,
    },
    content: {
      position: 'relative',
    },
    edge: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: StyleSheet.hairlineWidth,
      backgroundColor: glass.border,
    },
  });
}

export type GlassStyles = ReturnType<typeof createGlassStyles>;
