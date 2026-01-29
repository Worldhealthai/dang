import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DogProfile } from '../types';
import { Colors, BorderRadius, Spacing, Typography, Shadows } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.65;

interface SwipeCardProps {
  profile: DogProfile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  onPress: () => void;
  index: number;
  totalCards: number;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onPress,
  index,
  totalCards,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          zIndex: totalCards - index,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        style={styles.touchable}
      >
        {/* Main Image */}
        <Image
          source={{ uri: profile.photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />

        {/* Card Info */}
        <View style={styles.info}>
          <View style={styles.mainInfo}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            <Text style={styles.breed}>{profile.breed}</Text>
          </View>

          <View style={styles.tags}>
            {profile.temperament.slice(0, 3).map((tag, idx) => (
              <View key={idx} style={styles.tag}>
                <BlurView intensity={15} tint="dark" style={styles.tagBlur}>
                  <Text style={styles.tagText}>{tag}</Text>
                </BlurView>
              </View>
            ))}
          </View>

          {profile.verified && (
            <View style={styles.badge}>
              <BlurView intensity={15} tint="light" style={styles.badgeBlur}>
                <Text style={styles.badgeText}>✓ Verified</Text>
              </BlurView>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.glass,
  },
  touchable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
  },
  mainInfo: {
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
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.sm,
  },
  tag: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  tagBlur: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  tagText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.dark.primary,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  badgeBlur: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  badgeText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.success,
  },
});
