import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js/dist/module';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';
import { storage as webStorage } from './storage.web';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? webStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const signInWithPhone = async (phone: string) => {
  try {
    console.log('Making Supabase OTP request for:', phone);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });
    console.log('Full Supabase OTP response:', { data, error });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Detailed error in signInWithPhone:', error);
    return { data: null, error };
  }
};

export const verifyOTP = async (phone: string, token: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};