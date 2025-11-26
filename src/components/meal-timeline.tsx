import { ChevronRight, Filter } from "lucide-react";

import { useMealStepList } from "@/api/steps";
import type { Meal } from "@/db";

import { MealTimelineTable } from "./meal-timeline-table";
import { Button } from "./ui/button";

export function MealTimeline({ meal }: { meal: Meal }) {
  const steps = useMealStepList(meal.id);

  return (
    <>
      <h3 className="flex justify-between items-center">
        <span>Timeline</span>

        <Button variant="outline">
          <Filter /> Filter <ChevronRight />
        </Button>
      </h3>

      <div className="hidden md:block">
        <MealTimelineTable steps={steps} />
      </div>
    </>
  );
}
