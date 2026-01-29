import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '../constants/theme';

export default function SplashScreen() {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10 });
    opacity.value = withSequence(
      withSpring(1),
      withRepeat(withSpring(0.7), -1, true)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.logo}>🐾</Text>
        <Text style={styles.title}>DogMatch Pro</Text>
        <Text style={styles.subtitle}>Find your pup's perfect match</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.dark.secondary,
  },
});
