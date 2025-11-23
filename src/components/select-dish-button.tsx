import { ArrowRight } from "lucide-react";

import type { Dish } from "@/db";
import { useDishSelectionStore } from "@/stores/dish-selection";

import { Button } from "./ui/button";

export function SelectDishButton({
  className,
  dish,
}: {
  className?: string;
  dish: Dish;
}) {
  const setSelectedDish = useDishSelectionStore.use.setSelectedDish();

  return (
    <Button
      className={className}
      onClick={() => setSelectedDish(dish)}
      type="button"
    >
      <ArrowRight /> Steps
    </Button>
  );
}
