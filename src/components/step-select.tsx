import { useId } from "react";

import { useDishStepList } from "@/api/steps";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function StepSelect({
  dishId,
  onValueChange,
  placeholder,
  value,
}: {
  dishId: number;
  onValueChange: (value: number | null) => void;
  placeholder?: string;
  value: number | null;
}) {
  const stepList = useDishStepList(dishId, true);

  const clearSelect = useId();
  const handleSelect = (selectedValue: string) => {
    if (selectedValue === clearSelect) {
      onValueChange(null);
    } else {
      onValueChange(Number.parseInt(selectedValue));
    }
  };

  return (
    <Select
      disabled={stepList?.length === 0}
      onValueChange={handleSelect}
      value={String(value ?? "")}
    >
      <SelectTrigger className="w-42">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {stepList?.map((step) => (
            <SelectItem key={step.id} value={String(step.id)}>
              {step.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
