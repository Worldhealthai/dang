import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, BorderRadius, Shadows } from '../../constants/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: 'light' | 'dark' | 'accent';
  borderColor?: string;
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 20,
  variant = 'light',
  borderColor,
  animated = false,
}) => {
  const backgroundColor =
    variant === 'light'
      ? Colors.glass.light
      : variant === 'dark'
      ? Colors.glass.dark
      : Colors.glass.accent;

  const Container = animated ? Animated.View : View;
  const animationProps = animated ? { entering: FadeIn.duration(300) } : {};

  return (
    <Container
      style={[
        styles.container,
        { backgroundColor },
        style
      ]}
      {...animationProps}
    >
      <BlurView
        intensity={intensity}
        tint={variant === 'light' ? 'light' : 'dark'}
        style={[
          styles.blur,
          {
            borderColor: borderColor || Colors.border.light,
          },
        ]}
      >
        {children}
      </BlurView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.glass,
  },
  blur: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
