import { create } from 'zustand';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export const useSettingsStore = create<SettingsState>(() => ({
  theme: 'system',
  language: 'en',
}));
