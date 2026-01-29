// User & Profile Types
export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large' | 'giant';
  weight?: number;
  gender: 'male' | 'female';
  fixed: boolean;
  photos: string[];
  bio: string;
  temperament: string[];
  activityLevel: 'low' | 'moderate' | 'high' | 'very_high';
  goodWith: {
    dogs: boolean;
    cats: boolean;
    kids: boolean;
  };
  vaccinated: boolean;
  verified: boolean;
  ownerId: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OwnerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  isPremium: boolean;
  premiumTier?: 'gold' | 'platinum';
  createdAt: string;
}

export interface User {
  id: string;
  owner: OwnerProfile;
  dog: DogProfile;
}

// Matching Types
export interface Match {
  id: string;
  dogProfile1: DogProfile;
  dogProfile2: DogProfile;
  matchedAt: string;
  compatibilityScore: number;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface SwipeAction {
  dogProfileId: string;
  action: 'like' | 'pass' | 'super_like';
  timestamp: string;
}

// Chat Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'voice';
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  matchId: string;
  messages: Message[];
  lastMessage?: Message;
  typing: boolean;
}

// Premium Types
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'gold' | 'platinum' | 'ala_carte';
}

export interface Subscription {
  userId: string;
  tier: 'gold' | 'platinum';
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export interface PurchaseItem {
  id: string;
  type: 'super_like' | 'boost' | 'super_boost' | 'spotlight' | 'breed_unlock' | 'read_receipts' | 'theme';
  name: string;
  price: number;
  quantity?: number;
}

// Playdate Types
export interface Playdate {
  id: string;
  matchId: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  weather?: {
    temp: number;
    condition: string;
    icon: string;
  };
  notes?: string;
  rating?: number;
  createdBy: string;
}

// Preferences Types
export interface UserPreferences {
  userId: string;
  breeds: string[];
  ageRange: { min: number; max: number };
  sizePreferences: ('small' | 'medium' | 'large' | 'giant')[];
  distance: number; // in miles
  activityLevel: ('low' | 'moderate' | 'high' | 'very_high')[];
  showVerifiedOnly: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'super_like' | 'playdate' | 'system';
  title: string;
  body: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: string;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  ProfileDetail: { dogProfileId: string };
  Chat: { matchId: string };
  EditProfile: undefined;
  Settings: undefined;
  Premium: undefined;
  PlaydateScheduler: { matchId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Likes: undefined;
  Matches: undefined;
  Profile: undefined;
};
