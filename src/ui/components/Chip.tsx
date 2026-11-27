import {
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import {iconName} from '../icons';
import {useCommonStyles} from '../styles';
import {AppText} from './AppText';

type ChipProps = {
  label: string;
  icon?: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Chip({
  label,
  icon,
  selected = false,
  onPress,
  style,
}: ChipProps) {
  const styles = useCommonStyles();
  const theme = useTheme();
  const iconColor = selected ? theme.colors.onPrimary : theme.colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{selected}}
      disabled={!onPress}
      onPress={onPress}
      hitSlop={4}
      style={({pressed}) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
        style,
      ]}>
      {icon ? (
        <Ionicons name={iconName(icon, selected)} size={16} color={iconColor} />
      ) : null}
      <AppText
        variant="label"
        style={[
          styles.chipText,
          selected && styles.chipTextSelected,
        ]}>
        {label}
      </AppText>
    </Pressable>
  );
}
