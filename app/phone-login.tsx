import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/auth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaskInput from 'react-native-mask-input';

export default function PhoneLoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithPhone } = useAuth();

  const handleSendOTP = async () => {
    if (phone.length < 10) {
      // Show error
      return;
    }

    setLoading(true);
    const formattedPhone = `+${phone.replace(/\D/g, '')}`;
    const { error } = await signInWithPhone(formattedPhone);
    
    if (error) {
      // Show error
      setLoading(false);
      return;
    }

    router.push({
      pathname: '/verify-otp',
      params: { phone: formattedPhone }
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Enter Your Phone Number</ThemedText>
        <ThemedText style={styles.subtitle}>
          We&apos;ll send you a verification code
        </ThemedText>

        <MaskInput
          value={phone}
          onChangeText={setPhone}
          mask={['+', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="+91 XXX XXX XXXX"
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={[styles.button, !phone && styles.buttonDisabled]}
          onPress={handleSendOTP}
          disabled={!phone || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.buttonText}>
              Send OTP
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 30,
    opacity: 0.8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#4E342E',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4E342E',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});