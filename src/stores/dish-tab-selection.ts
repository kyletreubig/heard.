import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";

export type DishTabType = "recipe" | "steps";

interface DishTabSelectionState {
  selectedTab: DishTabType;
  setSelectedTab: (tab: DishTabType) => void;
}

export const useDishTabSelectionStore = createSelectors(
  create<DishTabSelectionState>()((set) => ({
    selectedTab: "steps",
    setSelectedTab: (tab: DishTabType) => set({ selectedTab: tab }),
  })),
);
