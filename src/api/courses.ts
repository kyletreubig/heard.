import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/db";

export function useCourseList(mealId?: number) {
  return useLiveQuery(() => {
    if (mealId === undefined) {
      return db.dishes.orderBy("course").uniqueKeys((keys) => keys as string[]);
    }
    return db.dishes
      .where("mealId")
      .equals(mealId)
      .sortBy("course")
      .then((dishes) => [
        ...dishes
          .map((dish) => dish.course)
          .reduce((courses, course) => {
            courses.add(course);
            return courses;
          }, new Set<string>()),
      ]);
  }, [mealId]);
}
