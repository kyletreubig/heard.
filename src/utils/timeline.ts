import { db, type Step } from "@/db";

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

  // Sort steps by priorStepId to establish order
  const orderedSteps: Step[] = [];
  const visited = new Set<number>();

  function visit(step: Step) {
    if (visited.has(step.id)) return;
    if (step.priorStepId) {
      const priorStep = stepMap.get(step.priorStepId);
      if (priorStep) {
        visit(priorStep);
      }
    }
    visited.add(step.id);
    orderedSteps.push(step);
  }

  for (const step of steps) {
    visit(step);
  }

  // Reverse the steps to work backwards
  orderedSteps.reverse();

  // Update startAt times based on order and durations
  const currentTime = mealDate;
  for (const step of orderedSteps) {
    const offsetMinutes =
      (step.durationMinutes ?? 0) - (step.offsetMinutes ?? 0);
    currentTime.setMinutes(currentTime.getMinutes() - offsetMinutes);
    step.startAt = new Date(currentTime);
    await db.steps.update(step.id, { startAt: step.startAt });
  }
}
