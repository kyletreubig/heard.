import { useMemo } from "react";

import { useDish } from "@/api/dishes";
import { getColorFromString, getContrastingTextColor } from "@/utils/colors";

import { Badge } from "./ui/badge";

export function DishBadge({ id }: { id: number }) {
  const dish = useDish(id);
  const text = dish?.name ?? "...";
  const background = useMemo(() => getColorFromString(text), [text]);
  const color = useMemo(
    () => getContrastingTextColor(background),
    [background],
  );
  return <Badge style={{ background, color }}>{text}</Badge>;
}
