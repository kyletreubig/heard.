import { ArrowLeft } from "lucide-react";

import { useDishSelectionStore } from "@/stores/dish-selection";

import { Button } from "./ui/button";

export function UnselectDishButton() {
  const setSelectedDish = useDishSelectionStore.use.setSelectedDish();

  return (
    <Button
      onClick={() => setSelectedDish(null)}
      size="icon"
      type="button"
      variant="outline"
    >
      <ArrowLeft />
    </Button>
  );
}
