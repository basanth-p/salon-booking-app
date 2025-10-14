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

  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOTP = async () => {
    setErrorMsg('');
    if (phone.length < 10) {
      setErrorMsg('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    const formattedPhone = `+${phone.replace(/\D/g, '')}`;
    console.log('Phone before formatting:', phone);
    console.log('Phone after formatting:', formattedPhone);
    console.log('Sending OTP to:', formattedPhone);
    
    const result = await signInWithPhone(formattedPhone);
    console.log('Supabase response:', result);

    if (result.error) {
      console.error('Error sending OTP:', result.error);
      setErrorMsg(result.error.message || 'Failed to send OTP. Please try again.');
      setLoading(false);
      return;
    }    console.log('OTP sent successfully');
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
          onChangeText={(text) => {
            setPhone(text);
            setErrorMsg('');
          }}
          mask={['+', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
          style={[styles.input, errorMsg ? styles.inputError : null]}
          keyboardType="phone-pad"
          placeholder="+91 XXX XXX XXXX"
          placeholderTextColor="#999"
        />
        {errorMsg ? (
          <ThemedText style={styles.errorText}>{errorMsg}</ThemedText>
        ) : null}

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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: -15,
    marginBottom: 20,
    alignSelf: 'flex-start',
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