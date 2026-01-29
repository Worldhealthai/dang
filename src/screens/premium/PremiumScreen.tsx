import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard, GlassButton } from '../../components/glass';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { PREMIUM_FEATURES } from '../../constants/data';

export default function PremiumScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Upgrade to Premium</Text>
          <Text style={styles.subtitle}>Get unlimited matches and more</Text>
        </View>

        <ScrollView style={styles.content}>
          <GlassCard style={styles.tierCard}>
            <Text style={styles.tierEmoji}>💛</Text>
            <Text style={styles.tierTitle}>DogMatch Gold</Text>
            <Text style={styles.tierPrice}>$14.99/month</Text>

            {PREMIUM_FEATURES.gold.map((feature, idx) => (
              <View key={idx} style={styles.feature}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              </View>
            ))}

            <GlassButton
              title="Choose Gold"
              onPress={() => {}}
              variant="accent"
              size="large"
            />
          </GlassCard>

          <GlassCard style={styles.tierCard}>
            <Text style={styles.tierEmoji}>💎</Text>
            <Text style={styles.tierTitle}>DogMatch Platinum</Text>
            <Text style={styles.tierPrice}>$29.99/month</Text>

            {PREMIUM_FEATURES.platinum.map((feature, idx) => (
              <View key={idx} style={styles.feature}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              </View>
            ))}

            <GlassButton
              title="Choose Platinum"
              onPress={() => {}}
              variant="accent"
              size="large"
            />
          </GlassCard>
        </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  tierCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tierEmoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  tierTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  tierPrice: {
    fontSize: Typography.sizes.xl,
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.xs,
  },
  featureDesc: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.dark.secondary,
  },
});
