import { create } from 'zustand';

export type Screen =
  | { name: 'home' }
  | { name: 'case'; caseId: string }
  | { name: 'patient'; patientId: string }
  | { name: 'record'; recordId: string }
  | { name: 'chat'; chatId: string }
  | { name: 'appointment'; appointmentId: string }
  | { name: 'profile' }
  | { name: 'settings' };

interface RouterState {
  screens: Screen[];
  push: (screen: Screen) => void;
  pop: () => void;
  replace: (screen: Screen) => void;
  reset: (screen: Screen) => void;
}

export const useRouterStore = create<RouterState>((set) => ({
  screens: [{ name: 'home' }],
  push: (screen) => set((state) => ({ screens: [...state.screens, screen] })),
  pop: () => set((state) => ({
    screens: state.screens.length > 1 ? state.screens.slice(0, -1) : state.screens
  })),
  replace: (screen) => set((state) => ({
    screens: [...state.screens.slice(0, -1), screen]
  })),
  reset: (screen) => set(() => ({ screens: [screen] })),
}));
