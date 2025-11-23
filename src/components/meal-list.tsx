import { useMealList } from "@/api/meals";

import { MealCardList } from "./meal-card-list";
import { MealTable } from "./meal-table";

export function MealList() {
  const meals = useMealList();

  return (
    <>
      <div className="hidden md:block">
        <MealTable meals={meals} />
      </div>

      <div className="md:hidden mt-4">
        <MealCardList meals={meals} />
      </div>
    </>
  );
}
