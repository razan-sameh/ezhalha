import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '@/navigation/RootNavigator';
import { ShipmentsProvider } from '@/context/ShipmentsContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ShipmentsProvider>
          <AppContent />
        </ShipmentsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

registerRootComponent(App);
