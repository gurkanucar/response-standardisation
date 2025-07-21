import { create } from 'zustand';

interface UIState {
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

