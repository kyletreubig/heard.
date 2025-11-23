import { useForm } from "react-hook-form";

import { addEquipment } from "@/api/equipment";
import type { Equipment } from "@/db";

export type NewEquipmentInputs = Omit<Equipment, "id">;

export function useNewEquipmentForm() {
  const form = useForm<NewEquipmentInputs>({
    defaultValues: { name: "" },
  });
  const onSubmit = ({ name }: NewEquipmentInputs) =>
    addEquipment(name).then(() => form.reset());
  return { form, onSubmit };
}
