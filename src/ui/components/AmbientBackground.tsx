import {useEffect} from 'react';
import {View, type StyleProp, type ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import {useTheme} from '../../theme/ThemeProvider';
import {useAmbientStyles} from '../styles';

function Orb({
  color,
  style,
  drift,
}: {
  color: string;
  style: StyleProp<ViewStyle>;
  drift: SharedValue<number>;
}) {
  const styles = useAmbientStyles();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: drift.value * 16},
      {translateY: drift.value * -12},
      {rotate: `${drift.value * 3}deg`},
    ],
  }));

  return (
    <Animated.View style={[styles.orb, style, animatedStyle]}>
      <LinearGradient
        colors={[color, 'transparent']}
        start={{x: 0.15, y: 0.1}}
        end={{x: 0.9, y: 0.9}}
        style={styles.orbFill}
      />
    </Animated.View>
  );
}

/**
 * The quiet colour field behind the glass. Without it, native blur has very
 * little to work with and the UI reads as flat translucent cards.
 */
export function AmbientBackground() {
  const theme = useTheme();
  const styles = useAmbientStyles();
  const reducedMotion = useReducedMotion();
  const drift = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) {
      drift.value = 0;
      return;
    }

    drift.value = withRepeat(
      withTiming(1, {
        duration: 16000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );

    return () => cancelAnimation(drift);
  }, [drift, reducedMotion]);

  return (
    <View pointerEvents="none" style={styles.container}>
      <LinearGradient
        colors={theme.ambient.gradient}
        locations={[0, 0.58, 1]}
        start={{x: 0.1, y: 0}}
        end={{x: 0.9, y: 1}}
        style={styles.gradient}
      />
      <Orb color={theme.ambient.orbPrimary} style={styles.orbOne} drift={drift} />
      <Orb
        color={theme.ambient.orbSecondary}
        style={styles.orbTwo}
        drift={drift}
      />
      <Orb
        color={theme.ambient.orbAccent}
        style={styles.orbThree}
        drift={drift}
      />
      <View style={styles.softLine} />
      <View style={styles.bottomGlow} />
    </View>
  );
}
