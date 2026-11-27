import {NavigationContainer} from '@react-navigation/native';
import {useMemo} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppTabs} from './navigation/AppTabs';
import {useConfigStore} from './store/configStore';
import {buildNavigationTheme} from './theme/navigationTheme';
import {ThemeProvider, useTheme} from './theme/ThemeProvider';
import {useCommonStyles} from './ui/styles';

function ThemedApp() {
  const theme = useTheme();
  const styles = useCommonStyles();
  const navigationTheme = useMemo(
    () => buildNavigationTheme(theme),
    [theme],
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        />
        <AppTabs />
      </NavigationContainer>
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
