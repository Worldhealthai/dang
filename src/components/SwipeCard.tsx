import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DogProfile } from '../types';
import { Colors, BorderRadius, Spacing, Typography, Shadows } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
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
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onPress,
  index,
  totalCards,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const handleHaptic = useCallback((style: 'light' | 'medium' | 'heavy') => {
    if (style === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (style === 'medium') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, []);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(handleHaptic)('light');
      scale.value = withSpring(0.95);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      // Haptic feedback when crossing threshold
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        runOnJS(handleHaptic)('medium');
      }
    })
    .onEnd((event) => {
      const { translationX, translationY, velocityX } = event;

      // Super Like (swipe up)
      if (translationY < -SWIPE_THRESHOLD && Math.abs(translationX) < SWIPE_THRESHOLD) {
        runOnJS(handleHaptic)('heavy');
        translateY.value = withSpring(-SCREEN_HEIGHT);
        runOnJS(onSwipeUp)();
        return;
      }

      // Like (swipe right)
      if (translationX > SWIPE_THRESHOLD || velocityX > 500) {
        runOnJS(handleHaptic)('medium');
        translateX.value = withSpring(SCREEN_WIDTH);
        runOnJS(onSwipeRight)();
        return;
      }

      // Pass (swipe left)
      if (translationX < -SWIPE_THRESHOLD || velocityX < -500) {
        runOnJS(handleHaptic)('medium');
        translateX.value = withSpring(-SCREEN_WIDTH);
        runOnJS(onSwipeLeft)();
        return;
      }

      // Return to center
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-15, 0, 15]
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.8]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
      opacity,
    };
  });

  const likeOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1]
    ),
  }));

  const passOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0]
    ),
  }));

  const superLikeOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0]
    ),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.card,
          animatedStyle,
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

          {/* Like Overlay */}
          <Animated.View style={[styles.overlay, styles.likeOverlay, likeOverlayStyle]}>
            <BlurView intensity={20} tint="light" style={styles.overlayBlur}>
              <Text style={styles.overlayText}>LIKE 💚</Text>
            </BlurView>
          </Animated.View>

          {/* Pass Overlay */}
          <Animated.View style={[styles.overlay, styles.passOverlay, passOverlayStyle]}>
            <BlurView intensity={20} tint="light" style={styles.overlayBlur}>
              <Text style={styles.overlayText}>PASS</Text>
            </BlurView>
          </Animated.View>

          {/* Super Like Overlay */}
          <Animated.View style={[styles.overlay, styles.superLikeOverlay, superLikeOverlayStyle]}>
            <BlurView intensity={20} tint="light" style={styles.overlayBlur}>
              <Text style={styles.overlayText}>SUPER LIKE ⭐</Text>
            </BlurView>
          </Animated.View>

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
      </Animated.View>
    </GestureDetector>
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
  overlay: {
    position: 'absolute',
    top: Spacing.xl,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 3,
  },
  likeOverlay: {
    right: Spacing.xl,
    borderColor: Colors.like,
  },
  passOverlay: {
    left: Spacing.xl,
    borderColor: Colors.pass,
  },
  superLikeOverlay: {
    alignSelf: 'center',
    borderColor: Colors.superLike,
  },
  overlayBlur: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  overlayText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
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
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tag: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
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
