import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing } from '../../constants/theme';

const { height } = Dimensions.get('window');

interface GlassModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  closeOnBackdropPress?: boolean;
}

export const GlassModal: React.FC<GlassModalProps> = ({
  visible,
  onClose,
  children,
  style,
  closeOnBackdropPress = true,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={StyleSheet.absoluteFill}
        >
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
            <TouchableOpacity
              style={styles.backdrop}
              activeOpacity={1}
              onPress={closeOnBackdropPress ? onClose : undefined}
            />
          </BlurView>
        </Animated.View>

        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown.springify().damping(15)}
          style={[styles.content, style]}
        >
          <View
            style={[
              styles.modalCard,
              { backgroundColor: Colors.glass.darkOverlay },
            ]}
          >
            <BlurView intensity={30} tint="dark" style={styles.blur}>
              {children}
            </BlurView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  content: {
    maxHeight: height * 0.9,
  },
  modalCard: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  blur: {
    padding: Spacing.lg,
  },
});
