import { create } from "zustand";

import type { Dish } from "@/db";
import { createSelectors } from "@/lib/zustand";

interface DishSelectionState {
  selectedDish: Dish | null;
  setSelectedDish: (dish: Dish | null) => void;
}

export const useDishSelectionStore = createSelectors(
  create<DishSelectionState>()((set) => ({
    selectedDish: null,
    setSelectedDish: (dish: Dish | null) => set({ selectedDish: dish }),
  })),
);
