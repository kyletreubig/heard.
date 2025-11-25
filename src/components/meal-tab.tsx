import { useDishSelectionStore } from "@/stores/dish-selection";
import {
  useDishTabSelectionStore,
  type DishTabType,
} from "@/stores/dish-tab-selection";
import { useMealSelectionStore } from "@/stores/meal-selection";
import {
  useMealTabSelectionStore,
  type MealTabType,
} from "@/stores/meal-tab-selection";

import { DishList } from "./dish-list";
import { DishRecipeTab } from "./dish-recipe-tab";
import { DishStepList } from "./dish-step-list";
import { MealList } from "./meal-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UnselectDishButton } from "./unselect-dish-button";
import { UnselectMealButton } from "./unselect-meal-button";

export function MealTab() {
  const selectedMeal = useMealSelectionStore.use.selectedMeal();
  const selectedDish = useDishSelectionStore.use.selectedDish();

  const selectedMealTab = useMealTabSelectionStore.use.selectedTab();
  const setSelectedMealTab = useMealTabSelectionStore.use.setSelectedTab();

  const selectedDishTab = useDishTabSelectionStore.use.selectedTab();
  const setSelectedDishTab = useDishTabSelectionStore.use.setSelectedTab();

  return (
    <div className="p-4 border rounded shadow">
      {selectedDish ? (
        <Tabs
          onValueChange={(t) => setSelectedDishTab(t as DishTabType)}
          value={selectedDishTab}
        >
          <h2 className="flex flex-col md:flex-row justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <UnselectDishButton /> {selectedDish.name}
            </div>
            <div className="flex w-full justify-end md:w-auto">
              <TabsList>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="recipe">Recipe</TabsTrigger>
              </TabsList>
            </div>
          </h2>

          <TabsContent value="steps">
            <DishStepList dish={selectedDish} />
          </TabsContent>

          <TabsContent value="recipe">
            <DishRecipeTab dish={selectedDish} />
          </TabsContent>
        </Tabs>
      ) : selectedMeal ? (
        <Tabs
          onValueChange={(t) => setSelectedMealTab(t as MealTabType)}
          value={selectedMealTab}
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
