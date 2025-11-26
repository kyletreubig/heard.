import { useEffect, useState } from "react";

import { updateStep } from "@/api/steps";
import type { Step } from "@/db";
import { cn } from "@/lib/utils";

import { DishBadge } from "./dish-badge";
import { EquipmentBadge } from "./equipment-badge";
import { StageBadge } from "./stage-badge";
import { StepComplete } from "./step-complete";
import { StepStartAt } from "./step-start-at";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function MealTimelineTable({ steps }: { steps?: Step[] }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };
    const reg = setInterval(updateCurrentTime, 60 * 1000); // Every minute
    return () => clearInterval(reg);
  }, [setCurrentTime]);

  const isOverdue = (step: Step) => {
    if (step.completedAt) return false;
    if (!step.startAt) return false;
    return step.startAt.getTime() < currentTime.getTime();
  };

  const isMostRecent = (index: number) => {
    const step = steps?.[index];
    const nextStep = steps?.[index + 1];
    if (!step?.startAt) return false;
    if (step.startAt.getTime() > currentTime.getTime()) return false;
    if (!nextStep?.startAt) return true;
    if (nextStep.startAt.getTime() > currentTime.getTime()) return true;
    return false;
  };

  const isNext = (index: number) => {
    const step = steps?.[index];
    const prevStep = steps?.[index - 1];
    if (!step?.startAt) return false;
    if (step.startAt.getTime() < currentTime.getTime()) return false;
    if (prevStep?.startAt && prevStep.startAt.getTime() < currentTime.getTime())
      return true;
    return false;
  };

  return (
    <Table className="table-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Completed?</TableHead>
          <TableHead>At</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Dish</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Equipment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steps?.map((step, index) => (
          <TableRow
            className={cn(
              isMostRecent(index) && "border-b-4 border-blue-500",
              isOverdue(step) && "bg-red-100",
              step.completedAt && "bg-green-50",
              isNext(index) && "bg-blue-50",
            )}
            key={step.id}
          >
            <TableCell>
              <StepComplete
                onCompleteChange={(completedAt) =>
                  updateStep(step.id, { completedAt })
                }
                step={step}
              />
            </TableCell>
            <TableCell>
              <StepStartAt
                onOffsetMinutesChange={(offsetMinutes) =>
                  updateStep(step.id, { offsetMinutes })
                }
                step={step}
              />
            </TableCell>
            <TableCell>{step.description}</TableCell>
            <TableCell>
              <DishBadge id={step.dishId} />
            </TableCell>
            <TableCell>
              <StageBadge stage={step.stage} />
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                {step.equipment
                  .filter((e) => e)
                  .map((item) => (
                    <EquipmentBadge key={item} name={item} />
                  ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
