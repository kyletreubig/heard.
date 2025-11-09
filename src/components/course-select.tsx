import { useMemo } from "react";

import { useCourseList } from "@/api/courses";

import { AutoComplete } from "./ui/autocomplete";

export function CourseSelect({
  autoFocus,
  mealId,
  onBlur,
  onKeyDown,
  onValueChange,
  value,
}: {
  autoFocus?: boolean;
  mealId?: number;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onValueChange: (value: string) => void;
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

  return (
    <AutoComplete
      autoFocus={autoFocus}
      items={items}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onSearchValueChange={onValueChange}
      onSelectedValueChange={onValueChange}
      searchValue={value}
      selectedValue={value}
    />
  );
}
