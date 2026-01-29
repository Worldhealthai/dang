import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors, BorderRadius, Typography, Spacing } from '../../constants/theme';

interface GlassInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  error,
  containerStyle,
  icon,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderWidth = useSharedValue(1);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderWidth.value = withSpring(2);
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderWidth.value = withSpring(1);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          animatedBorderStyle,
          {
            borderColor: error
              ? Colors.primary
              : isFocused
              ? Colors.accent
              : Colors.border.light,
          },
        ]}
      >
        <BlurView intensity={20} tint="light" style={styles.blur}>
          <View style={styles.inputWrapper}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <TextInput
              {...textInputProps}
              style={[styles.input, textInputProps.style]}
              placeholderTextColor={Colors.text.light.secondary}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
        </BlurView>
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.glass.light,
  },
  blur: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingLeft: Spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.primary,
  },
  error: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
});
