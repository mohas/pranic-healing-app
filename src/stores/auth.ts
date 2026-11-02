import { create } from 'zustand';
import { User } from '../schemas';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  token: null,
  loading: false,
  error: null,
}));
