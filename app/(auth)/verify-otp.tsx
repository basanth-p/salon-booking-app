import { SuccessAnimation } from '@/components/success-animation';
import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/auth';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaskInput from 'react-native-mask-input';

export default function VerifyOTPScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const { verifyOtp, signInWithPhone } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length < 6) return;

    setLoading(true);
    const { error } = await verifyOtp(phone, otp);
    
    if (error) {
      // Show error
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowSuccess(true);
    // Navigate after showing success animation
    setTimeout(() => {
      router.replace('/(app)/home');
    }, 1500);
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    const { error } = await signInWithPhone(phone);
    if (!error) {
      setCountdown(30);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showSuccess ? (
          <View style={styles.successContainer}>
            <SuccessAnimation size={120} color="#4E342E" />
            <ThemedText style={styles.successText}>Verification Successful!</ThemedText>
          </View>
        ) : (
          <>
            <ThemedText style={styles.title}>Verify Phone Number</ThemedText>
            <ThemedText style={styles.subtitle}>
              Enter the code we sent to your phone
            </ThemedText>

            <MaskInput
              value={otp}
              onChangeText={setOtp}
              mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="XXX XXX"
              placeholderTextColor="#999"
            />

            <TouchableOpacity 
              style={[styles.button, otp.length < 6 && styles.buttonDisabled]}
              onPress={handleVerifyOTP}
              disabled={otp.length < 6 || loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={styles.buttonText}>
                  Verify OTP
                </ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.resendButton, countdown > 0 && styles.resendButtonDisabled]}
              onPress={handleResendOTP}
              disabled={countdown > 0}
            >
              <ThemedText style={styles.resendText}>
                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </ThemedText>
            </TouchableOpacity>
          </>
        )}
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4E342E',
    marginTop: 20,
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
    letterSpacing: 8,
    textAlign: 'center',
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
  resendButton: {
    marginTop: 20,
    padding: 10,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: '#4E342E',
    fontSize: 16,
  },
});