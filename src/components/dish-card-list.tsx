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
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Textarea } from "./ui/textarea";

export function DishCardList({
  dishes,
  mealId,
}: {
  dishes?: Dish[];
  mealId: number;
}) {
  const { form, onSubmit } = useNewDishForm(mealId);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {dishes?.map((dish) => (
          <Card key={dish.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <EditableName
                  name={dish.name}
                  onChange={(newName) => updateDish(dish.id, { name: newName })}
                />
              </CardTitle>
              <CardDescription>
                <EditableCourse
                  course={dish.course}
                  onChange={(newCourse) =>
                    updateDish(dish.id, { course: newCourse })
                  }
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DishRecipe dish={dish} />
            </CardContent>
            <CardFooter>
              <DeleteDishButton dish={dish} />
            </CardFooter>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>
              <Input
                placeholder="New dish"
                {...form.register("name", { required: true })}
              />
            </CardTitle>
            <CardDescription>
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
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={!form.formState.isDirty || !form.formState.isValid}
              type="submit"
            >
              <Plus /> Add
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
