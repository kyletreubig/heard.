import { useMemo } from "react";

import { getColorFromString, getContrastingTextColor } from "@/utils/colors";

import { Badge } from "./ui/badge";

export function EquipmentBadge({ name }: { name: string }) {
  const background = useMemo(() => getColorFromString(name), [name]);
  const color = useMemo(
    () => getContrastingTextColor(background),
    [background],
  );
  return <Badge style={{ background, color }}>{name}</Badge>;
}
