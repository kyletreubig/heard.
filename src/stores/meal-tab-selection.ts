import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";

export type MealTabType = "dishes" | "timeline";

interface MealTabSelectionState {
  selectedTab: MealTabType;
  setSelectedTab: (tab: MealTabType) => void;
}

export const useMealTabSelectionStore = createSelectors(
  create<MealTabSelectionState>()((set) => ({
    selectedTab: "timeline",
    setSelectedTab: (tab: MealTabType) => set({ selectedTab: tab }),
  })),
);
