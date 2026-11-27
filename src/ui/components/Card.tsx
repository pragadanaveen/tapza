import type {ReactNode} from 'react';
import {View, type StyleProp, type ViewStyle} from 'react-native';

import {useCommonStyles} from '../styles';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  quiet?: boolean;
  tight?: boolean;
  testID?: string;
};

export function Card({children, style, quiet, tight, testID}: CardProps) {
  const styles = useCommonStyles();

  return (
    <View
      testID={testID}
      style={[
        quiet ? styles.cardQuiet : styles.card,
        tight && styles.cardTight,
        style,
      ]}>
      {children}
    </View>
  );
}
