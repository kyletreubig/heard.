import { useLiveQuery } from "dexie-react-hooks";

import { db, type Meal } from "@/db";

export function useMealList() {
  return useLiveQuery(() => db.meals.orderBy("date").toArray(), []);
}

export function addMeal(meal: Omit<Meal, "id">) {
  return db.meals.add(meal);
}

export function updateMeal(id: number, changes: Partial<Omit<Meal, "id">>) {
  return db.meals.update(id, changes);
}

export function deleteMeal(id: number) {
  return db.meals.delete(id);
}
