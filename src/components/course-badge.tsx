import { useMemo } from "react";

import { getColorFromString, getContrastingTextColor } from "@/utils/colors";

import { Badge } from "./ui/badge";

export function CourseBadge({ course }: { course: string }) {
  const background = useMemo(() => getColorFromString(course), [course]);
  const color = useMemo(
    () => getContrastingTextColor(background),
    [background],
  );
  return <Badge style={{ background, color }}>{course}</Badge>;
}
