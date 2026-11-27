import type {ReactNode} from 'react';
import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {SharedValue} from 'react-native-reanimated';

import type {SectionConfig} from '../config/types';
import {useI18n} from '../i18n/useI18n';
import {
  AppText,
  Reveal,
  SectionSurface,
  type SectionTone,
} from '../ui/components';
import {useSectionStyles} from '../ui/styles';
import {CategoryChips} from './CategoryChips';
import {DoctorCarousel} from './DoctorCarousel';
import {HeroBanner} from './HeroBanner';
import {OfferStrip} from './OfferStrip';
import {QuickActions} from './QuickActions';
import {ServiceGrid} from './ServiceGrid';
import {
  parseCategories,
  parseDoctors,
  parseQuickActions,
  parseServices,
} from './parse';
import type {DoctorItem, QuickActionItem, ServiceItem} from './types';

export type SectionEvents = {
  onBookDoctor: (doctor: DoctorItem) => void;
  onBookService: (service: ServiceItem) => void;
  onQuickAction: (item: QuickActionItem) => void;
  onBrowse: () => void;
};

type SectionRendererProps = {
  section: SectionConfig;
  scrollY: SharedValue<number>;
  events: SectionEvents;
};

type BandHeadingProps = {
  title: string;
  tone: SectionTone;
  actionLabel?: string;
  onAction?: () => void;
};

function BandHeading({title, tone, actionLabel, onAction}: BandHeadingProps) {
  const styles = useSectionStyles();

  return (
    <View style={styles.bandHeader}>
      <AppText
        accessibilityRole="header"
        variant="h2"
        style={[styles.bandTitle, {color: tone.text}]}>
        {title}
      </AppText>
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onAction}
          style={styles.bandAction}>
          <AppText
            variant="label"
            style={[styles.bandActionText, {color: tone.text}]}>
            {actionLabel}
          </AppText>
          <Ionicons name="chevron-forward" size={14} color={tone.text} />
        </Pressable>
      ) : null}
    </View>
  );
}

type BandProps = {
  section: SectionConfig;
  scrollY: SharedValue<number>;
  children: (tone: SectionTone) => ReactNode;
  heading?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  styleVariant?: 'default' | 'offer';
};

function Band({
  section,
  scrollY,
  children,
  heading = true,
  actionLabel,
  onAction,
  styleVariant = 'default',
}: BandProps) {
  const styles = useSectionStyles();

  return (
    <Reveal scrollY={scrollY}>
      <SectionSurface
        background={section.background}
        style={styles.band}
        contentStyle={
          styleVariant === 'offer' ? styles.offerContent : styles.bandContent
        }>
        {tone => (
          <View>
            {heading && section.title ? (
              <BandHeading
                title={section.title}
                tone={tone}
                actionLabel={actionLabel}
                onAction={onAction}
              />
            ) : null}
            {children(tone)}
          </View>
        )}
      </SectionSurface>
    </Reveal>
  );
}

/**
 * Unknown types are intentionally dropped. A future config can ship a
 * `festival_countdown` section before this build knows how to draw it and the
 * rest of the home screen still works.
 */
export function SectionRenderer({
  section,
  scrollY,
  events,
}: SectionRendererProps) {
  const styles = useSectionStyles();
  const {t} = useI18n();

  switch (section.type) {
    case 'hero_banner':
      return (
        <Reveal scrollY={scrollY}>
          <HeroBanner section={section} scrollY={scrollY} onBook={events.onBrowse} />
        </Reveal>
      );

    case 'category_chips': {
      const items = parseCategories(section);
      return (
        <Band section={section} scrollY={scrollY}>
          {tone =>
            items.length > 0 ? (
              <CategoryChips section={section} />
            ) : (
              <AppText
                variant="caption"
                style={[styles.bandEmptyText, {color: tone.muted}]}>
                {t('home.emptyChips')}
              </AppText>
            )
          }
        </Band>
      );
    }

    case 'quick_actions': {
      const items = parseQuickActions(section);
      return (
        <Band section={section} scrollY={scrollY}>
          {tone =>
            items.length > 0 ? (
              <QuickActions section={section} onAction={events.onQuickAction} />
            ) : (
              <AppText
                variant="caption"
                style={[styles.bandEmptyText, {color: tone.muted}]}>
                {t('home.emptyActions')}
              </AppText>
            )
          }
        </Band>
      );
    }

    case 'doctor_carousel': {
      const items = parseDoctors(section);
      return (
        <Band
          section={section}
          scrollY={scrollY}
          actionLabel={items.length > 0 ? t('home.seeAll') : undefined}
          onAction={events.onBrowse}>
          {tone =>
            items.length > 0 ? (
              <DoctorCarousel section={section} onBook={events.onBookDoctor} />
            ) : (
              <AppText
                variant="caption"
                style={[styles.bandEmptyText, {color: tone.muted}]}>
                {t('home.emptyDoctors')}
              </AppText>
            )
          }
        </Band>
      );
    }

    case 'service_grid': {
      const items = parseServices(section);
      return (
        <Band
          section={section}
          scrollY={scrollY}
          actionLabel={items.length > 0 ? t('home.seeAll') : undefined}
          onAction={events.onBrowse}>
          {tone =>
            items.length > 0 ? (
              <ServiceGrid section={section} onBook={events.onBookService} />
            ) : (
              <AppText
                variant="caption"
                style={[styles.bandEmptyText, {color: tone.muted}]}>
                {t('home.emptyServices')}
              </AppText>
            )
          }
        </Band>
      );
    }

    case 'offer_strip': {
      return (
        <Band
          section={section}
          scrollY={scrollY}
          heading={false}
          styleVariant="offer">
          {tone => <OfferStrip section={section} tone={tone} />}
        </Band>
      );
    }

    default:
      return null;
  }
}
