import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { router as Router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function GetStartedScreen() {
  const handleGetStarted = () => {
    Router.push('/phone-login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/splash-logo.jpg')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/salon1.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/salon2.jpg')}
          style={[styles.image, styles.secondImage]}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>
          Premium Beauty Services
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Book Certified Beauticians Anytime, Anywhere
        </ThemedText>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
        >
          <ThemedText style={styles.buttonText}>
            Get Started
          </ThemedText>
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    height: 80,
  },
  logo: {
    width: 120,
    height: 60,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: '40%',
    aspectRatio: 0.8,
    borderRadius: 20,
  },
  secondImage: {
    marginLeft: 15,
    marginTop: 30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4E342E',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4E342E',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4E342E',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});