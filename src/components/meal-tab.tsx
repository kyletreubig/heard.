import { useMealSelectionStore } from "@/stores/meal-selection";

import { MealList } from "./meal-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UnselectMealButton } from "./unselect-meal-button";

export function MealTab() {
  const selectedMeal = useMealSelectionStore.use.selectedMeal();

  return (
    <div className="p-4 border rounded shadow">
      {selectedMeal ? (
        <Tabs defaultValue="timeline">
          <h2 className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <UnselectMealButton /> {selectedMeal.name}
            </div>
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="dishes">Dishes</TabsTrigger>
            </TabsList>
          </h2>

          <TabsContent value="timeline">Timeline</TabsContent>

          <TabsContent value="dishes">Dishes</TabsContent>
        </Tabs>
      ) : (
        <>
          <h2>Meals</h2>
          <MealList />
        </>
      )}
    </div>
  );
}
