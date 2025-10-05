import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#F3EFE9' },
      }}
    >
      <Stack.Screen 
        name="phone-login"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="verify-otp"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}