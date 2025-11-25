import { Link, Save } from "lucide-react";

import type { Dish } from "@/db";
import { useEditDishForm } from "@/hooks/use-dish-form";

import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Textarea } from "./ui/textarea";

export function DishRecipeTab({ dish }: { dish: Dish }) {
  const { form, onSubmit } = useEditDishForm(dish);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <h3>Edit Recipe</h3>
        <InputGroup>
          <InputGroupAddon>
            <Link />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Recipe URL"
            {...form.register("recipeUrl")}
          />
        </InputGroup>

        <Textarea placeholder="Recipe..." {...form.register("recipeText")} />

        <Button
          className="w-full md:w-fit ml-auto"
          disabled={!form.formState.isDirty || !form.formState.isValid}
          type="submit"
        >
          <Save /> Save
        </Button>
      </div>
    </form>
  );
}
