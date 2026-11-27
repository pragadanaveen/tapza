import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {RootNavigator} from './navigation/RootNavigator';
import {useAppearanceStore} from './store/appearanceStore';
import {useConfigStore} from './store/configStore';
import {useLanguageStore} from './store/languageStore';
import {buildNavigationTheme} from './theme/navigationTheme';
import {ThemeProvider, useTheme} from './theme/ThemeProvider';
import {useCommonStyles} from './ui/styles';

function ThemedApp() {
  const theme = useTheme();
  const styles = useCommonStyles();
  const bootstrap = useConfigStore(store => store.bootstrap);
  const hydrateAppearance = useAppearanceStore(store => store.hydrate);
  const hydrateLanguage = useLanguageStore(store => store.hydrate);
  const navigationTheme = useMemo(
    () => buildNavigationTheme(theme),
    [theme],
  );

  useEffect(() => {
    void bootstrap();
    void hydrateAppearance();
    void hydrateLanguage();
  }, [bootstrap, hydrateAppearance, hydrateLanguage]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar
            barStyle={theme.isDark ? 'light-content' : 'dark-content'}
          />
          <RootNavigator />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function Root() {
  const config = useConfigStore(store => store.config);

  return (
    <ThemeProvider config={config}>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
