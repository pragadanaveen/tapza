import {Image, View} from 'react-native';

import {VARIANTS} from '../config';
import type {
  ConfigVariant,
  LayoutConfig,
  SectionConfig,
} from '../config/types';
import {useConfigStore} from '../store/configStore';
import {contrastRatio, readableOn} from '../theme/color';
import {useTheme} from '../theme/ThemeProvider';
import {
  AppText,
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Divider,
  Price,
  Screen,
  SectionHeader,
  SectionSurface,
  SegmentedControl,
} from '../ui/components';
import {useScreenStyles} from '../ui/styles';

type HeroItem = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
};

type ChipItem = {
  id: string;
  label: string;
  icon?: string;
};

type DoctorItem = {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  feeInr: number;
  languages: string[];
  nextSlot: string;
};

type ServiceItem = {
  id: string;
  name: string;
  priceInr: number;
  imageUrl: string;
  badge?: string;
};

type OfferItem = {
  id: string;
  message: string;
};

function sectionOf(
  config: LayoutConfig,
  type: string,
): SectionConfig | undefined {
  return config.sections.find(section => section.type === type);
}

function itemsOf<T>(config: LayoutConfig, type: string): T[] {
  return (sectionOf(config, type)?.items ?? []) as T[];
}

const TYPE_SAMPLES = [
  {label: 'Display', variant: 'display', text: 'Care, close to home'},
  {label: 'H1', variant: 'h1', text: 'Your health, in one place'},
  {label: 'H2', variant: 'h2', text: 'Doctors available today'},
  {label: 'Body', variant: 'body', text: 'Book a visit in under a minute.'},
  {label: 'Label', variant: 'label', text: 'Book a visit'},
  {label: 'Caption', variant: 'caption', text: 'Jubilee Hills, Hyderabad'},
] as const;

