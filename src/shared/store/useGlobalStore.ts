import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  language: 'en' | 'fa';
  darkMode: boolean;
  user: { id: string; name: string } | null;
  setLanguage: (lang: 'en' | 'fa') => void;
  toggleDarkMode: () => void;
  setUser: (user: { id: string; name: string } | null) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      language: 'fa',
      darkMode: false,
      user: null,
      setLanguage: (language) => set({ language }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setUser: (user) => set({ user }),
    }),
    { name: 'global-storage' }
  )
);
