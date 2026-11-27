import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {SectionConfig} from '../config/types';
import {useTheme} from '../theme/ThemeProvider';
import {AppText} from '../ui/components';
import {iconName} from '../ui/icons';
import {useSectionStyles} from '../ui/styles';
import {parseQuickActions} from './parse';
import type {QuickActionItem} from './types';

type QuickActionsProps = {
  section: SectionConfig;
  onAction: (item: QuickActionItem) => void;
};

export function QuickActions({section, onAction}: QuickActionsProps) {
  const styles = useSectionStyles();
  const theme = useTheme();
  const items = parseQuickActions(section);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.quickGrid}>
      {items.map(item => (
        <Pressable
          key={item.id}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          onPress={() => onAction(item)}
          style={({pressed}) => [
            styles.quickTile,
            pressed && styles.quickTilePressed,
          ]}>
          <View style={styles.quickIconWrap}>
            <Ionicons
              name={iconName(item.icon)}
              size={21}
              color={theme.colors.primary}
            />
          </View>
          <AppText
            variant="label"
            numberOfLines={1}
            maxFontSizeMultiplier={1.4}
            style={styles.quickLabel}>
            {item.label}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}
