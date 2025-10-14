import GoogleIcon from '@/components/google-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function SignInScreen() {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign-in...');
      const redirectUrl = Linking.createURL('');
      console.log('Redirect URL:', redirectUrl);
      
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google Sign-in error:', error);
        return;
      }

      if (data?.url) {
        console.log('Opening OAuth URL:', data.url);
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );
        
        console.log('WebBrowser result:', result);
        
        if (result.type === 'success') {
          // Handle successful authentication
          const { url: returnUrl } = result;
          console.log('Success URL:', returnUrl);
          
          // Parse the URL to handle the authentication result
          const url = new URL(returnUrl);
          const params = url.searchParams;
          
          if (params.has('error')) {
            console.error('OAuth error:', params.get('error'));
            throw new Error(params.get('error_description') || 'Authentication failed');
          }
        } else if (result.type === 'dismiss') {
          console.log('User dismissed the authentication window');
        }
      } else {
        console.log('No URL returned from signInWithGoogle');
      }
    } catch (error) {
      console.error('Error in handleGoogleSignIn:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/splash-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ThemedText style={styles.title}>Welcome Back</ThemedText>
      <ThemedText style={styles.subtitle}>
        Sign in with your Google account to continue
      </ThemedText>

      <TouchableOpacity 
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <GoogleIcon size={24} />
        <ThemedText style={styles.googleButtonText}>
          Continue with Google
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.8,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 300,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#4E342E',
    fontSize: 16,
    fontWeight: '600',
  },
});