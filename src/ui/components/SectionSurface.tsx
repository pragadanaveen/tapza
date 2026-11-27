import type {ReactNode} from 'react';
import {
  ImageBackground,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {SectionBackground} from '../../config/types';
import {alpha, contrastRatio, readableOn} from '../../theme/color';
import {useTheme} from '../../theme/ThemeProvider';
import type {Theme} from '../../theme/types';
import {useSectionStyles} from '../styles';

export type SectionTone = {
  text: string;
  muted: string;
  chip: string;
  border: string;
  scrim: string;
};

function textForGradient(stops: string[], theme: Theme): string {
  const candidates = ['#FFFFFF', theme.colors.textPrimary];

  return candidates.reduce((best, candidate) => {
    const candidateWorst = Math.min(
      ...stops.map(stop => contrastRatio(candidate, stop)),
    );
    const bestWorst = Math.min(
      ...stops.map(stop => contrastRatio(best, stop)),
    );
    return candidateWorst > bestWorst ? candidate : best;
  });
}

export function sectionTone(
  background: SectionBackground,
  theme: Theme,
): SectionTone {
  if (background.kind === 'image') {
    return {
      text: '#FFFFFF',
      muted: 'rgba(255, 255, 255, 0.8)',
      chip: 'rgba(255, 255, 255, 0.14)',
      border: 'rgba(255, 255, 255, 0.24)',
      scrim: theme.colors.scrim,
    };
  }

  const stops =
    background.kind === 'gradient'
      ? background.value
          .split(',')
          .map(stop => stop.trim())
          .filter(Boolean)
      : [background.value];
  const safeStops =
    background.kind === 'gradient' && stops.length < 2
      ? [theme.colors.background, theme.colors.surface]
      : stops;

  const text =
    background.kind === 'gradient'
      ? textForGradient(safeStops, theme)
      : readableOn(background.value, '#FFFFFF', theme.colors.textPrimary);

  return {
    text,
    muted: alpha(text, 0.78),
    chip: alpha(text, 0.12),
    border: alpha(text, 0.24),
    scrim: 'transparent',
  };
}

type SectionSurfaceProps = {
  background: SectionBackground;
  children: (tone: SectionTone) => ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function SectionSurface({
  background,
  children,
  style,
  contentStyle,
}: SectionSurfaceProps) {
  const theme = useTheme();
  const styles = useSectionStyles();
  const tone = sectionTone(background, theme);

  if (background.kind === 'image') {
    return (
      <ImageBackground
        source={{uri: background.value}}
        resizeMode="cover"
        style={[styles.surface, style]}
        imageStyle={styles.image}>
        <View style={[styles.scrim, {backgroundColor: tone.scrim}]} />
        <View style={[styles.content, contentStyle]}>{children(tone)}</View>
      </ImageBackground>
    );
  }

  if (background.kind === 'gradient') {
    const stops = background.value
      .split(',')
      .map(stop => stop.trim())
      .filter(Boolean);

    return (
      <LinearGradient
        colors={stops.length > 1 ? stops : [theme.colors.surface, theme.colors.background]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.surface, style]}>
        <View style={[styles.content, contentStyle]}>{children(tone)}</View>
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.surface,
        {backgroundColor: background.value},
        style,
      ]}>
      <View style={[styles.content, contentStyle]}>{children(tone)}</View>
    </View>
  );
}
