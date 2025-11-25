import { useMemo } from "react";

import { getColorFromString, getContrastingTextColor } from "@/utils/colors";

import { Badge } from "./ui/badge";

export function StageBadge({ stage }: { stage: string }) {
  const background = useMemo(() => getColorFromString(stage), [stage]);
  const color = useMemo(
    () => getContrastingTextColor(background),
    [background],
  );
  return <Badge style={{ background, color }}>{stage}</Badge>;
}