export function HomeScreen() {
  const config = useConfigStore(store => store.config);
  const variant = useConfigStore(store => store.variant);
  const setVariant = useConfigStore(store => store.setVariant);
  const theme = useTheme();
  const styles = useScreenStyles();

  const hero = sectionOf(config, 'hero_banner');
  const offer = sectionOf(config, 'offer_strip');
  const categories = sectionOf(config, 'category_chips');
  const heroItem = (hero?.items[0] as HeroItem | undefined) ?? undefined;
  const offerItem = (offer?.items[0] as OfferItem | undefined) ?? undefined;
  const chips = itemsOf<ChipItem>(config, 'category_chips');
  const doctors = itemsOf<DoctorItem>(config, 'doctor_carousel');
  const services = itemsOf<ServiceItem>(config, 'service_grid');
  const doctor = doctors[0];
  const service = services[0];

  const palette = [
    {name: 'Primary', value: theme.colors.primary},
    {name: 'Secondary', value: theme.colors.secondary},
    {name: 'Accent', value: theme.colors.accent},
    {name: 'Background', value: theme.colors.background},
    {name: 'Surface', value: theme.colors.surface},
    {name: 'Text primary', value: theme.colors.textPrimary},
    {name: 'Text secondary', value: theme.colors.textSecondary},
    {name: 'On primary', value: theme.colors.onPrimary},
    {name: 'On accent', value: theme.colors.onAccent},
  ];

  const contrastChecks = [
    {
      label: 'Body',
      value: contrastRatio(theme.colors.textPrimary, theme.colors.background),
    },
    {
      label: 'Secondary',
      value: contrastRatio(theme.colors.textSecondary, theme.colors.surface),
    },
    {
      label: 'On primary',
      value: contrastRatio(theme.colors.onPrimary, theme.colors.primary),
    },
    {
      label: 'On accent',
      value: contrastRatio(theme.colors.onAccent, theme.colors.accent),
    },
  ];

  const variantOptions = Object.values(VARIANTS).map(item => ({
    id: item.id,
    label: item.shortLabel,
  }));

  return (
    <Screen>
      <View style={styles.labHeader}>
        <AppText variant="caption" style={styles.labKicker}>
          Tapza Care · Design system
        </AppText>
        <AppText variant="h1" style={styles.labTitle}>
          Theme Lab
        </AppText>
        <AppText variant="body" style={styles.labIntro}>
          The remote config owns every colour. Spacing, shape and type come from
          local tokens. Switch the config to see the same components rebuild
          without touching a file.
        </AppText>
      </View>

      <View style={styles.variantRow}>
        <SegmentedControl
          options={variantOptions}
          value={variant}
          onChange={id => setVariant(id as ConfigVariant)}
        />
        <AppText variant="caption" style={styles.variantHint}>
          {VARIANTS[variant].label} · v{config.version} · {config.tabs.length} tabs ·{' '}
          {config.sections.length} sections
        </AppText>
      </View>

      <View style={styles.labSection}>
        <SectionHeader title="Palette" />
        <View style={styles.paletteGrid}>
          {palette.map(item => (
            <View key={item.name} style={styles.paletteItem}>
              <View
                style={[
                  styles.paletteSwatch,
                  {backgroundColor: item.value},
                ]}>
                <AppText
                  variant="caption"
                  style={[
                    styles.paletteName,
                    {
                      color: readableOn(
                        item.value,
                        '#FFFFFF',
                        theme.colors.textPrimary,
                      ),
                    },
                  ]}>
                  {item.name}
                </AppText>
                <AppText
                  variant="caption"
                  style={[
                    styles.paletteValue,
                    {
                      color: readableOn(
                        item.value,
                        '#FFFFFF',
                        theme.colors.textPrimary,
                      ),
                    },
                  ]}>
                  {item.value}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.contrastRow}>
          {contrastChecks.map(check => (
            <View key={check.label} style={styles.contrastPill}>
              <AppText variant="caption" style={styles.contrastText}>
                {check.label} {check.value.toFixed(2)}:1
              </AppText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.labSection}>
        <SectionHeader title="Typography" />
        {TYPE_SAMPLES.map(sample => (
          <View key={sample.label} style={styles.typeRow}>
            <AppText variant="caption" style={styles.typeLabel}>
              {sample.label}
            </AppText>
            <AppText variant={sample.variant} style={styles.typeSample}>
              {sample.text}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.labSection}>
        <SectionHeader title="Actions" />
        <View style={styles.buttonRow}>
          <Button label="Book a visit" icon="calendar" />
          <Button label="View prescriptions" variant="secondary" />
          <Button label="See all" variant="ghost" />
          <Button label="Unavailable" disabled />
        </View>
      </View>

      <View style={styles.labSection}>
        <SectionHeader title="Chips & badges" />
        <View style={styles.chipRow}>
          <Chip label="Consult" icon="medical" selected />
          <Chip label="Lab tests" icon="flask" />
          <Chip label="Pharmacy" icon="medkit" />
          <Chip label="Vaccines" icon="shield-checkmark" />
        </View>
        <View style={[styles.chipRow, styles.mtSm]}>
          <Badge label="Verified" />
          <Badge label="Popular" tone="accent" />
          <Badge label="Available" tone="success" />
          <Badge label="Few slots" tone="warning" />
          <Badge label="Closed" tone="danger" />
        </View>
      </View>

      <View style={styles.labSection}>
        <SectionHeader title="Cards" />
        {doctor ? (
          <Card>
            <View style={styles.doctorCard}>
              <Avatar uri={doctor.photoUrl} name={doctor.name} size="lg" />
              <View style={styles.doctorInfo}>
                <AppText variant="label" style={styles.doctorName}>
                  {doctor.name}
                </AppText>
                <AppText variant="caption" style={styles.doctorMeta}>
                  {doctor.specialty}
                </AppText>
                <AppText variant="caption" style={styles.doctorMeta}>
                  {doctor.nextSlot} · {doctor.languages.join(' · ')}
                </AppText>
              </View>
            </View>
            <View style={styles.doctorFooter}>
              <Price amount={doctor.feeInr} />
              <Button label="Book" size="sm" />
            </View>
          </Card>
        ) : null}

        {service ? (
          <Card style={styles.mtSm}>
            <View style={styles.serviceCard}>
              <Image source={{uri: service.imageUrl}} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                {service.badge ? <Badge label={service.badge} tone="accent" /> : null}
                <AppText variant="label" style={styles.serviceName}>
                  {service.name}
                </AppText>
                <Price amount={service.priceInr} />
              </View>
            </View>
          </Card>
        ) : null}
      </View>

      <View style={styles.labSection}>
        <SectionHeader title="Section bands" />
        {hero ? (
          <SectionSurface background={hero.background} style={styles.previewHero}>
            {tone => (
              <View>
                <AppText
                  variant="caption"
                  style={[styles.previewEyebrow, {color: tone.muted}]}>
                  {config.theme.festival?.name ?? heroItem?.eyebrow}
                </AppText>
                <AppText
                  variant="h2"
                  style={[styles.previewTitle, {color: tone.text}]}>
                  {config.theme.festival?.greeting ?? heroItem?.title}
                </AppText>
                <AppText
                  variant="body"
                  style={[styles.previewBody, {color: tone.muted}]}>
                  {heroItem?.subtitle}
                </AppText>
                <View style={styles.previewChips}>
                  <View
                    style={[
                      styles.previewChip,
                      {backgroundColor: tone.chip},
                    ]}>
                    <AppText
                      variant="caption"
                      style={[styles.previewChipText, {color: tone.text}]}>
                      {heroItem?.ctaLabel ?? 'Book a visit'}
                    </AppText>
                  </View>
                </View>
              </View>
            )}
          </SectionSurface>
        ) : null}

        {offer ? (
          <SectionSurface
            background={offer.background}
            style={[styles.previewOffer, styles.mtSm]}>
            {tone => (
              <AppText
                variant="label"
                style={{color: tone.text}}>
                {offerItem?.message}
              </AppText>
            )}
          </SectionSurface>
        ) : null}

        {categories ? (
          <SectionSurface
            background={categories.background}
            style={[styles.previewSection, styles.mtSm]}>
            {tone => (
              <View>
                <AppText
                  variant="label"
                  style={{color: tone.text, marginBottom: 6}}>
                  {categories.title}
                </AppText>
                <View style={styles.previewChips}>
                  {chips.map(chip => (
                    <View
                      key={chip.id}
                      style={[
                        styles.previewChip,
                        {backgroundColor: tone.chip},
                      ]}>
                      <AppText
                        variant="caption"
                        style={[styles.previewChipText, {color: tone.text}]}>
                        {chip.label}
                      </AppText>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </SectionSurface>
        ) : null}
      </View>

      <Divider />
      <AppText variant="caption" style={styles.note}>
        Theme values are rebuilt from LayoutConfig on every variant switch.
        Components only read theme and universal styles.
      </AppText>
    </Screen>
  );
}
