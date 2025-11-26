import type React from "react";

import { useTimelineFiltersStore } from "@/stores/timeline-filters";

import { DishSelect } from "./dish-select";
import { EquipmentSelect } from "./equipment-select";
import { StageSelect } from "./stage-select";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";

function Filter({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="grid grid-cols-[1fr] md:grid-cols-[80px_224px] gap-4 items-center">
      <Label>{title}</Label>
      {children}
    </div>
  );
}

export function TimelineFilters({ mealId }: { mealId: number }) {
  const filters = useTimelineFiltersStore.use.filters();
  const setFilters = useTimelineFiltersStore.use.setFilters();

  const toggleCompleted = () => {
    let newCompleted: boolean | null;
    if (filters.completed === null) {
      newCompleted = true;
    } else if (filters.completed === true) {
      newCompleted = false;
    } else {
      newCompleted = null;
    }
    setFilters({ ...filters, completed: newCompleted });
  };

  const handleReset = () => {
    setFilters({
      completed: null,
      dishId: null,
      equipment: null,
      stage: null,
    });
  };

  return (
    <Card className="my-4">
      <CardContent className="flex flex-wrap gap-4 justify-between">
        <Filter title="Completed">
          <Button
            onClick={toggleCompleted}
            variant={filters.completed === null ? "outline" : "default"}
          >
            {filters.completed === null
              ? "All"
              : filters.completed
                ? "Only completed"
                : "Only uncompleted"}
          </Button>
        </Filter>

        <Filter title="Dish">
          <DishSelect
            allowClear
            mealId={mealId}
            placeholder="All dishes"
            value={filters.dishId}
            onValueChange={(value) => {
              setFilters({ ...filters, dishId: value });
            }}
          />
        </Filter>

        <Filter title="Stage">
          <StageSelect
            allowClear
            fixed
            mealId={mealId}
            placeholder="All stages"
            value={filters.stage ?? ""}
            onValueChange={(value) => {
              setFilters({ ...filters, stage: value || null });
            }}
          />
        </Filter>

        <Filter title="Equipment">
          <EquipmentSelect
            allowClear
            placeholder="All equipment"
            value={filters.equipment ?? ""}
            onValueChange={(value) => {
              setFilters({ ...filters, equipment: value || null });
            }}
          />
        </Filter>
      </CardContent>
      <CardFooter>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
