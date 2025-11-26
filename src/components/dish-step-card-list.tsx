import { Minus, Plus } from "lucide-react";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { updateStep } from "@/api/steps";
import type { Step } from "@/db";
import { useNewStepForm } from "@/hooks/use-step-form";

import { DeleteStepButton } from "./delete-step-button";
import { EditableEquipment } from "./editable-equipment";
import { EditableName } from "./editable-name";
import { EditableStage } from "./editable-stage";
import { EditableStepTiming } from "./editable-step-timing";
import { EquipmentSelect } from "./equipment-select";
import { StageSelect } from "./stage-select";
import { StepSelect } from "./step-select";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";

export function DishStepCardList({
  dishId,
  mealId,
  steps,
}: {
  dishId: number;
  mealId: number;
  steps?: Step[];
}) {
  const { form, onSubmit } = useNewStepForm({ dishId, mealId });
  const equipment = useFieldArray({ control: form.control, name: "equipment" });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {steps?.map((step) => (
          <Card key={step.id}>
            <CardHeader>
              <CardTitle className="flex gap-2 text-lg">
                <EditableStage
                  onChange={(newStage) =>
                    updateStep(step.id, { stage: newStage })
                  }
                  stage={step.stage}
                />
                <EditableName
                  name={step.description}
                  onChange={(newDescription) =>
                    updateStep(step.id, { description: newDescription })
                  }
                />
              </CardTitle>
              <CardDescription className="flex flex-col gap-2">
                {step.startAt?.toLocaleTimeString()}
                <EditableEquipment
                  equipment={step.equipment}
                  onChange={(newEquipment) =>
                    updateStep(step.id, { equipment: newEquipment })
                  }
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditableStepTiming
                delayMinutes={step.delayMinutes}
                dishId={step.dishId}
                durationMinutes={step.durationMinutes}
                onChange={(changes) => updateStep(step.id, changes)}
                priorStepId={step.priorStepId}
              />
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <DeleteStepButton className="grow" step={step} />
              </div>
            </CardFooter>
          </Card>
        ))}

        <Card className="py-2">
          <CardHeader className="px-2">
            <CardTitle className="flex flex-col gap-2">
              <Input
                className="w-full"
                placeholder="New step"
                {...form.register("description", { required: true })}
              />
              <Controller
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <StageSelect
                    onValueChange={field.onChange}
                    placeholder="Stage..."
                    value={field.value}
                  />
                )}
              />
            </CardTitle>
            <CardDescription>
              <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                {equipment.fields.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Controller
                      control={form.control}
                      name={`equipment.${index}.name`}
                      render={({ field }) => (
                        <EquipmentSelect
                          onValueChange={field.onChange}
                          placeholder="None"
                          value={field.value}
                        />
                      )}
                    />
                    <Button
                      onClick={() => {
                        if (equipment.fields.length === 1) {
                          equipment.update(index, { name: "" });
                        } else {
                          equipment.remove(index);
                        }
                      }}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <Minus />
                    </Button>
                    <Button
                      onClick={() => equipment.append({ name: "" })}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <Plus />
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
              <span>after</span>
              <Controller
                control={form.control}
                name="priorStepId"
                render={({ field }) => (
                  <StepSelect
                    dishId={dishId}
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              <span>for</span>
              <InputGroup>
                <InputGroupInput
                  className="w-42"
                  type="number"
                  {...form.register("durationMinutes", {
                    valueAsNumber: true,
                  })}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>minutes</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <span>then wait</span>
              <InputGroup>
                <InputGroupInput
                  className="w-42"
                  type="number"
                  {...form.register("delayMinutes", { valueAsNumber: true })}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>minutes</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={!form.formState.isDirty || !form.formState.isValid}
              type="submit"
            >
              <Plus /> Add
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
