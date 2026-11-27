import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import {useTheme} from '../theme/ThemeProvider';
import {AppText, Button, GlassSurface} from '../ui/components';
import {useSectionStyles} from '../ui/styles';
import type {SectionConfig, SectionBackground} from '../config/types';
import {parseHero} from './parse';

type HeroBannerProps = {
  section: SectionConfig;
  scrollY: SharedValue<number>;
  onBook: () => void;
};

function gradientStops(
  background: SectionBackground,
  fallback: string[],
): string[] {
  if (background.kind !== 'gradient') {
    return fallback;
  }
  const stops = background.value
    .split(',')
    .map(stop => stop.trim())
    .filter(Boolean);
  if (stops.length === 0) {
    return fallback;
  }
  return stops.length === 1 ? [stops[0]!, stops[0]!] : stops;
}

export function HeroBanner({section, scrollY, onBook}: HeroBannerProps) {
  const theme = useTheme();
  const styles = useSectionStyles();
  const item = parseHero(section);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [-220, 0, 560],
          [-46, 0, 104],
          Extrapolation.CLAMP,
        ),
      },
      {scale: 1.14},
    ],
  }));

  if (!item) {
    return null;
  }

  const background = section.background;
  const stops = gradientStops(background, [
    theme.colors.primaryFill,
    theme.colors.secondary,
  ]);
  const imageUrl =
    item.imageUrl ??
    (background.kind === 'image' ? background.value : undefined);
  const festival = theme.festival;

  return (
    <View style={styles.hero}>
      {background.kind === 'gradient' ? (
        <LinearGradient
          colors={stops as [string, string, ...string[]]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.heroImageLayer}
        />
      ) : (
        <View
          style={[
            styles.heroImageLayer,
            {
              backgroundColor:
                background.kind === 'color'
                  ? background.value
                  : theme.colors.primaryFill,
            },
          ]}
        />
      )}

      {imageUrl ? (
        <Animated.Image
          accessible={false}
          source={{uri: imageUrl}}
          style={[
            styles.heroImage,
            imageStyle,
            background.kind === 'image'
              ? styles.heroImageFull
              : styles.heroImageDim,
          ]}
        />
      ) : null}

      {/* A photo hero needs a deeper, warmer sink than a flat scrim so the
          glass card stays legible over a busy festival image. */}
      <LinearGradient
        colors={
          (festival
            ? [
                'rgba(21, 10, 15, 0)',
                'rgba(21, 10, 15, 0.36)',
                'rgba(21, 10, 15, 0.74)',
              ]
            : ['transparent', theme.glass.scrim]) as [string, string, ...string[]]
        }
        start={{x: 0.1, y: 0}}
        end={{x: 0.9, y: 1}}
        style={styles.heroTint}
      />
      <View style={styles.heroGlowLarge} />
      <View style={styles.heroGlowSmall} />

      <View style={styles.heroContentWrap}>
        <GlassSurface
          intensity="soft"
          // The festival hero sits on a vivid sunset photograph, so its card
          // needs a firmer tint than the everyday 32% wash — otherwise the
          // copy reads as though it is floating on the sky rather than
          // resting on a card. Everyday keeps its original glassiness.
          tint={
            festival
              ? theme.isDark
                ? 'rgba(37, 18, 26, 0.84)'
                : 'rgba(255, 252, 247, 0.86)'
              : undefined
          }
          elevated={false}
          radius={theme.radii.xxl}
          contentStyle={styles.heroContent}>
          <View style={styles.heroTopRow}>
            {festival ? (
              <View style={styles.heroFestivalPill}>
                <Ionicons
                  name="sparkles"
                  size={12}
                  color={theme.colors.accentText}
                />
                <AppText
                  variant="caption"
                  style={styles.heroFestivalText}>
                  {festival.greeting}
                </AppText>
              </View>
            ) : null}
            {item.eyebrow ? (
              <AppText variant="caption" style={styles.heroEyebrow}>
                {item.eyebrow}
              </AppText>
            ) : null}
          </View>

          <AppText
            accessibilityRole="header"
            variant="display"
            style={styles.heroTitle}>
            {item.title}
          </AppText>

          {item.subtitle ? (
            <AppText variant="body" style={styles.heroSubtitle}>
              {item.subtitle}
            </AppText>
          ) : null}

          {item.highlights.length > 0 ? (
            <View style={styles.heroHighlights}>
              {item.highlights.map(highlight => (
                <View key={highlight} style={styles.heroHighlight}>
                  <AppText
                    variant="caption"
                    style={styles.heroHighlightText}>
                    {highlight}
                  </AppText>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.heroCtaRow}>
            <Button
              label={item.ctaLabel ?? 'Book a visit'}
              icon="calendar"
              size="lg"
              variant="primary"
              onPress={onBook}
            />
            <AppText variant="caption" style={styles.heroCtaMeta}>
              No payment now
            </AppText>
          </View>
        </GlassSurface>
      </View>
    </View>
  );
}
