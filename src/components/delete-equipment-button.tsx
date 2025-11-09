import { deleteEquipment } from "@/api/equipment";
import type { Equipment } from "@/db";
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

export function DeleteEquipmentButton({
  className,
  equipment,
}: {
  className?: string;
  equipment: Equipment;
}) {
  const handleDelete = () => deleteEquipment(equipment.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn("w-full", className)} variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete equipment?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{equipment.name}"?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
