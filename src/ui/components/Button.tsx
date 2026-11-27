import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import {iconName} from '../icons';
import {useCommonStyles} from '../styles';
import {AppText} from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
};

const VARIANT_KEYS = {
  primary: 'buttonPrimary',
  secondary: 'buttonSecondary',
  ghost: 'buttonGhost',
} as const;

const SIZE_KEYS = {
  sm: 'buttonSm',
  md: 'buttonMd',
  lg: 'buttonLg',
} as const;

const TEXT_KEYS = {
  primary: 'buttonTextPrimary',
  secondary: 'buttonTextSecondary',
  ghost: 'buttonTextGhost',
} as const;

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
  testID,
}: ButtonProps) {
  const styles = useCommonStyles();
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const contentColor = isDisabled
    ? theme.colors.disabled
    : variant === 'primary'
      ? theme.colors.onPrimary
      : variant === 'ghost'
        ? theme.colors.primary
        : theme.colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{disabled: isDisabled, busy: loading}}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={({pressed}) => [
        styles.buttonBase,
        styles[VARIANT_KEYS[variant]],
        styles[SIZE_KEYS[size]],
        pressed && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={contentColor} />
      ) : icon ? (
        <Ionicons name={iconName(icon)} size={18} color={contentColor} />
      ) : null}
      <AppText
        variant="label"
        style={[
          styles.buttonTextBase,
          styles[TEXT_KEYS[variant]],
          isDisabled && styles.buttonTextDisabled,
        ]}>
        {label}
      </AppText>
    </Pressable>
  );
}
