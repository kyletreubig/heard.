import { Trash2 } from "lucide-react";

import { deleteStep } from "@/api/steps";
import type { Step } from "@/db";

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

export function DeleteStepButton({
  className,
  step,
}: {
  className?: string;
  step: Step;
}) {
  const handleDelete = () => deleteStep(step.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} variant="outline">
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete dish?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{step.description}"?
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
