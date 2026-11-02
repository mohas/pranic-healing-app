import { create } from 'zustand';

interface CacheState<T> {
  [queryKey: string]: {
    data: T[];
    loading: boolean;
    error: Error | null;
    stale: boolean;
  };
}

interface ComponentsState {
  lists: CacheState<any>;
}

export const useComponentsStore = create<ComponentsState>(() => ({
  lists: {},
}));
