import { Link, Plus } from "lucide-react";
import { Controller } from "react-hook-form";

import { updateDish } from "@/api/dishes";
import type { Dish } from "@/db";
import { useNewDishForm } from "@/hooks/use-dish-form";

import { CourseSelect } from "./course-select";
import { DeleteDishButton } from "./delete-dish-button";
import { DishRecipe } from "./dish-recipe";
import { EditableCourse } from "./editable-course";
import { EditableName } from "./editable-name";
import { SelectDishStepsButton } from "./select-dish-steps-button";
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

export function DishTable({
  dishes,
  mealId,
}: {
  dishes?: Dish[];
  mealId: number;
}) {
  const { form, onSubmit } = useNewDishForm(mealId);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Recipe</TableHead>
            <TableHead className="w-56" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {dishes?.map((dish) => (
            <TableRow key={dish.id}>
              <TableCell>
                <EditableName
                  name={dish.name}
                  onChange={(newName) => updateDish(dish.id, { name: newName })}
                />
              </TableCell>
              <TableCell>
                <EditableCourse
                  course={dish.course}
                  onChange={(newCourse) =>
                    updateDish(dish.id, { course: newCourse })
                  }
                />
              </TableCell>
              <TableCell>
                <DishRecipe dish={dish} />
              </TableCell>
              <TableCell className="align-bottom">
                <div className="flex gap-2">
                  <DeleteDishButton className="grow" dish={dish} />
                  <SelectDishStepsButton className="grow" dish={dish} />
                </div>
              </TableCell>
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
              <Controller
                control={form.control}
                name="course"
                rules={{ required: true }}
                render={({ field }) => (
                  <CourseSelect
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                )}
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
    </form>
  );
}
