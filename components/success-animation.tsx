import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface SuccessAnimationProps {
  size?: number;
  color?: string;
  onAnimationComplete?: () => void;
}

export function SuccessAnimation({
  size = 100,
  color = '#4CAF50',
  onAnimationComplete,
}: SuccessAnimationProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Start the animations
    scale.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1, { damping: 12 })
    );
    opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });

    // Set up completion callback
    const timeout = setTimeout(() => {
      onAnimationComplete?.();
    }, 1500);

    // Cleanup on unmount or when dependencies change
    return () => {
      clearTimeout(timeout);
      scale.value = 0;
      opacity.value = 0;
    };
  }, [scale, opacity, onAnimationComplete]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Ionicons name="checkmark-circle" size={size} color={color} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});