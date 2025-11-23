import { useLiveQuery } from "dexie-react-hooks";

import { db, type Meal } from "@/db";
import { updateMealTimeline } from "@/utils/timeline";

export function useMealList() {
  return useLiveQuery(() => db.meals.orderBy("date").toArray(), []);
}

export function addMeal(meal: Omit<Meal, "id">) {
  return db.meals.add(meal);
}

export function updateMeal(id: number, changes: Partial<Omit<Meal, "id">>) {
  return db.transaction("rw", db.meals, db.steps, async () => {
    const response = await db.meals.update(id, changes);
    await updateMealTimeline(id);
    return response;
  });
}

export function deleteMeal(id: number) {
  return db.transaction("rw", db.meals, db.dishes, db.steps, async () => {
    await db.steps.where("mealId").equals(id).delete();
    await db.dishes.where("mealId").equals(id).delete();
    return await db.meals.delete(id);
  });
}
