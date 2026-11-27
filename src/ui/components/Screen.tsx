import type {ReactNode} from 'react';
import {
  ScrollView,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useCommonStyles} from '../styles';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  scroll = true,
  contentContainerStyle,
  style,
}: ScreenProps) {
  const styles = useCommonStyles();

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[
            styles.screenContent,
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.screenContent, contentContainerStyle]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
