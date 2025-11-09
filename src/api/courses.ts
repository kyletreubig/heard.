import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/db";

export function useCourseList(mealId?: number) {
  return useLiveQuery(() => {
    if (mealId === undefined) {
      return db.dishes.orderBy("course").uniqueKeys((keys) => keys as string[]);
    }
    return db.dishes
      .orderBy("course")
      .filter((dish) => dish.mealId === mealId)
      .uniqueKeys((keys) => keys as string[]);
  }, [mealId]);
}
