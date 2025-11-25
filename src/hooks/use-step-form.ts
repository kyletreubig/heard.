import { useForm } from "react-hook-form";

import { addStep, updateStep } from "@/api/steps";
import type { Step } from "@/db";

export type StepInputs = Omit<Step, "equipment"> & {
  equipment: { name: string }[];
};

export type NewStepInputs = Omit<StepInputs, "id">;

export function useNewStepForm({
  dishId,
  mealId,
}: {
  dishId: number;
  mealId: number;
}) {
  const form = useForm<NewStepInputs>({
    defaultValues: {
      mealId,
      dishId,
      description: "",
      stage: "",
      equipment: [{ name: "" }],
      offsetMinutes: 0,
      delayMinutes: 0,
      durationMinutes: 0,
    },
  });
  const onSubmit = ({ equipment, ...step }: NewStepInputs) =>
    addStep({ equipment: equipment.map((e) => e.name), ...step }).then(() =>
      form.reset(),
    );
  return { form, onSubmit };
}

export function useEditStepForm({ equipment, ...defaultValues }: Step) {
  const form = useForm<StepInputs>({
    defaultValues: {
      equipment: equipment.map((name) => ({ name })),
      ...defaultValues,
    },
  });
  const onSubmit = ({ equipment, id, ...step }: StepInputs) =>
    updateStep(id, { equipment: equipment.map((e) => e.name), ...step }).then(
      () => form.reset({ id, ...step }),
    );
  return { form, onSubmit };
}
