import { create } from 'zustand';
import { Match, Message } from '../types';

interface MatchState {
  matches: Match[];
  conversations: Record<string, Message[]>;
  unreadCount: number;

  // Actions
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  removeMatch: (matchId: string) => void;
  setMessages: (matchId: string, messages: Message[]) => void;
  addMessage: (matchId: string, message: Message) => void;
  markAsRead: (matchId: string) => void;
  updateUnreadCount: (count: number) => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  conversations: {},
  unreadCount: 0,

  setMatches: (matches) => set({ matches }),

  addMatch: (match) =>
    set((state) => ({
      matches: [match, ...state.matches],
    })),

  removeMatch: (matchId) =>
    set((state) => ({
      matches: state.matches.filter((m) => m.id !== matchId),
    })),

  setMessages: (matchId, messages) =>
    set((state) => ({
      conversations: {
        ...state.conversations,
        [matchId]: messages,
      },
    })),

  addMessage: (matchId, message) =>
    set((state) => ({
      conversations: {
        ...state.conversations,
        [matchId]: [...(state.conversations[matchId] || []), message],
      },
    })),

  markAsRead: (matchId) =>
    set((state) => {
      const match = state.matches.find((m) => m.id === matchId);
      if (!match) return state;

      return {
        matches: state.matches.map((m) =>
          m.id === matchId ? { ...m, unreadCount: 0 } : m
        ),
        unreadCount: Math.max(0, state.unreadCount - match.unreadCount),
      };
    }),

  updateUnreadCount: (count) => set({ unreadCount: count }),
}));
