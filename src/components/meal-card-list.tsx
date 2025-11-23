import { Plus } from "lucide-react";

import { updateMeal } from "@/api/meals";
import type { Meal } from "@/db";
import { useNewMealForm } from "@/hooks/use-meal-form";

import { EditableDate } from "./editable-date";
import { EditableName } from "./editable-name";
import { SelectMealButton } from "./select-meal-button";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export function MealCardList({ meals }: { meals?: Meal[] }) {
  const { form, onSubmit } = useNewMealForm();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {meals?.map((meal) => (
          <Card key={meal.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <EditableName
                  name={meal.name}
                  onChange={(newName) => updateMeal(meal.id, { name: newName })}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="not-prose text-sm text-muted-foreground">Date</p>
                <p className="not-prose text-base font-medium">
                  <EditableDate
                    date={meal.date}
                    onChange={(newDate) =>
                      updateMeal(meal.id, { date: newDate })
                    }
                  />
                </p>
              </div>
              <SelectMealButton meal={meal} />
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>
              <Input
                placeholder="New meal"
                {...form.register("name", { required: true })}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="not-prose text-sm text-muted-foreground">Date</p>
              <p className="not-prose text-base font-medium">
                <Input
                  type="datetime-local"
                  {...form.register("date", { required: true })}
                />
              </p>
            </div>
            <Button
              className="w-full"
              disabled={!form.formState.isDirty || !form.formState.isValid}
              type="submit"
            >
              <Plus /> Add
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
