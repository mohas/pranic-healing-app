import { create } from 'zustand';

interface CacheState<T> {
  [queryKey: string]: {
    data: T[];
    loading: boolean;
    error: Error | null;
    stale: boolean;
  };
}

interface PatientsState {
  lists: CacheState<any>;
}

export const usePatientsStore = create<PatientsState>(() => ({
  lists: {},
}));
