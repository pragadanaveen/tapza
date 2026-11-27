import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useEffect, useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useConfigStore} from '../store/configStore';
import {useTheme} from '../theme/ThemeProvider';
import {AppText, GlassSurface} from '../ui/components';
import {iconName} from '../ui/icons';
import {useNavigationStyles} from '../ui/styles';
import {useI18n} from '../i18n/useI18n';
import {FALLBACK_TABS, isScreenName} from './screenRegistry';

export function ConfigTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const config = useConfigStore(store => store.config);
  const styles = useNavigationStyles();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {t} = useI18n();

  const tabs = useMemo(() => {
    const valid = config.tabs.filter(tab => isScreenName(tab.screen));
    return valid.length > 0 ? valid : FALLBACK_TABS;
  }, [config.tabs]);

  const activeRouteName = state.routes[state.index]?.name;

  useEffect(() => {
    if (!activeRouteName) {
      return;
    }

    const activeIsVisible = tabs.some(tab => tab.screen === activeRouteName);
    if (!activeIsVisible) {
      navigation.navigate(tabs[0]!.screen);
    }
  }, [activeRouteName, navigation, tabs]);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.tabBarWrap,
        {bottom: Math.max(insets.bottom, theme.spacing.sm) + theme.spacing.sm},
      ]}>
      <GlassSurface
        kind="bar"
        radius={theme.radii.xxl}
        intensity="regular"
        tint={theme.glass.tabBarTint}
        contentStyle={styles.tabBar}>
        {tabs.map(tab => {
          const route = state.routes.find(item => item.name === tab.screen);
          if (!route) {
            return null;
          }

          const focused = activeRouteName === tab.screen;
          // The config owns which tabs exist and in what order; the language
          // layer owns what they are called once the user picks a language.
          const label = t(`tab.${tab.screen}`);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(tab.screen);
            }
          };

          return (
            <Pressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{selected: focused}}
              accessibilityLabel={label}
              onPress={onPress}
              style={({pressed}) => [
                styles.tabItem,
                focused && styles.tabItemActive,
                pressed && styles.tabItemPressed,
              ]}>
              <View
                style={[
                  styles.tabIconWrap,
                  focused && styles.tabIconWrapActive,
                ]}>
                <Ionicons
                  name={iconName(tab.icon, focused)}
                  size={focused ? 18 : 22}
                  color={
                    focused
                      ? theme.glass.activePillText
                      : theme.colors.textSecondary
                  }
                />
              </View>
              {focused ? (
                <AppText
                  numberOfLines={1}
                  maxFontSizeMultiplier={1.3}
                  style={styles.tabLabel}>
                  {label}
                </AppText>
              ) : null}
            </Pressable>
          );
        })}
      </GlassSurface>
    </View>
  );
}
