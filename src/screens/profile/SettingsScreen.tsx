import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../../components/glass';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function SettingsScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView style={styles.content}>
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Account Settings</Text>
          </GlassCard>
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Notifications</Text>
          </GlassCard>
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Privacy</Text>
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
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  card: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.dark.primary,
  },
});
