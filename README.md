# 🐾 DogMatch Pro - Premium Native Dog Dating App

A high-end, production-ready React Native mobile app that brings Tinder-style matching exclusively for dogs and their owners. Built with cutting-edge technologies and featuring buttery-smooth 60fps animations with glassmorphism UI throughout.

![DogMatch Pro](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81-green)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## ✨ Features

### Core Functionality
- **🎯 Smart Swipe Discovery**: Tinder-style card stack with intuitive gestures
  - Swipe right to like
  - Swipe left to pass
  - Swipe up for Super Like
  - Long press to view full profile
- **🎨 Glassmorphism UI**: Premium frosted glass design with blur effects
- **⚡ Buttery Smooth Animations**: 60fps interactions with React Native Reanimated 3
- **📱 Haptic Feedback**: Tactile responses for every interaction
- **🔐 Authentication Flow**: Secure login and sign-up
- **📝 Onboarding**: 5-step profile creation wizard
- **💬 Matches & Chat**: Real-time messaging (placeholder)
- **👤 Profile Management**: View and edit dog profiles
- **👑 Premium Features**: Gold and Platinum subscription tiers

### Premium Monetization

#### DogMatch Gold ($14.99/month)
- Unlimited likes
- See who liked you
- 5 Super Likes per day
- 1 Boost per month
- Rewind last swipe
- Advanced filters
- No ads

#### DogMatch Platinum ($29.99/month)
- All Gold features
- Unlimited Super Likes
- Weekly Boosts
- Priority visibility
- Message before matching
- Profile insights
- VIP badge

## 🏗️ Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Language**: TypeScript
- **Navigation**: React Navigation v6 (Native Stack + Bottom Tabs)
- **State Management**: Zustand for global state
- **Animations**: React Native Reanimated 3 + Gesture Handler
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend Ready**: Supabase integration structure
- **UI Components**: Custom glassmorphism design system
- **Haptics**: Expo Haptics for tactile feedback
- **Gradients**: Expo Linear Gradient
- **Blur Effects**: Expo Blur

## 📁 Project Structure

```
dang/
├── src/
│   ├── components/
│   │   ├── glass/              # Glassmorphism UI components
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlassButton.tsx
│   │   │   ├── GlassInput.tsx
│   │   │   └── GlassModal.tsx
│   │   └── SwipeCard.tsx       # Main swipe card component
│   ├── screens/
│   │   ├── auth/               # Authentication screens
│   │   ├── onboarding/         # Onboarding flow
│   │   ├── home/               # Discovery, likes, matches
│   │   ├── profile/            # Profile management
│   │   ├── chat/               # Messaging (placeholder)
│   │   ├── premium/            # Premium upgrade screens
│   │   └── playdate/           # Playdate scheduling
│   ├── navigation/             # Navigation configuration
│   ├── store/                  # Zustand state stores
│   │   ├── useAuthStore.ts
│   │   ├── useSwipeStore.ts
│   │   ├── usePremiumStore.ts
│   │   └── useMatchStore.ts
│   ├── constants/              # Theme and data constants
│   │   ├── theme.ts
│   │   └── data.ts
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions & mock data
│   └── services/               # API services (ready for backend)
├── App.tsx
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio (for Android emulator)
- Expo Go app (for physical device testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dang
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` (for testing only, not optimized for web)

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator (Mac only)
npm run web        # Run in web browser
```

## 🎨 Design System

### Color Palette

- **Primary**: `#FF6B6B` (Coral Red - love/passion)
- **Secondary**: `#4ECDC4` (Teal - trust)
- **Accent**: `#FFE66D` (Golden - premium)
- **Success**: `#7BED9F` (Green - match)

### Glassmorphism Components

All UI elements follow a consistent glassmorphism design:
- Frosted glass backgrounds with blur effects
- Subtle borders and shadows
- Smooth animations and transitions
- Premium feel throughout

## 🔧 Key Features Implementation

### Swipe Mechanism

The swipe card uses React Native Reanimated 3 and Gesture Handler for smooth, physics-based interactions:

```typescript
// Swipe thresholds
- Right swipe (>30% screen width) = Like
- Left swipe (<-30% screen width) = Pass
- Up swipe (vertical) = Super Like
- Velocity-based throws for natural feel
```

### State Management

Uses Zustand for efficient, lightweight state management:
- `useAuthStore` - Authentication state
- `useSwipeStore` - Swipe actions and history
- `usePremiumStore` - Premium features and subscriptions
- `useMatchStore` - Matches and conversations

### Navigation Flow

```
Auth Screen → Onboarding (5 steps) → Main App
                                     ├── Home (Discover)
                                     ├── Likes
                                     ├── Matches
                                     └── Profile
```

## 🔮 Future Enhancements

### Backend Integration (Ready)
- Supabase authentication
- Real-time chat with Supabase Realtime
- Cloud storage for dog photos
- Database for profiles and matches

### Planned Features
- RevenueCat for subscription management
- Push notifications with Expo Notifications
- Analytics with Mixpanel/Amplitude
- Playdate scheduling with calendar integration
- Dog park map with location services
- Advanced matching algorithm
- Photo verification to prevent catfishing
- Video profiles
- Breed-specific filters

## 📱 Screenshots

*Coming soon - Add screenshots of the app here*

## 🤝 Contributing

This is a demo project showcasing React Native best practices and modern mobile app development patterns.

## 📄 License

MIT License - feel free to use this project for learning and inspiration!

## 🙏 Acknowledgments

- Dog photos from Unsplash
- Icons and emojis for UI elements
- React Native community for amazing libraries
- Expo team for the incredible developer experience

## 📞 Support

For questions or issues, please open a GitHub issue.

---

**Built with ❤️ for dogs and their humans**

🐾 Happy Matching! 🐾
