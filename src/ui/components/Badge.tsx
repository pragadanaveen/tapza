import {View, type StyleProp, type ViewStyle} from 'react-native';

import {useCommonStyles} from '../styles';
import {AppText} from './AppText';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
};

const SURFACE_KEYS = {
  neutral: 'badgeNeutral',
  accent: 'badgeAccent',
  success: 'badgeSuccess',
  warning: 'badgeWarning',
  danger: 'badgeDanger',
} as const;

const TEXT_KEYS = {
  neutral: 'badgeTextNeutral',
  accent: 'badgeTextAccent',
  success: 'badgeTextSuccess',
  warning: 'badgeTextWarning',
  danger: 'badgeTextDanger',
} as const;

export function Badge({label, tone = 'neutral', style}: BadgeProps) {
  const styles = useCommonStyles();

  return (
    <View style={[styles.badge, styles[SURFACE_KEYS[tone]], style]}>
      <AppText
        variant="caption"
        style={[styles.badgeText, styles[TEXT_KEYS[tone]]]}>
        {label}
      </AppText>
    </View>
  );
}
