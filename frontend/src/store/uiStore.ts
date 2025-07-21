import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage', // name of the item in the storage (must be unique)
    }
  )
);

