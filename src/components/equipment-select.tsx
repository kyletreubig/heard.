import { useId } from "react";

import { useEquipmentList } from "@/api/equipment";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function EquipmentSelect({
  allowClear,
  onValueChange,
  placeholder,
  value,
}: {
  allowClear?: boolean;
  onValueChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const equipmentList = useEquipmentList();

  const clearSelect = useId();
  const handleSelect = (selectedValue: string) => {
    if (selectedValue === clearSelect) {
      onValueChange("");
    } else {
      onValueChange(selectedValue);
    }
  };

  return (
    <Select onValueChange={handleSelect} value={value}>
      <SelectTrigger className="w-42">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {allowClear && (
            <SelectItem value={clearSelect}>All equipment</SelectItem>
          )}
          {equipmentList?.map((equipment) => (
            <SelectItem key={equipment.id} value={equipment.name}>
              {equipment.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
