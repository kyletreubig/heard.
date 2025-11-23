import { useForm } from "react-hook-form";

import { addMeal } from "@/api/meals";
import type { Meal } from "@/db";
import { toDatetimeLocalString } from "@/utils/dates";

export type NewMealInputs = Omit<Meal, "id" | "date"> & {
  date: string;
};

export function useNewMealForm() {
  const form = useForm<NewMealInputs>({
    defaultValues: { name: "", date: toDatetimeLocalString(new Date()) },
  });
  const onSubmit = ({ date, ...inputs }: NewMealInputs) =>
    addMeal({ date: new Date(date), ...inputs }).then(() => form.reset());
  return { form, onSubmit };
}
