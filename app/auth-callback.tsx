import { useAuth } from '@/context/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    console.log('Auth callback params:', params);
    
    const navigateUser = async () => {
      try {
        if (user) {
          // User is authenticated, navigate to home page
          console.log('Authenticated user, navigating to home page');
          await router.replace('/');
        } else {
          // No user found, go back to sign-in
          console.log('No user found, returning to sign-in');
          await router.replace('/sign-in');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to sign-in if navigation fails
        await router.replace('/sign-in');
      }
    };

    // Execute navigation immediately
    navigateUser();
  }, [user, params, router]);

  // This screen should never be visible, but we'll return null just in case
  return null;
}