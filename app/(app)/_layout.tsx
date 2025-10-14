import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#F3EFE9' },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen 
        name="profile" 
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}