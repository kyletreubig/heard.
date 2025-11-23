import { useForm } from "react-hook-form";

import { addDish } from "@/api/dishes";
import type { Dish } from "@/db";

type NewDishInputs = Omit<Dish, "id">;

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
