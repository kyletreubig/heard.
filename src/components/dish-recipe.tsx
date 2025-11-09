import { DialogTitle } from "@radix-ui/react-dialog";
import { Link } from "lucide-react";

import type { Dish } from "@/db";

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
    <a
      href={dish.recipeUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-2 text-blue-600 underline"
    >
      <Link className="size-4" /> Link
    </a>
  ) : dish.recipeText ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="ghost">
          {dish.recipeText.slice(0, 20)}...
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
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <span>N/A</span>
  );
}
