import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { addMeal, updateMeal, useMealList } from "@/api/meals";
import type { Meal } from "@/db";
import { toDatetimeLocalString } from "@/utils/dates";

import { EditableDate } from "./editable-date";
import { EditableName } from "./editable-name";
import { SelectMealButton } from "./select-meal-button";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Inputs = Omit<Meal, "id" | "date"> & {
  date: string;
};

export function MealList() {
  const meals = useMealList();

  const form = useForm<Inputs>({
    defaultValues: { name: "", date: toDatetimeLocalString(new Date()) },
  });
  const onSubmit = ({ date, ...inputs }: Inputs) =>
    addMeal({ date: new Date(date), ...inputs }).then(() => form.reset());

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="hidden md:block">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals?.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell>
                  <EditableName
                    name={meal.name}
                    onChange={(newName) =>
                      updateMeal(meal.id, { name: newName })
                    }
                  />
                </TableCell>
                <TableCell>
                  <EditableDate
                    date={meal.date}
                    onChange={(newDate) =>
                      updateMeal(meal.id, { date: newDate })
                    }
                  />
                </TableCell>
                <TableCell>
                  <SelectMealButton meal={meal} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Input
                  placeholder="New meal"
                  {...form.register("name", { required: true })}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="datetime-local"
                  {...form.register("date", { required: true })}
                />
              </TableCell>
              <TableCell>
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

      <div className="md:hidden mt-4 space-y-4">
        {meals?.map((meal) => (
          <Card key={meal.id}>
            <CardHeader>
              <CardTitle className="text-lg">{meal.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="not-prose text-sm text-muted-foreground">Date</p>
                <p className="not-prose text-base font-medium">
                  {meal.date.toLocaleString()}
                </p>
              </div>
              <SelectMealButton meal={meal} />
            </CardContent>
          </Card>
        ))}
      </div>
    </form>
  );
}
