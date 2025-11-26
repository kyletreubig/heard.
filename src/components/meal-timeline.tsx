import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import { useMemo, useState } from "react";

import { useMealStepList } from "@/api/steps";
import type { Meal } from "@/db";
import { useTimelineFiltersStore } from "@/stores/timeline-filters";
import { filterTimeline } from "@/utils/timeline";

import { MealTimelineTable } from "./meal-timeline-table";
import { TimelineFilters } from "./timeline-filters";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function MealTimeline({ meal }: { meal: Meal }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const steps = useMealStepList(meal.id);
  const filters = useTimelineFiltersStore.use.filters();
  const filteredSteps = useMemo(
    () => filterTimeline(steps ?? [], filters),
    [steps, filters],
  );

  return (
    <Collapsible onOpenChange={setFiltersOpen} open={filtersOpen}>
      <h3 className="flex justify-between items-center">
        <span>Timeline</span>

        <CollapsibleTrigger asChild>
          <Button variant="outline">
            <Filter /> Filter {filtersOpen ? <ChevronDown /> : <ChevronRight />}
          </Button>
        </CollapsibleTrigger>
      </h3>

      <CollapsibleContent>
        <TimelineFilters mealId={meal.id} />
      </CollapsibleContent>

      <div className="hidden md:block">
        <MealTimelineTable steps={filteredSteps} />
      </div>
    </Collapsible>
  );
}
