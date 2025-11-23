import { useLiveQuery } from "dexie-react-hooks";

import { db, type Dish } from "@/db";

export function useDishList(mealId: number) {
  return useLiveQuery(
    () => db.dishes.where("mealId").equals(mealId).sortBy("name"),
    [mealId],
  );
}

export function addDish(dish: Omit<Dish, "id">) {
  return db.dishes.add(dish);
}

export function updateDish(id: number, changes: Partial<Omit<Dish, "id">>) {
  return db.dishes.update(id, changes);
}

export function deleteDish(id: number) {
  return db.transaction("rw", db.dishes, db.steps, async () => {
    await db.steps.where("dishId").equals(id).delete();
    return await db.dishes.delete(id);
  });
}
