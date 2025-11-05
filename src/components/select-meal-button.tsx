import { ArrowRight } from "lucide-react";

import type { Meal } from "@/db";
import { useMealSelectionStore } from "@/stores/meal-selection";

import { Button } from "./ui/button";

export function SelectMealButton({ meal }: { meal: Meal }) {
  const setSelectedMeal = useMealSelectionStore.use.setSelectedMeal();

  return (
    <Button
      className="w-full"
      onClick={() => setSelectedMeal(meal)}
      type="button"
    >
      Go <ArrowRight />
    </Button>
  );
}
