import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.errorContent}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>App Error</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <Text style={styles.errorHint}>
          Check the terminal/console for more details
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

// Loading component
function LoadingScreen() {
  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.logo}>🐾</Text>
        <ActivityIndicator size="large" color="#FF6B6B" style={{ marginVertical: 20 }} />
        <Text style={styles.loadingText}>Loading DogMatch Pro...</Text>
      </View>
    </LinearGradient>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [AppNavigator, setAppNavigator] = useState<any>(null);

  useEffect(() => {
    // Add small delay to ensure all modules are ready
    const timer = setTimeout(() => {
      try {
        const navigator = require('./src/navigation/AppNavigator').default;
        setAppNavigator(() => navigator);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load navigator:', err);
        setError(err as Error);
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="light" />
        <ErrorFallback error={error} />
      </GestureHandlerRootView>
    );
  }

  if (loading || !AppNavigator) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="light" />
        <LoadingScreen />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 80,
  },
  loadingText: {
    fontSize: 16,
    color: '#adb5bd',
  },
  errorContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  errorHint: {
    fontSize: 12,
    color: '#adb5bd',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
