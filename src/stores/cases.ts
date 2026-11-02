import { create } from 'zustand';

interface CacheState<T> {
  [queryKey: string]: {
    data: T[];
    loading: boolean;
    error: Error | null;
    stale: boolean;
  };
}

interface CasesState {
  lists: CacheState<any>;
}

export const useCasesStore = create<CasesState>(() => ({
  lists: {},
}));
