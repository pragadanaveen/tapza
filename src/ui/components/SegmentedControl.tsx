import {
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {useCommonStyles} from '../styles';
import {AppText} from './AppText';

export type SegmentOption = {
  id: string;
  label: string;
};

type SegmentedControlProps = {
  options: readonly SegmentOption[];
  value: string;
  onChange: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function SegmentedControl({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps) {
  const styles = useCommonStyles();

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.segmented, style]}>
      {options.map(option => {
        const active = option.id === value;
        return (
          <Pressable
            key={option.id}
            accessibilityRole="tab"
            accessibilityState={{selected: active}}
            onPress={() => onChange(option.id)}
            style={[
              styles.segmentedItem,
              active && styles.segmentedItemActive,
            ]}>
            <AppText
              variant="label"
              style={[
                styles.segmentedText,
                active && styles.segmentedTextActive,
              ]}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
