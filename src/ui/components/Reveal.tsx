import type {ReactNode} from 'react';
import {
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

type RevealProps = {
  children: ReactNode;
  scrollY: SharedValue<number>;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Fades and lifts a block in the first time it enters the viewport.
 * Everything runs on the UI thread, so scrolling stays smooth on mid-range
 * Android phones even if JS is busy fetching the next screen.
 */
export function Reveal({children, scrollY, delay = 0, style}: RevealProps) {
  const {height: screenHeight} = useWindowDimensions();
  const y = useSharedValue(0);
  const shown = useSharedValue(0);

  useAnimatedReaction(
    () => scrollY.value + screenHeight > y.value + 70,
    (inView, previouslyInView) => {
      if (inView && !previouslyInView) {
        shown.value = withDelay(
          delay,
          withTiming(1, {
            duration: 460,
            easing: Easing.out(Easing.cubic),
          }),
        );
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: shown.value,
    transform: [{translateY: (1 - shown.value) * 26}],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    y.value = event.nativeEvent.layout.y;
  };

  return (
    <Animated.View onLayout={onLayout} style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
