

import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { ShipmentsProvider } from "./src/context/ShipmentsContext";
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
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
