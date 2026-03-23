import { create } from "zustand";

interface AppState {
  currentChapter: string;
  setChapter: (chapter: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentChapter: "Exploring the front fascia and air intakes.",
  setChapter: (chapter) => set({ currentChapter: chapter }),
}));