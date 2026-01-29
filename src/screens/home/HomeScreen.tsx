import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SwipeCard } from '../../components/SwipeCard';
import { GlassCard } from '../../components/glass';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { useSwipeStore } from '../../store/useSwipeStore';
import { usePremiumStore } from '../../store/usePremiumStore';
import { MOCK_DOG_PROFILES } from '../../utils/mockData';
import { DogProfile } from '../../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<DogProfile[]>(MOCK_DOG_PROFILES);

  const { like, pass, superLike } = useSwipeStore();
  const { superLikesAvailable, useSuperLike, isPremium } = usePremiumStore();

  const handleSwipeLeft = () => {
    pass(profiles[currentIndex].id);
    nextCard();
  };

  const handleSwipeRight = () => {
    like(profiles[currentIndex].id);
    // Check for match (simulate)
    const isMatch = Math.random() > 0.7;
    if (isMatch) {
      showMatchAnimation();
    }
    nextCard();
  };

  const handleSwipeUp = () => {
    if (superLikesAvailable > 0 || isPremium) {
      superLike(profiles[currentIndex].id);
      useSuperLike();
      nextCard();
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const showMatchAnimation = () => {
    // TODO: Show match modal
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleCardPress = () => {
    navigation.navigate('ProfileDetail', {
      dogProfileId: profiles[currentIndex].id,
    });
  };

  if (currentIndex >= profiles.length) {
    return (
      <LinearGradient
        colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
        style={styles.container}
      >
        <SafeAreaView style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🐾</Text>
          <Text style={styles.emptyTitle}>No More Dogs Nearby</Text>
          <Text style={styles.emptyText}>
            Check back later for new matches!
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.headerIcon}>⚙️</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>DogMatch</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Premium')}
          >
            <Text style={styles.headerIcon}>👑</Text>
          </TouchableOpacity>
        </View>

        {/* Card Stack */}
        <View style={styles.cardContainer}>
          {profiles.slice(currentIndex, currentIndex + 3).map((profile, index) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              onSwipeLeft={index === 0 ? handleSwipeLeft : () => {}}
              onSwipeRight={index === 0 ? handleSwipeRight : () => {}}
              onSwipeUp={index === 0 ? handleSwipeUp : () => {}}
              onPress={index === 0 ? handleCardPress : () => {}}
              index={index}
              totalCards={3}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <ActionButton
            icon="✕"
            color={Colors.pass}
            size="large"
            onPress={handleSwipeLeft}
          />
          <ActionButton
            icon="⭐"
            color={Colors.superLike}
            size="small"
            onPress={handleSwipeUp}
            disabled={superLikesAvailable === 0 && !isPremium}
          />
          <ActionButton
            icon="💚"
            color={Colors.like}
            size="large"
            onPress={handleSwipeRight}
          />
        </View>

        {/* Super Likes Counter */}
        {!isPremium && (
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {superLikesAvailable} Super Likes remaining
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

interface ActionButtonProps {
  icon: string;
  color: string;
  size: 'small' | 'large';
  onPress: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  color,
  size,
  onPress,
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  const buttonSize = size === 'large' ? 70 : 55;

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.actionButton,
          {
            width: buttonSize,
            height: buttonSize,
            backgroundColor: color,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Text style={[styles.actionIcon, { fontSize: size === 'large' ? 32 : 24 }]}>
          {icon}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
  },
  logo: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  actionButton: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionIcon: {
    color: '#fff',
  },
  counter: {
    alignItems: 'center',
    paddingBottom: Spacing.md,
  },
  counterText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.dark.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.dark.primary,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: Typography.sizes.base,
    color: Colors.text.dark.secondary,
    textAlign: 'center',
  },
});
