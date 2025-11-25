import { useDishStepList } from "@/api/steps";
import type { Dish } from "@/db";

import { DishStepTable } from "./dish-step-table";

export function DishStepList({ dish }: { dish: Dish }) {
  const steps = useDishStepList(dish.id);

  return (
    <>
      <h3 className="flex justify-between items-center">Steps</h3>

      <div className="hidden md:block">
        <DishStepTable dishId={dish.id} mealId={dish.mealId} steps={steps} />
      </div>

      <div className="md:hidden mt-4">Step cards</div>
    </>
  );
}
