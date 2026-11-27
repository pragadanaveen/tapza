import {View, type StyleProp, type ViewStyle} from 'react-native';

import {useCommonStyles} from '../styles';

type SkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

export function Skeleton({style}: SkeletonProps) {
  const styles = useCommonStyles();
  return <View style={[styles.skeleton, style]} />;
}
