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
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function DishStepTable({
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
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>At</TableHead>
            <TableHead className="w-0">Timing</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-0">Stage</TableHead>
            <TableHead className="w-0">Equipment</TableHead>
            <TableHead className="w-56" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {steps?.map((step) => (
            <TableRow key={step.id}>
              <TableCell>{step.startAt?.toLocaleTimeString()}</TableCell>
              <TableCell>
                <EditableStepTiming
                  delayMinutes={step.delayMinutes}
                  dishId={step.dishId}
                  durationMinutes={step.durationMinutes}
                  onChange={(changes) => updateStep(step.id, changes)}
                  priorStepId={step.priorStepId}
                />
              </TableCell>
              <TableCell>
                <EditableName
                  name={step.description}
                  onChange={(newDescription) =>
                    updateStep(step.id, { description: newDescription })
                  }
                />
              </TableCell>
              <TableCell>
                <EditableStage
                  onChange={(newStage) =>
                    updateStep(step.id, { stage: newStage })
                  }
                  stage={step.stage}
                />
              </TableCell>
              <TableCell>
                <EditableEquipment
                  equipment={step.equipment}
                  onChange={(newEquipment) =>
                    updateStep(step.id, { equipment: newEquipment })
                  }
                />
              </TableCell>
              <TableCell>
                <DeleteStepButton className="w-full" step={step} />
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell />
            <TableCell>
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
            </TableCell>
            <TableCell className="align-top">
              <Input
                placeholder="New step"
                {...form.register("description", { required: true })}
              />
            </TableCell>
            <TableCell className="align-top">
              <Controller
                control={form.control}
                name="stage"
                rules={{ required: true }}
                render={({ field }) => (
                  <StageSelect
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </TableCell>
            <TableCell className="align-top">
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
            </TableCell>
            <TableCell className="align-top">
              <Button
                className="w-full"
                disabled={!form.formState.isDirty || !form.formState.isValid}
                type="submit"
              >
                <Plus /> Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
