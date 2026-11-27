import {
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';

import {useCommonStyles} from '../styles';

type TextVariant = 'display' | 'h1' | 'h2' | 'body' | 'label' | 'caption';
type TextTone =
  | 'primary'
  | 'secondary'
  | 'onPrimary'
  | 'onAccent'
  | 'accent'
  | 'brand'
  | 'danger'
  | 'success'
  | 'disabled';

const TYPE_KEYS: Record<TextVariant, keyof ReturnType<typeof useCommonStyles>> = {
  display: 'typeDisplay',
  h1: 'typeH1',
  h2: 'typeH2',
  body: 'typeBody',
  label: 'typeLabel',
  caption: 'typeCaption',
};

const TONE_KEYS: Record<TextTone, keyof ReturnType<typeof useCommonStyles>> = {
  primary: 'tonePrimary',
  secondary: 'toneSecondary',
  onPrimary: 'toneOnPrimary',
  onAccent: 'toneOnAccent',
  accent: 'toneAccent',
  brand: 'tonePrimaryBrand',
  danger: 'toneDanger',
  success: 'toneSuccess',
  disabled: 'toneDisabled',
};

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  style?: StyleProp<TextStyle>;
};

export function AppText({
  variant = 'body',
  tone = 'primary',
  style,
  ...rest
}: AppTextProps) {
  const styles = useCommonStyles();

  return (
    <Text
      {...rest}
      style={[styles[TYPE_KEYS[variant]], styles[TONE_KEYS[tone]], style]}
    />
  );
}
