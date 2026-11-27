import {Pressable, type StyleProp, type ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import {iconName} from '../icons';
import {useCommonStyles} from '../styles';

type IconButtonProps = {
  icon: string;
  onPress?: () => void;
  accessibilityLabel: string;
  ghost?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  ghost = false,
  style,
}: IconButtonProps) {
  const styles = useCommonStyles();
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({pressed}) => [
        styles.iconButton,
        ghost && styles.iconButtonGhost,
        pressed && styles.iconButtonPressed,
        style,
      ]}>
      <Ionicons
        name={iconName(icon)}
        size={20}
        color={theme.colors.textPrimary}
      />
    </Pressable>
  );
}
