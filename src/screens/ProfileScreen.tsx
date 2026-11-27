import {View} from 'react-native';

import {VARIANTS} from '../config';
import type {ConfigVariant} from '../config/types';
import {useConfigStore} from '../store/configStore';
import {useTheme} from '../theme/ThemeProvider';
import {
  AppText,
  Badge,
  Card,
  Divider,
  Screen,
  SegmentedControl,
} from '../ui/components';
import {useScreenStyles} from '../ui/styles';

export function ProfileScreen() {
  const config = useConfigStore(store => store.config);
  const variant = useConfigStore(store => store.variant);
  const setVariant = useConfigStore(store => store.setVariant);
  const theme = useTheme();
  const styles = useScreenStyles();

  const variantOptions = Object.values(VARIANTS).map(item => ({
    id: item.id,
    label: item.shortLabel,
  }));

  return (
    <Screen>
      <View style={styles.placeholderHeader}>
        <AppText variant="h1" style={styles.placeholderTitle}>
          Profile
        </AppText>
        <AppText variant="body" style={styles.placeholderBody}>
          Settings and demo controls for the assignment.
        </AppText>
      </View>

      <Card>
        <View style={styles.profileRow}>
          <View style={styles.flexOne}>
            <AppText variant="label">Appearance</AppText>
            <AppText variant="caption" style={styles.profileLabel}>
              Switch the remote config at runtime.
            </AppText>
          </View>
          <Badge label="Live config" tone="accent" />
        </View>

        <SegmentedControl
          options={variantOptions}
          value={variant}
          onChange={id => setVariant(id as ConfigVariant)}
          style={styles.variantRow}
        />

        <AppText variant="caption" style={styles.note}>
          {VARIANTS[variant].label} changes colour, banner, tab order and home
          sections. No component files change.
        </AppText>
      </Card>

      <Card style={styles.mtSm}>
        <AppText variant="label">Current config</AppText>
        <View style={styles.profileRow}>
          <AppText variant="caption" style={styles.profileLabel}>
            Version
          </AppText>
          <AppText variant="label" style={styles.profileValue}>
            v{config.version}
          </AppText>
        </View>
        <Divider />
        <View style={styles.profileRow}>
          <AppText variant="caption" style={styles.profileLabel}>
            Theme
          </AppText>
          <AppText variant="label" style={styles.profileValue}>
            {theme.isDark ? 'Dark surface' : 'Light surface'}
          </AppText>
        </View>
        <View style={styles.profileRow}>
          <AppText variant="caption" style={styles.profileLabel}>
            Primary
          </AppText>
          <AppText variant="label" style={styles.profileValue}>
            {theme.colors.primary}
          </AppText>
        </View>
        <View style={styles.profileRow}>
          <AppText variant="caption" style={styles.profileLabel}>
            Festival
          </AppText>
          <AppText variant="label" style={styles.profileValue}>
            {config.theme.festival?.name ?? 'None'}
          </AppText>
        </View>
      </Card>

      <Card style={styles.mtSm} quiet>
        <AppText variant="label">Next milestones</AppText>
        <AppText variant="caption" style={styles.note}>
          Config fetch + cache, booking sheet with doctor slots, prescriptions
          schedule and the two test suites are next.
        </AppText>
      </Card>
    </Screen>
  );
}
