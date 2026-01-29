import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassInput, GlassButton } from '../../components/glass';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function EditProfileScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={[Colors.background.dark.primary, Colors.background.dark.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <ScrollView style={styles.content}>
          <GlassInput label="Dog's Name" placeholder="Enter name" />
          <GlassInput label="Breed" placeholder="Enter breed" />
          <GlassInput
            label="Age"
            placeholder="Enter age"
            keyboardType="numeric"
          />
          <GlassInput
            label="Bio"
            placeholder="Tell us about your dog"
            multiline
            numberOfLines={4}
          />

          <GlassButton
            title="Save Changes"
            onPress={() => navigation.goBack()}
            variant="primary"
            size="large"
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
});
