import { create } from 'zustand';
import { User, OwnerProfile, DogProfile } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  logout: () => void;
  updateDogProfile: (profile: Partial<DogProfile>) => void;
  updateOwnerProfile: (profile: Partial<OwnerProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  hasCompletedOnboarding: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (value) => set({ isLoading: value }),
  setOnboardingComplete: (value) => set({ hasCompletedOnboarding: value }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
    }),

  updateDogProfile: (profile) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          dog: { ...state.user.dog, ...profile },
        },
      };
    }),

  updateOwnerProfile: (profile) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          owner: { ...state.user.owner, ...profile },
        },
      };
    }),
}));
