import Dexie, { type EntityTable } from "dexie";

export interface Equipment {
  id: number;
  name: string;
}

export interface Meal {
  id: number;
  name: string;
  date: Date;
}

export interface Dish {
  id: number;
  mealId: number;
  name: string;
  course: string;
  recipeUrl?: string;
  recipeText?: string;
}

export interface Step {
  id: number;
  mealId: number;
  dishId: number;
  priorStepId: number | null;
  description: string;
  stage: string;
  equipment: string[];
  offsetMinutes: number;
  delayMinutes: number;
  durationMinutes: number;
  startAt?: Date;
  completedAt?: Date | null;
}

export const db = new Dexie("HeardDB") as Dexie & {
  equipment: EntityTable<Equipment, "id">;
  meals: EntityTable<Meal, "id">;
  dishes: EntityTable<Dish, "id">;
  steps: EntityTable<Step, "id">;
};

db.version(3).stores({
  equipment: "++id,&name",
  meals: "++id,&name,date",
  dishes: "++id,mealId,course",
  steps: "++id,mealId,dishId,priorStepId,stage,startAt",
});
