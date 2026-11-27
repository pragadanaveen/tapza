import {View, type StyleProp, type ViewStyle} from 'react-native';

import {useCommonStyles} from '../styles';
import {AppText} from './AppText';
import {Button} from './Button';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SectionHeader({
  title,
  actionLabel,
  onAction,
  style,
}: SectionHeaderProps) {
  const styles = useCommonStyles();

  return (
    <View style={[styles.sectionTitleRow, style]}>
      <AppText variant="h2">{title}</AppText>
      {actionLabel ? (
        <Button
          label={actionLabel}
          variant="ghost"
          size="sm"
          onPress={onAction}
        />
      ) : null}
    </View>
  );
}
