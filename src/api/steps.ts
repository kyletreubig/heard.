import { useLiveQuery } from "dexie-react-hooks";

import { db, type Step } from "@/db";
import { updateDishTimeline } from "@/utils/timeline";

export function useDishStepList(dishId: number, reverse: boolean = false) {
  return useLiveQuery(() => {
    let query = db.steps.where("dishId").equals(dishId);
    if (reverse) {
      query = query.reverse();
    }
    return query.sortBy("startAt");
  }, [dishId]);
}

export function useMealStepList(mealId: number) {
  return useLiveQuery(async () => {
    const steps = await db.steps
      .where("mealId")
      .equals(mealId)
      .sortBy("startAt");
    return [...steps]; // Prevents spurious re-ordering of array (no idea why)
  }, [mealId]);
}

export function useStep(stepId: number) {
  return useLiveQuery(() => db.steps.get(stepId), [stepId]);
}

export function addStep(step: Omit<Step, "id">) {
  return db.transaction("rw", db.meals, db.dishes, db.steps, async () => {
    const response = db.steps.add(step);
    await updateDishTimeline(step.dishId);
    return response;
  });
}

export function updateStep(id: number, changes: Partial<Omit<Step, "id">>) {
  return db.transaction("rw", db.meals, db.dishes, db.steps, async () => {
    const response = db.steps.update(id, changes);
    const dishId = changes.dishId ?? (await db.steps.get(id))?.dishId;
    if (dishId !== undefined) {
      await updateDishTimeline(dishId);
    }
    return response;
  });
}

export function deleteStep(id: number) {
  return db.transaction("rw", db.meals, db.dishes, db.steps, async () => {
    const step = await db.steps.get(id);
    if (!step) return;
    await db.steps
      .where("priorStepId")
      .equals(id)
      .modify({ priorStepId: undefined });
    await db.steps.delete(id);
    await updateDishTimeline(step.dishId);
  });
}
