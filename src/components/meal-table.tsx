import { Plus } from "lucide-react";

import { updateMeal } from "@/api/meals";
import type { Meal } from "@/db";
import { useNewMealForm } from "@/hooks/use-meal-form";

import { EditableDate } from "./editable-date";
import { EditableName } from "./editable-name";
import { SelectMealButton } from "./select-meal-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function MealTable({ meals }: { meals?: Meal[] }) {
  const { form, onSubmit } = useNewMealForm();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  onChange={(newName) => updateMeal(meal.id, { name: newName })}
                />
              </TableCell>
              <TableCell>
                <EditableDate
                  date={meal.date}
                  onChange={(newDate) => updateMeal(meal.id, { date: newDate })}
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
    </form>
  );
}
