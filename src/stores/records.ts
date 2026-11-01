import { create } from 'zustand';

interface CacheState<T> {
  [queryKey: string]: {
    data: T[];
    loading: boolean;
    error: Error | null;
    stale: boolean;
  };
}

interface RecordsState {
  lists: CacheState<any>;
}

export const useRecordsStore = create<RecordsState>(() => ({
  lists: {},
}));
