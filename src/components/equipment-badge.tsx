import { useMemo } from "react";

import { getColorFromString } from "@/utils/colors";

import { Badge } from "./ui/badge";

export function EquipmentBadge({ name }: { name: string }) {
  const borderColor = useMemo(() => getColorFromString(name), [name]);
  return (
    <Badge className="border-x-4" style={{ borderColor }} variant="outline">
      {name}
    </Badge>
  );
}
