import { useEffect, useState } from "react";

import type { Step } from "@/db";
import { toDatetimeLocalString } from "@/utils/dates";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export function StepStartAt({
  onOffsetMinutesChange,
  step,
}: {
  onOffsetMinutesChange: (offsetMinutes: number) => void;
  step: Step;
}) {
  const [open, setOpen] = useState(false);
  const [tempStartAt, setTempStartAt] = useState(
    toDatetimeLocalString(step.startAt ?? new Date()),
  );
  useEffect(
    () => setTempStartAt(toDatetimeLocalString(step.startAt ?? new Date())),
    [step.startAt],
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setTempStartAt(toDatetimeLocalString(step.startAt ?? new Date()));
  };

  const handleReset = () => {
    onOffsetMinutesChange(0);
  };

  const handleAdjust = () => {
    const desiredStartAt = new Date(tempStartAt);
    if (step.startAt) {
      const offsetMinutes = Math.round(
        (step.startAt.getTime() - desiredStartAt.getTime()) / (60 * 1000),
      );
      onOffsetMinutesChange(offsetMinutes);
    }
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <span className="hover:cursor-pointer">
          {step.startAt?.toLocaleTimeString()}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Start Step At</DialogHeader>

        <Input
          onChange={(e) => setTempStartAt(e.target.value)}
          tabIndex={-1}
          type="datetime-local"
          value={tempStartAt}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button
            disabled={step.offsetMinutes === 0}
            onClick={handleReset}
            variant="outline"
          >
            Reset
          </Button>

          <Button onClick={handleAdjust}>Adjust</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
