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
import { GlassCard } from '../../components/glass';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { MOCK_DOG_PROFILES } from '../../utils/mockData';

export default function ProfileDetailScreen({ route, navigation }: any) {
  const { dogProfileId } = route.params;
  const profile = MOCK_DOG_PROFILES.find((p) => p.id === dogProfileId) || MOCK_DOG_PROFILES[0];

  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Image
            source={{ uri: profile.photos[0] }}
            style={styles.photo}
            resizeMode="cover"
          />

          <GlassCard style={styles.infoCard}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            <Text style={styles.breed}>{profile.breed}</Text>
            <Text style={styles.location}>
              📍 {profile.location.city}, {profile.location.state}
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bio}>{profile.bio}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Details</Text>
              <View style={styles.details}>
                <DetailItem label="Size" value={profile.size} />
                <DetailItem label="Weight" value={`${profile.weight} lbs`} />
                <DetailItem label="Gender" value={profile.gender} />
                <DetailItem label="Fixed" value={profile.fixed ? 'Yes' : 'No'} />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Temperament</Text>
              <View style={styles.tags}>
                {profile.temperament.map((tag, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

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
  backButton: {
    fontSize: Typography.sizes.lg,
    color: Colors.text.dark.primary,
  },
  content: {
    flex: 1,
  },
  photo: {
    width: '100%',
    height: 400,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
  },
  name: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.xs,
  },
  breed: {
    fontSize: Typography.sizes.xl,
    color: Colors.text.dark.secondary,
    marginBottom: Spacing.sm,
  },
  location: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.md,
  },
  bio: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
    lineHeight: 24,
  },
  details: {
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  detailLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
  },
  detailValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.dark.primary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.glass.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tagText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.dark.primary,
  },
});
