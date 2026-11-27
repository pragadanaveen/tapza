import {useEffect} from 'react';
import {type StyleProp, type ViewStyle} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {useCommonStyles} from '../styles';

type SkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * A quiet opacity pulse instead of a moving gradient. It keeps the loader
 * cheap on low-end GPUs and still communicates "content is on the way".
 */
export function Skeleton({style}: SkeletonProps) {
  const styles = useCommonStyles();
  const opacity = useSharedValue(0.55);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {duration: 850}),
      -1,
      true,
    );
    return () => cancelAnimation(opacity);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}));

  return (
    <Animated.View style={[styles.skeleton, style, animatedStyle]} />
  );
}
