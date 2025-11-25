import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/db";

export function useStageList({
  dishId,
  mealId,
}: { dishId?: number; mealId?: number } = {}) {
  return useLiveQuery(async () => {
    if ((await db.steps.count()) === 0) return [];
    if (dishId === undefined && mealId === undefined) {
      return db.steps.orderBy("stage").uniqueKeys((keys) => keys as string[]);
    }
    const query =
      dishId !== undefined
        ? db.steps.where("dishId").equals(dishId)
        : db.steps.where("mealId").equals(mealId!);
    return query.sortBy("stage").then((steps) => [
      ...steps
        .map((step) => step.stage)
        .reduce((stages, stage) => {
          stages.add(stage);
          return stages;
        }, new Set<string>()),
    ]);
  }, [dishId, mealId]);
}
