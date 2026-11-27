import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useEffect, useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useConfigStore} from '../store/configStore';
import {useTheme} from '../theme/ThemeProvider';
import {AppText} from '../ui/components';
import {iconName} from '../ui/icons';
import {useNavigationStyles} from '../ui/styles';
import {FALLBACK_TABS, isScreenName} from './screenRegistry';

export function ConfigTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const config = useConfigStore(store => store.config);
  const styles = useNavigationStyles();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
      style={[
        styles.tabBar,
        {paddingBottom: Math.max(insets.bottom, theme.spacing.sm)},
      ]}>
      {tabs.map(tab => {
        const route = state.routes.find(item => item.name === tab.screen);
        if (!route) {
          return null;
        }

        const focused = activeRouteName === tab.screen;
        const options = descriptors[route.key]?.options;
        const label =
          typeof options?.tabBarLabel === 'string'
            ? options.tabBarLabel
            : tab.label;

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
              pressed && styles.tabItemPressed,
            ]}>
            <View
              style={[
                styles.tabIconWrap,
                focused && styles.tabIconWrapActive,
              ]}>
              <Ionicons
                name={iconName(tab.icon, focused)}
                size={21}
                color={
                  focused ? theme.colors.primary : theme.colors.textSecondary
                }
              />
            </View>
            <AppText
              variant="caption"
              numberOfLines={1}
              maxFontSizeMultiplier={1.4}
              style={[
                styles.tabLabel,
                focused && styles.tabLabelActive,
              ]}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
