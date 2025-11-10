import { SelectGroup } from "@radix-ui/react-select";
import { useId, useMemo } from "react";

import { useCourseList } from "@/api/courses";

import { AutoComplete } from "./ui/autocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function CourseSelect({
  allowClear,
  autoFocus,
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
  fixed?: boolean;
  mealId?: number;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const courseList = useCourseList(mealId);
  const items = useMemo(() => {
    const items = courseList
      ? courseList
          .filter((course) =>
            course.toLowerCase().includes(value.toLowerCase()),
          )
          .map((course) => ({ value: course, label: course }))
      : [];
    if (value && !items.find((item) => item.value === value)) {
      return [{ value, label: value }, ...items];
    }
    return items;
  }, [courseList, value]);

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
            <SelectItem value={clearSelect}>All courses</SelectItem>
          )}
          {courseList?.map((course) => (
            <SelectItem key={course} value={course}>
              {course}
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
