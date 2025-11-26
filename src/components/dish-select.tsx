import { useId } from "react";

import { useDishList } from "@/api/dishes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function DishSelect({
  allowClear,
  mealId,
  onValueChange,
  placeholder,
  value,
}: {
  allowClear?: boolean;
  mealId: number;
  onValueChange: (value: number | null) => void;
  placeholder?: string;
  value: number | null;
}) {
  const dishList = useDishList(mealId);

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
      disabled={dishList?.length === 0}
      onValueChange={handleSelect}
      value={String(value ?? "")}
    >
      <SelectTrigger className="w-56">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {allowClear && (
            <SelectItem value={clearSelect}>All dishes</SelectItem>
          )}
          {dishList?.map((dish) => (
            <SelectItem key={dish.id} value={String(dish.id)}>
              {dish.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
