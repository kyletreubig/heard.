import { deleteDish } from "@/api/dishes";
import type { Dish } from "@/db";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function DeleteDishButton({
  className,
  dish,
}: {
  className?: string;
  dish: Dish;
}) {
  const handleDelete = () => deleteDish(dish.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn("w-full", className)} variant="outline">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete dish?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{dish.name}"?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
