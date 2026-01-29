import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard, GlassButton, GlassInput } from '../../components/glass';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [dogName, setDogName] = useState('');
  const { setOnboardingComplete } = useAuthStore();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setOnboardingComplete(true);
    }
  };

  const steps = [
    {
      title: "Let's set up your dog's profile!",
      subtitle: 'Help us find the perfect matches',
      emoji: '🐕',
    },
    {
      title: "What's your dog's name?",
      subtitle: 'This will be shown on their profile',
      emoji: '📝',
    },
    {
      title: 'Upload some photos',
      subtitle: 'Show off your pup!',
      emoji: '📸',
    },
    {
      title: 'Set preferences',
      subtitle: 'What kind of matches are you looking for?',
      emoji: '🎯',
    },
    {
      title: "You're all set!",
      subtitle: 'Start finding matches now',
      emoji: '🎉',
    },
  ];

  const currentStep = steps[step];

  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.progress}>
            Step {step + 1} of {steps.length}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.emoji}>{currentStep.emoji}</Text>
          <Text style={styles.title}>{currentStep.title}</Text>
          <Text style={styles.subtitle}>{currentStep.subtitle}</Text>

          <GlassCard style={styles.card}>
            {step === 1 && (
              <GlassInput
                placeholder="Enter your dog's name"
                value={dogName}
                onChangeText={setDogName}
              />
            )}
            {step !== 1 && (
              <Text style={styles.placeholder}>
                Content for step {step + 1}
              </Text>
            )}
          </GlassCard>

          <GlassButton
            title={step === 4 ? 'Get Started' : 'Continue'}
            onPress={handleNext}
            variant="primary"
            size="large"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
  },
  progress: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.dark.secondary,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.dark.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  card: {
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  placeholder: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
    textAlign: 'center',
    padding: Spacing.xl,
  },
});
