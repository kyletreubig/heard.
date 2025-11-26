import { useMemo } from "react";

import { useDish } from "@/api/dishes";
import { useDishSelectionStore } from "@/stores/dish-selection";
import { useDishTabSelectionStore } from "@/stores/dish-tab-selection";
import { getColorFromString, getContrastingTextColor } from "@/utils/colors";

import { Badge } from "./ui/badge";

export function DishBadge({ id }: { id: number }) {
  const dish = useDish(id);
  const text = dish?.name ?? "...";
  const background = useMemo(() => getColorFromString(text), [text]);
  const color = useMemo(
    () => getContrastingTextColor(background),
    [background],
  );

  const setSelectedDish = useDishSelectionStore.use.setSelectedDish();
  const setSelectedDishTab = useDishTabSelectionStore.use.setSelectedTab();
  const handleClick = () => {
    if (dish) {
      setSelectedDishTab("steps");
      setSelectedDish(dish);
    }
  };

  return (
    <Badge
      className="hover:cursor-pointer"
      onClick={handleClick}
      style={{ background, color }}
    >
      {text}
    </Badge>
  );
}
