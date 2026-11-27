import {View, type StyleProp, type ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import {iconName} from '../icons';
import {useCommonStyles} from '../styles';
import {AppText} from './AppText';
import {Button} from './Button';

type EmptyStateProps = {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({
  icon = 'sparkles',
  title,
  message,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const styles = useCommonStyles();
  const theme = useTheme();

  return (
    <View style={[styles.emptyState, style]}>
      <View style={styles.emptyIcon}>
        <Ionicons
          name={iconName(icon)}
          size={28}
          color={theme.colors.primary}
        />
      </View>
      <AppText variant="h2" style={styles.emptyTitle}>
        {title}
      </AppText>
      <AppText variant="body" style={styles.emptyMessage}>
        {message}
      </AppText>
      {actionLabel ? (
        <Button
          label={actionLabel}
          onPress={onAction}
          variant="secondary"
          style={styles.mtSm}
        />
      ) : null}
    </View>
  );
}
