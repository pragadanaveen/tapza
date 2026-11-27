import {View, type StyleProp, type ViewStyle} from 'react-native';

import {useCommonStyles} from '../styles';

type DividerProps = {
  style?: StyleProp<ViewStyle>;
};

export function Divider({style}: DividerProps) {
  const styles = useCommonStyles();
  return <View style={[styles.divider, style]} />;
}
