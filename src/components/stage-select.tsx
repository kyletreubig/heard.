import { useId, useMemo } from "react";

import { useStageList } from "@/api/stages";

import { AutoComplete } from "./ui/autocomplete";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function StageSelect({
  allowClear,
  autoFocus,
  dishId,
  fixed,
  mealId,
  onBlur,
  onKeyDown,
  onValueChange,
  placeholder,
  value,
}: {
  allowClear?: boolean;
  autoFocus?: boolean;
  dishId?: number;
  fixed?: boolean;
  mealId?: number;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const stageList = useStageList({ dishId, mealId });
  const items = useMemo(() => {
    const items = stageList
      ? stageList
          .filter((stage) => stage.toLowerCase().includes(value.toLowerCase()))
          .map((stage) => ({ value: stage, label: stage }))
      : [];
    if (value && !items.find((item) => item.value === value)) {
      return [{ value, label: value }, ...items];
    }
    return items;
  }, [stageList, value]);

  const clearSelect = useId();
  const handleFixedSelect = (selectedValue: string) => {
    if (selectedValue === clearSelect) {
      onValueChange("");
    } else {
      onValueChange(selectedValue);
    }
  };

  return fixed ? (
    <Select onValueChange={handleFixedSelect} value={value}>
      <SelectTrigger className="w-42">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {allowClear && (
            <SelectItem value={clearSelect}>All stages</SelectItem>
          )}
          {stageList?.map((stage) => (
            <SelectItem key={stage} value={stage}>
              {stage}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <AutoComplete
      autoFocus={autoFocus}
      items={items}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onSearchValueChange={onValueChange}
      onSelectedValueChange={onValueChange}
      placeholder={placeholder}
      searchValue={value}
      selectedValue={value}
    />
  );
}
