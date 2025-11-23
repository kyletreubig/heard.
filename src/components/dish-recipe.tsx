import { DialogTitle } from "@radix-ui/react-dialog";
import { Link, NotebookText } from "lucide-react";

import type { Dish } from "@/db";

import { SelectDishRecipeButton } from "./select-dish-recipe-button";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

export function DishRecipe({ dish }: { dish: Dish }) {
  return dish.recipeUrl ? (
    <div className="flex flex-col gap-2">
      <a
        href={dish.recipeUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center px-3 py-2 gap-2 text-sm font-medium text-blue-600 underline"
      >
        <Link className="size-4" /> {dish.recipeUrl.slice(0, 20)}...
      </a>
      <div className="w-full flex justify-end">
        <SelectDishRecipeButton dish={dish} />
      </div>
    </div>
  ) : dish.recipeText ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="ghost">
          <NotebookText /> {dish.recipeText.slice(0, 20)}...
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dish.name}</DialogTitle>
        </DialogHeader>

        {dish.recipeText
          .split("\n")
          .filter((p) => p.trim().length > 0)
          .map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        <DialogFooter>
          <SelectDishRecipeButton dish={dish} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <div className="pl-9 ">
      <div className="flex justify-between items-center gap-2">
        <span>N/A</span>
        <SelectDishRecipeButton dish={dish} />
      </div>
    </div>
  );
}
