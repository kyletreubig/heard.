import { useDishSelectionStore } from "@/stores/dish-selection";
import { useMealSelectionStore } from "@/stores/meal-selection";
import {
  useMealTabSelectionStore,
  type MealTabType,
} from "@/stores/meal-tab-selection";

import { DishList } from "./dish-list";
import { MealList } from "./meal-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UnselectDishButton } from "./unselect-dish-button";
import { UnselectMealButton } from "./unselect-meal-button";

export function MealTab() {
  const selectedMeal = useMealSelectionStore.use.selectedMeal();
  const selectedDish = useDishSelectionStore.use.selectedDish();

  const selectedTab = useMealTabSelectionStore.use.selectedTab();
  const setSelectedTab = useMealTabSelectionStore.use.setSelectedTab();

  return (
    <div className="p-4 border rounded shadow">
      {selectedDish ? (
        <h2 className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <UnselectDishButton /> {selectedDish.name}
          </div>
        </h2>
      ) : selectedMeal ? (
        <Tabs
          onValueChange={(t) => setSelectedTab(t as MealTabType)}
          value={selectedTab}
        >
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

          <TabsContent value="dishes">
            <DishList meal={selectedMeal} />
          </TabsContent>
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
