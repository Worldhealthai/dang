import { create } from 'zustand';
import { Subscription } from '../types';

interface PremiumState {
  subscription: Subscription | null;
  isPremium: boolean;
  tier: 'free' | 'gold' | 'platinum';
  boostsAvailable: number;
  superLikesAvailable: number;

  // Actions
  setSubscription: (subscription: Subscription | null) => void;
  setPremiumStatus: (isPremium: boolean, tier?: 'gold' | 'platinum') => void;
  useBoost: () => void;
  useSuperLike: () => void;
  addBoosts: (count: number) => void;
  addSuperLikes: (count: number) => void;
}

export const usePremiumStore = create<PremiumState>((set) => ({
  subscription: null,
  isPremium: false,
  tier: 'free',
  boostsAvailable: 0,
  superLikesAvailable: 1, // Free users get 1 per day

  setSubscription: (subscription) =>
    set({
      subscription,
      isPremium: subscription?.status === 'active',
      tier: subscription?.tier || 'free',
    }),

  setPremiumStatus: (isPremium, tier = 'gold') =>
    set({
      isPremium,
      tier: isPremium ? tier : 'free',
    }),

  useBoost: () =>
    set((state) => ({
      boostsAvailable: Math.max(0, state.boostsAvailable - 1),
    })),

  useSuperLike: () =>
    set((state) => ({
      superLikesAvailable: Math.max(0, state.superLikesAvailable - 1),
    })),

  addBoosts: (count) =>
    set((state) => ({
      boostsAvailable: state.boostsAvailable + count,
    })),

  addSuperLikes: (count) =>
    set((state) => ({
      superLikesAvailable: state.superLikesAvailable + count,
    })),
}));
