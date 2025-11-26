import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";

export type TimelineFilterValues = {
  completed: boolean | null;
  dishId: number | null;
  equipment: string | null;
  stage: string | null;
};

interface TimelineFiltersState {
  filters: TimelineFilterValues;
  setFilters: (filters: TimelineFilterValues) => void;
}

export const useTimelineFiltersStore = createSelectors(
  create<TimelineFiltersState>()((set) => ({
    filters: {
      completed: null,
      dishId: null,
      equipment: null,
      stage: null,
    },
    setFilters: (filters: TimelineFilterValues) => set({ filters }),
  })),
);
