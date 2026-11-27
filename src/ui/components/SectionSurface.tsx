import type {ReactNode} from 'react';
import {
  ImageBackground,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {SectionBackground} from '../../config/types';
import {alpha, contrastRatio} from '../../theme/color';
import {useTheme} from '../../theme/ThemeProvider';
import type {Theme} from '../../theme/types';
import {useSectionStyles} from '../styles';
import {GlassSurface} from './GlassSurface';

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
      muted: 'rgba(255, 255, 255, 0.82)',
      chip: 'rgba(255, 255, 255, 0.14)',
      border: 'rgba(255, 255, 255, 0.24)',
      scrim: theme.colors.scrim,
    };
  }

  if (background.kind === 'color') {
    return {
      text: theme.colors.textPrimary,
      muted: theme.colors.textSecondary,
      chip: alpha(theme.colors.textPrimary, theme.isDark ? 0.08 : 0.05),
      border: theme.glass.border,
      scrim: 'transparent',
    };
  }

  const stops = background.value
    .split(',')
    .map(stop => stop.trim())
    .filter(Boolean);
  const safeStops =
    stops.length < 2
      ? [theme.colors.background, theme.colors.surface]
      : stops;

  const text = textForGradient(safeStops, theme);

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
      <GlassSurface
        radius={theme.radii.xxl}
        style={style}
        contentStyle={contentStyle}>
        <LinearGradient
          colors={stops.length > 1 ? stops : [theme.colors.primaryFill, theme.colors.secondary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientWash}
        />
        <View style={styles.contentInner}>{children(tone)}</View>
      </GlassSurface>
    );
  }

  return (
    <GlassSurface
      radius={theme.radii.xxl}
      tint={alpha(background.value, theme.isDark ? 0.14 : 0.24)}
      style={style}
      contentStyle={contentStyle}>
      {children(tone)}
    </GlassSurface>
  );
}
