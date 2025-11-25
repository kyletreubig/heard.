import { db, type Step } from "@/db";

import { ensureInt } from "./numbers";

export async function updateMealTimeline(mealId: number) {
  const meal = await db.meals.get(mealId);
  if (!meal) return;

  const dishes = await db.dishes.where("mealId").equals(mealId).toArray();
  for (const dish of dishes) {
    await updateDishTimeline(dish.id, meal.date);
  }
}

export async function updateDishTimeline(dishId: number, mealDate?: Date) {
  if (mealDate === undefined) {
    const dish = await db.dishes.get(dishId);
    if (!dish) return;
    const meal = await db.meals.get(dish.mealId);
    if (!meal) return;
    mealDate = meal.date;
  }

  const steps = await db.steps.where("dishId").equals(dishId).toArray();
  const stepMap = new Map(steps.map((step) => [step.id, step]));

  const visited = new Set<number>();
  function visit(step: Step, time: Date) {
    // Prevent cycles
    if (visited.has(step.id)) return;
    visited.add(step.id);

    // Calculate startAt time for this step
    const startAt = new Date(time);
    const offsetMinutes =
      ensureInt(step.durationMinutes) +
      ensureInt(step.delayMinutes) +
      ensureInt(step.offsetMinutes);
    startAt.setMinutes(startAt.getMinutes() - offsetMinutes);
    console.log(
      step.id,
      step.priorStepId,
      step.description,
      time,
      offsetMinutes,
      startAt,
    );
    step.startAt = new Date(startAt);
    db.steps.update(step.id, { startAt: step.startAt });

    // Continue with prior steps, if any
    if (step.priorStepId) {
      const priorStep = stepMap.get(step.priorStepId);
      if (priorStep) {
        visit(priorStep, startAt);
      }
    }
  }

  // Start with all steps that do not have any steps dependent on them (i.e., final steps)
  const finalSteps = steps.filter((step) => {
    return !steps.some((s) => s.priorStepId === step.id);
  });
  for (const step of finalSteps) {
    visit(step, mealDate);
  }
}
