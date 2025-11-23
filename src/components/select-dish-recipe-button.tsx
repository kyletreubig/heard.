import { NotebookPen } from "lucide-react";

import type { Dish } from "@/db";
import { useDishSelectionStore } from "@/stores/dish-selection";
import { useDishTabSelectionStore } from "@/stores/dish-tab-selection";

import { Button } from "./ui/button";

export function SelectDishRecipeButton({
  className,
  dish,
}: {
  className?: string;
  dish: Dish;
}) {
  const setSelectedDish = useDishSelectionStore.use.setSelectedDish();
  const setSelectedDishTab = useDishTabSelectionStore.use.setSelectedTab();

  const handleClick = () => {
    setSelectedDishTab("recipe");
    setSelectedDish(dish);
  };

  return (
    <Button
      className={className}
      onClick={handleClick}
      type="button"
      variant="outline"
    >
      <NotebookPen /> Edit
    </Button>
  );
}
