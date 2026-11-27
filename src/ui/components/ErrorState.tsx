import {View, type StyleProp, type ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import {useCommonStyles} from '../styles';
import {AppText} from './AppText';
import {Button} from './Button';

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ErrorState({
  title = 'Could not load this',
  message = 'Check your connection and try again.',
  onRetry,
  style,
}: ErrorStateProps) {
  const styles = useCommonStyles();
  const theme = useTheme();

  return (
    <View style={[styles.emptyState, style]}>
      <View style={[styles.emptyIcon, styles.errorIcon]}>
        <Ionicons
          name="alert-circle-outline"
          size={28}
          color={theme.colors.danger}
        />
      </View>
      <AppText variant="h2" style={styles.emptyTitle}>
        {title}
      </AppText>
      <AppText variant="body" style={styles.emptyMessage}>
        {message}
      </AppText>
      {onRetry ? (
        <Button
          label="Try again"
          icon="refresh"
          onPress={onRetry}
          variant="secondary"
          style={styles.mtSm}
        />
      ) : null}
    </View>
  );
}
