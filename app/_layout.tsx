
import SplashScreen from '@/components/splash-screen';
import { AuthProvider, useAuth } from '@/context/auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.bg}>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <Stack>
              {!user ? (
                <>
                  <Stack.Screen name="get-started" options={{ headerShown: false }} />
                  <Stack.Screen name="phone-login" options={{ headerShown: false }} />
                  <Stack.Screen name="verify-otp" options={{ headerShown: false }} />
                </>
              ) : (
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              )}
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </>
        )}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F3EFE9',
  },
});
