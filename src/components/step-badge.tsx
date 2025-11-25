import { useMemo } from "react";

import { useStep } from "@/api/steps";

import { Badge } from "./ui/badge";

export function StepBadge({ id }: { id: number }) {
  const step = useStep(id);
  const text = useMemo(() => {
    if (!step) return "...";
    if (step.description.length <= 30) return step.description;
    return step.description.slice(0, 30) + "...";
  }, [step]);
  return <Badge variant="outline">{text}</Badge>;
}
