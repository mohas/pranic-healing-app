import { create } from 'zustand';
import { Route } from './routes';

interface RouterState {
  currentRoute: Route;
  stack: Route[];
  
  push: (route: Route, params?: any) => void;
  pop: () => void;
  replace: (route: Route) => void;
  reset: (route: Route) => void;
}

export const useRouterStore = create<RouterState>((set) => ({
  currentRoute: 'auth', // Initial route
  stack: [],

  push: (route, params) => set((state) => ({
    stack: [...state.stack, state.currentRoute],
    currentRoute: route,
  })),

  pop: () => set((state) => {
    if (state.stack.length === 0) return state;
    const previous = state.stack[state.stack.length - 1];
    const newStack = state.stack.slice(0, -1);
    return {
      stack: newStack,
      currentRoute: previous,
    };
  }),

  replace: (route) => set({ currentRoute: route }),

  reset: (route) => set({
    currentRoute: route,
    stack: [],
  }),
}));
