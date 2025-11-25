import { useState } from "react";

import { StageBadge } from "./stage-badge";
import { StageSelect } from "./stage-select";

export function EditableStage({
  onChange,
  stage,
}: {
  onChange: (newStage: string) => void;
  stage: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStage, setTempStage] = useState(stage);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempStage !== stage) {
      onChange(tempStage);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setTempStage(stage);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <StageSelect
      autoFocus
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onValueChange={setTempStage}
      value={tempStage}
    />
  ) : (
    <span className="hover:cursor-pointer" onClick={() => setIsEditing(true)}>
      <StageBadge stage={stage} />
    </span>
  );
}
