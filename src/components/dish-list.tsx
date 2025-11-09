import { Link, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { addDish, useDishList } from "@/api/dishes";
import type { Dish, Meal } from "@/db";

import { DishRecipe } from "./dish-recipe";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Textarea } from "./ui/textarea";

type Inputs = Omit<Dish, "id">;

export function DishList({ meal }: { meal: Meal }) {
  const dishes = useDishList(meal.id);

  const form = useForm<Inputs>({
    defaultValues: {
      mealId: meal.id,
      name: "",
      course: "",
      recipeUrl: "",
      recipeText: "",
    },
  });
  const onSubmit = (dish: Inputs) => addDish(dish).then(() => form.reset());

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="hidden md:block">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Recipe</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {dishes?.map((dish) => (
              <TableRow key={dish.id}>
                <TableCell>{dish.name}</TableCell>
                <TableCell>{dish.course}</TableCell>
                <TableCell>
                  <DishRecipe dish={dish} />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell className="align-top">
                <Input
                  placeholder="New dish"
                  {...form.register("name", { required: true })}
                />
              </TableCell>
              <TableCell className="align-top">
                <Input
                  placeholder="Course"
                  {...form.register("course", { required: true })}
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <InputGroup>
                    <InputGroupAddon>
                      <Link />
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="Recipe URL"
                      {...form.register("recipeUrl")}
                    />
                  </InputGroup>

                  <Textarea
                    placeholder="Recipe..."
                    {...form.register("recipeText")}
                  />
                </div>
              </TableCell>
              <TableCell className="align-top">
                <Button
                  className="w-full"
                  disabled={!form.formState.isDirty || !form.formState.isValid}
                  type="submit"
                >
                  <Plus /> Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </form>
  );
}
