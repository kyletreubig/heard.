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
          <h2 className="flex flex-col md:flex-row justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <UnselectMealButton /> {selectedMeal.name}
            </div>
            <div className="flex w-full justify-end md:w-auto">
              <TabsList>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="dishes">Dishes</TabsTrigger>
              </TabsList>
            </div>
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
