import { useMemo, useState } from "react";

import { useDishList } from "@/api/dishes";
import type { Meal } from "@/db";

import { CourseSelect } from "./course-select";
import { DishCardList } from "./dish-card-list";
import { DishTable } from "./dish-table";

export function DishList({ meal }: { meal: Meal }) {
  const [filterCourse, setFilterCourse] = useState("");
  const allDishes = useDishList(meal.id);
  const dishes = useMemo(() => {
    if (!allDishes) return [];
    if (!filterCourse) return allDishes;
    return allDishes.filter(
      (dish) => dish.course.toLowerCase() === filterCourse.toLowerCase(),
    );
  }, [filterCourse, allDishes]);

  return (
    <>
      <h3 className="flex justify-between items-center">
        <span>Dishes</span>
        <CourseSelect
          allowClear
          fixed
          mealId={meal.id}
          placeholder="Filter by course"
          onValueChange={setFilterCourse}
          value={filterCourse}
        />
      </h3>
      <div className="hidden md:block">
        <DishTable dishes={dishes} mealId={meal.id} />
      </div>

      <div className="md:hidden mt-4">
        <DishCardList dishes={dishes} mealId={meal.id} />
      </div>
    </>
  );
}
