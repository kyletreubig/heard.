import { ArrowLeft } from "lucide-react";

import { useMealSelectionStore } from "@/stores/meal-selection";

import { Button } from "./ui/button";

export function UnselectMealButton() {
  const setSelectedMeal = useMealSelectionStore.use.setSelectedMeal();

  return (
    <Button
      onClick={() => setSelectedMeal(null)}
      size="icon"
      type="button"
      variant="outline"
    >
      <ArrowLeft />
    </Button>
  );
}
