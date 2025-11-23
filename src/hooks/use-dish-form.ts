import { useForm } from "react-hook-form";

import { addDish, updateDish } from "@/api/dishes";
import type { Dish } from "@/db";

export type NewDishInputs = Omit<Dish, "id">;

export function useNewDishForm(mealId: number) {
  const form = useForm<NewDishInputs>({
    defaultValues: {
      mealId,
      name: "",
      course: "",
      recipeUrl: "",
      recipeText: "",
    },
  });
  const onSubmit = (dish: NewDishInputs) =>
    addDish(dish).then(() => form.reset());
  return { form, onSubmit };
}

export function useEditDishForm(defaultValues: Dish) {
  const form = useForm<Dish>({ defaultValues });
  const onSubmit = ({ id, ...dish }: Dish) =>
    updateDish(id, dish).then(() => form.reset({ id, ...dish }));
  return { form, onSubmit };
}
