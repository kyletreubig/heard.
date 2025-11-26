import { useId, useState } from "react";

import type { Step } from "@/db";
import { toDatetimeLocalString } from "@/utils/dates";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function StepComplete({
  onCompleteChange,
  step,
}: {
  onCompleteChange: (completedAt: Date | null) => void;
  step: Step;
}) {
  const id = useId();
  const completed = !!step.completedAt;

  const [open, setOpened] = useState(false);
  const [tempCompletedAt, setTempCompletedAt] = useState(
    toDatetimeLocalString(step.completedAt ?? new Date()),
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpened(isOpen);
    setTempCompletedAt(toDatetimeLocalString(step.completedAt ?? new Date()));
  };

  const handleComplete = () => {
    if (!step.completedAt) {
      onCompleteChange(new Date());
    }
  };

  const handleUncomplete = () => {
    onCompleteChange(null);
  };

  const handleUpdate = () => {
    onCompleteChange(new Date(tempCompletedAt));
    setOpened(false);
  };

  return (
    <div className="flex items-center gap-2">
      {completed ? (
        <>
          <Checkbox checked={true} />
          <Dialog onOpenChange={handleOpenChange} open={open}>
            <DialogTrigger asChild>
              <Label className="hover:cursor-pointer">
                {step.completedAt?.toLocaleTimeString()}
              </Label>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Step Completed</DialogHeader>

              <Input
                onChange={(e) => setTempCompletedAt(e.target.value)}
                type="datetime-local"
                value={tempCompletedAt}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button onClick={handleUncomplete} variant="outline">
                  Mark uncompleted
                </Button>
                <Button onClick={handleUpdate}>Update</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Checkbox checked={false} id={id} onCheckedChange={handleComplete} />
          <Label className="hover:cursor-pointer" htmlFor={id}>
            complete?
          </Label>
        </>
      )}
    </div>
  );
}
