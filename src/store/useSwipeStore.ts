import { create } from 'zustand';
import { DogProfile, SwipeAction } from '../types';

interface SwipeState {
  profiles: DogProfile[];
  currentIndex: number;
  likedProfiles: string[];
  passedProfiles: string[];
  superLikedProfiles: string[];
  dailySuperLikesUsed: number;
  lastSwipeAction: SwipeAction | null;

  // Actions
  setProfiles: (profiles: DogProfile[]) => void;
  addProfiles: (profiles: DogProfile[]) => void;
  nextProfile: () => void;
  like: (profileId: string) => void;
  pass: (profileId: string) => void;
  superLike: (profileId: string) => void;
  rewind: () => void;
  resetDailySuperLikes: () => void;
}

export const useSwipeStore = create<SwipeState>((set, get) => ({
  profiles: [],
  currentIndex: 0,
  likedProfiles: [],
  passedProfiles: [],
  superLikedProfiles: [],
  dailySuperLikesUsed: 0,
  lastSwipeAction: null,

  setProfiles: (profiles) => set({ profiles, currentIndex: 0 }),

  addProfiles: (profiles) =>
    set((state) => ({
      profiles: [...state.profiles, ...profiles],
    })),

  nextProfile: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.profiles.length - 1),
    })),

  like: (profileId) =>
    set((state) => ({
      likedProfiles: [...state.likedProfiles, profileId],
      lastSwipeAction: {
        dogProfileId: profileId,
        action: 'like',
        timestamp: new Date().toISOString(),
      },
    })),

  pass: (profileId) =>
    set((state) => ({
      passedProfiles: [...state.passedProfiles, profileId],
      lastSwipeAction: {
        dogProfileId: profileId,
        action: 'pass',
        timestamp: new Date().toISOString(),
      },
    })),

  superLike: (profileId) =>
    set((state) => ({
      superLikedProfiles: [...state.superLikedProfiles, profileId],
      dailySuperLikesUsed: state.dailySuperLikesUsed + 1,
      lastSwipeAction: {
        dogProfileId: profileId,
        action: 'super_like',
        timestamp: new Date().toISOString(),
      },
    })),

  rewind: () =>
    set((state) => {
      if (!state.lastSwipeAction) return state;

      const { dogProfileId, action } = state.lastSwipeAction;

      const newState: Partial<SwipeState> = {
        lastSwipeAction: null,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };

      if (action === 'like') {
        newState.likedProfiles = state.likedProfiles.filter((id) => id !== dogProfileId);
      } else if (action === 'pass') {
        newState.passedProfiles = state.passedProfiles.filter((id) => id !== dogProfileId);
      } else if (action === 'super_like') {
        newState.superLikedProfiles = state.superLikedProfiles.filter(
          (id) => id !== dogProfileId
        );
        newState.dailySuperLikesUsed = Math.max(0, state.dailySuperLikesUsed - 1);
      }

      return newState as SwipeState;
    }),

  resetDailySuperLikes: () => set({ dailySuperLikesUsed: 0 }),
}));
