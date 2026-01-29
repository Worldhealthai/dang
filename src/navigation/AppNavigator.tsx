import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../types';

// Import screens (we'll create these)
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import LikesScreen from '../screens/home/LikesScreen';
import MatchesScreen from '../screens/home/MatchesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileDetailScreen from '../screens/profile/ProfileDetailScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import PremiumScreen from '../screens/premium/PremiumScreen';
import PlaydateSchedulerScreen from '../screens/playdate/PlaydateSchedulerScreen';

import { useAuthStore } from '../store/useAuthStore';
import { Colors } from '../constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background.dark.primary,
          borderTopColor: Colors.border.dark,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.dark.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🐾" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          tabBarLabel: 'Likes',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="💛" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarLabel: 'Matches',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="💬" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="👤" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabIcon = ({ icon, color, size }: { icon: string; color: string; size: number }) => (
  <Text style={{ fontSize: size, opacity: color === Colors.primary ? 1 : 0.6 }}>
    {icon}
  </Text>
);

export default function AppNavigator() {
  const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuthStore();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : !hasCompletedOnboarding ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="ProfileDetail"
              component={ProfileDetailScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ presentation: 'card' }}
            />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="Premium"
              component={PremiumScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen
              name="PlaydateScheduler"
              component={PlaydateSchedulerScreen}
              options={{ presentation: 'modal' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
