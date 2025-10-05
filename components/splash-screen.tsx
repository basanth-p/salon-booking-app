import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 10,
          friction: 2,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp),
        }),
      ]),
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 20,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.in(Easing.exp),
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.in(Easing.exp),
        }),
      ]),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/splash-logo.jpg')}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
});

export default SplashScreen;
