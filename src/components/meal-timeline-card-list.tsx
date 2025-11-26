import React, { useEffect, useState } from "react";

import { updateStep } from "@/api/steps";
import type { Step } from "@/db";
import { cn } from "@/lib/utils";

import { DishBadge } from "./dish-badge";
import { EquipmentBadge } from "./equipment-badge";
import { StageBadge } from "./stage-badge";
import { StepComplete } from "./step-complete";
import { StepStartAt } from "./step-start-at";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function MealTimelineCardList({ steps }: { steps?: Step[] }) {
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
    <div className="space-y-4">
      {steps?.map((step, index) => (
        <React.Fragment key={step.id}>
          <Card
            className={cn(
              isOverdue(step) && "bg-red-100 border-red-300",
              step.completedAt && "bg-green-50 border-green-300",
              isNext(index) && "bg-blue-50 border-blue-300",
            )}
          >
            <CardHeader>
              <CardTitle className="flex flex-col gap-2 text-lg">
                <div className="flex items-center justify-between">
                  <StepStartAt
                    onOffsetMinutesChange={(offsetMinutes) =>
                      updateStep(step.id, { offsetMinutes })
                    }
                    step={step}
                  />
                  <StepComplete
                    onCompleteChange={(completedAt) =>
                      updateStep(step.id, { completedAt })
                    }
                    step={step}
                  />
                </div>

                <span>{step.description}</span>
              </CardTitle>

              <CardDescription className="flex flex-wrap gap-2">
                <StageBadge stage={step.stage} />
                <DishBadge id={step.dishId} />
                {step.equipment
                  .filter((e) => e)
                  .map((item) => (
                    <EquipmentBadge key={item} name={item} />
                  ))}
              </CardDescription>
            </CardHeader>
          </Card>

          {isMostRecent(index) && (
            <div className="h-2 rounded-full w-full bg-blue-500" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
