import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../../components/glass';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function LikesScreen() {
  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Likes</Text>
          <Text style={styles.subtitle}>Dogs who liked you</Text>
        </View>

        <ScrollView style={styles.content}>
          <GlassCard style={styles.premiumCard}>
            <Text style={styles.emoji}>👑</Text>
            <Text style={styles.premiumTitle}>Upgrade to See Likes</Text>
            <Text style={styles.premiumText}>
              See who likes your dog with DogMatch Gold
            </Text>
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
  premiumCard: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  premiumTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.sm,
  },
  premiumText: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
    textAlign: 'center',
  },
});
