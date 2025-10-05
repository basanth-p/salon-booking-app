import SplashScreen from '@/components/splash-screen';
import { useAuth } from '@/context/auth';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, router, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const { user } = useAuth();
  const navigation = useNavigation();

  // Prevent going back to splash screen
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: false,
        gestureEnabled: false,
      });
    }, [navigation])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (user) {
        router.replace('/(app)/home');
      } else {
        router.replace('/(auth)/sign-in');
      }
    }, 1600);
    return () => clearTimeout(timer);
  }, [user]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#F3EFE9' },
        }}
      >
        <Stack.Screen
          name="get-started"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            animation: 'slide_from_bottom',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            animation: 'fade_from_bottom',
            gestureEnabled: false,
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE9',
  },
});