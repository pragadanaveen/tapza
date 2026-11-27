import type {ReactNode} from 'react';
import {View, type StyleProp, type ViewStyle} from 'react-native';
import {BlurView} from '@sbaiahmed1/react-native-blur';

import {useTheme} from '../../theme/ThemeProvider';
import {useGlassEnabled, type GlassKind} from '../../theme/useGlass';
import {useGlassStyles} from '../styles';

type GlassIntensity = 'soft' | 'regular' | 'strong';

type GlassSurfaceProps = {
  children: ReactNode;
  kind?: GlassKind;
  intensity?: GlassIntensity;
  tint?: string;
  radius?: number;
  elevated?: boolean;
  blurAmount?: number;
  borderColor?: string;
  fallbackColor?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export function GlassSurface({
  children,
  kind = 'panel',
  intensity = 'regular',
  tint,
  radius,
  elevated = true,
  blurAmount,
  borderColor,
  fallbackColor,
  style,
  contentStyle,
  testID,
}: GlassSurfaceProps) {
  const theme = useTheme();
  const styles = useGlassStyles();
  const blur = useGlassEnabled(kind);
  const corner = radius ?? theme.radii.xxl;
  const tintColor =
    tint ??
    (intensity === 'soft'
      ? theme.glass.tintSoft
      : intensity === 'strong'
        ? theme.glass.tintStrong
        : theme.glass.tint);

  return (
    <View
      testID={testID}
      style={[styles.wrapper, elevated && styles.shadow, style]}>
      <View
        style={[
          styles.clip,
          {borderRadius: corner, borderColor: borderColor ?? theme.glass.border},
          blur ? styles.clipBlurred : styles.clipFallback,
          !blur && fallbackColor ? {backgroundColor: fallbackColor} : null,
        ]}>
        {blur ? (
          <BlurView
            pointerEvents="none"
            blurType={theme.glass.blurType}
            blurAmount={blurAmount ?? theme.glass.blurAmount}
            reducedTransparencyFallbackColor={theme.glass.fallback}
            style={[styles.blur, {borderRadius: corner}]}
          />
        ) : null}
        <View
          pointerEvents="none"
          style={[styles.tint, {backgroundColor: tintColor}]}
        />
        <View pointerEvents="none" style={styles.highlight} />
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    </View>
  );
}
