import { create } from "zustand";

import type { Meal } from "@/db";
import { createSelectors } from "@/lib/zustand";

interface MealSelectionState {
  selectedMeal: Meal | null;
  setSelectedMeal: (meal: Meal | null) => void;
}

export const useMealSelectionStore = createSelectors(
  create<MealSelectionState>()((set) => ({
    selectedMeal: null,
    setSelectedMeal: (meal: Meal | null) => set({ selectedMeal: meal }),
  })),
);
