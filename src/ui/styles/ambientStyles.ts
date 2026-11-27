import {StyleSheet} from 'react-native';

import type {Theme} from '../../theme/types';

export function createAmbientStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFill,
      overflow: 'hidden',
    },
    gradient: {
      ...StyleSheet.absoluteFill,
    },
    orb: {
      position: 'absolute',
      overflow: 'hidden',
    },
    orbOne: {
      width: 360,
      height: 360,
      borderRadius: 180,
      top: -150,
      right: -120,
    },
    orbTwo: {
      width: 320,
      height: 320,
      borderRadius: 160,
      bottom: 40,
      left: -160,
    },
    orbThree: {
      width: 240,
      height: 240,
      borderRadius: 120,
      top: '38%',
      right: -90,
    },
    orbFill: {
      flex: 1,
    },
    softLine: {
      position: 'absolute',
      top: '24%',
      left: -60,
      right: -60,
      height: 1,
      backgroundColor: theme.ambient.line,
      transform: [{rotate: '-16deg'}],
    },
    bottomGlow: {
      position: 'absolute',
      left: -80,
      right: -80,
      bottom: -180,
      height: 360,
      borderRadius: 180,
      backgroundColor: theme.ambient.orbSecondary,
      opacity: 0.45,
    },
  });
}

export type AmbientStyles = ReturnType<typeof createAmbientStyles>;
