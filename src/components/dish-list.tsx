import { Link, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { addDish, updateDish, useDishList } from "@/api/dishes";
import type { Dish, Meal } from "@/db";

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
  const [filterCourse, setFilterCourse] = useState("");
  const allDishes = useDishList(meal.id);
  const dishes = useMemo(() => {
    if (!allDishes) return [];
    if (!filterCourse) return allDishes;
    return allDishes.filter(
      (dish) => dish.course.toLowerCase() === filterCourse.toLowerCase(),
    );
  }, [filterCourse, allDishes]);

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
    <>
      <h3 className="flex justify-between items-center">
        <span>Dishes</span>
        <CourseSelect
          allowClear
          fixed
          mealId={meal.id}
          placeholder="Filter by course"
          onValueChange={setFilterCourse}
          value={filterCourse}
        />
      </h3>
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
                  <TableCell>
                    <EditableName
                      name={dish.name}
                      onChange={(newName) =>
                        updateDish(dish.id, { name: newName })
                      }
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
                  <TableCell>
                    <DeleteDishButton dish={dish} />
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
                    disabled={
                      !form.formState.isDirty || !form.formState.isValid
                    }
                    type="submit"
                  >
                    <Plus /> Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden mt-4 space-y-4">
          {dishes?.map((dish) => (
            <Card key={dish.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  <EditableName
                    name={dish.name}
                    onChange={(newName) =>
                      updateDish(dish.id, { name: newName })
                    }
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
    </>
  );
}
