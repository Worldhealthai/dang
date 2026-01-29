import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard, GlassButton } from '../../components/glass';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { MOCK_USER } from '../../utils/mockData';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProfileScreen({ navigation }: any) {
  const { logout } = useAuthStore();
  const { dog, owner } = MOCK_USER;

  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <GlassCard style={styles.profileCard}>
            <Image
              source={{ uri: dog.photos[0] }}
              style={styles.photo}
              resizeMode="cover"
            />
            <Text style={styles.name}>{dog.name}, {dog.age}</Text>
            <Text style={styles.breed}>{dog.breed}</Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Likes</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Playdates</Text>
              </View>
            </View>

            <GlassButton
              title="Edit Profile"
              onPress={() => navigation.navigate('EditProfile')}
              variant="secondary"
            />
          </GlassCard>

          <GlassCard style={styles.premiumCard}>
            <Text style={styles.emoji}>👑</Text>
            <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
            <Text style={styles.premiumText}>
              Get unlimited likes, Super Likes, and more!
            </Text>
            <GlassButton
              title="See Plans"
              onPress={() => navigation.navigate('Premium')}
              variant="accent"
            />
          </GlassCard>

          <GlassButton
            title="Sign Out"
            onPress={logout}
            variant="secondary"
            style={styles.logoutButton}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  profileCard: {
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: BorderRadius.round,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.xs,
  },
  breed: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.dark.secondary,
    marginBottom: Spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.dark.secondary,
  },
  premiumCard: {
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.lg,
  },
  logoutButton: {
    marginBottom: Spacing.xl,
  },
});
