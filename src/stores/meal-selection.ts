import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";

interface MealSelectionState {
  selectedMealId: number | null;
  setSelectedMealId: (id: number | null) => void;
}

export const useMealSelectionStore = createSelectors(
  create<MealSelectionState>()((set) => ({
    selectedMealId: null,
    setSelectedMealId: (id: number | null) => set({ selectedMealId: id }),
  })),
);
