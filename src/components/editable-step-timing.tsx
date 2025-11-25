import { useState } from "react";

import { StepBadge } from "./step-badge";
import { StepSelect } from "./step-select";
import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";

export function EditableStepTiming({
  delayMinutes,
  dishId,
  durationMinutes,
  onChange,
  priorStepId,
}: {
  delayMinutes: number;
  dishId: number;
  durationMinutes: number;
  onChange: (changes: {
    delayMinutes?: number;
    durationMinutes?: number;
    priorStepId?: number | null;
  }) => void;
  priorStepId: number | null;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDelayMinutes, setTempDelayMinutes] = useState(delayMinutes);
  const [tempDurationMinutes, setTempDurationMinutes] =
    useState(durationMinutes);
  const [tempPriorStepId, setTempPriorStepId] = useState(priorStepId);

  const handleCancel = () => {
    setTempDelayMinutes(delayMinutes);
    setTempDurationMinutes(durationMinutes);
    setTempPriorStepId(priorStepId);
    setIsEditing(false);
  };

  const handleCommit = () => {
    onChange({
      delayMinutes: tempDelayMinutes,
      durationMinutes: tempDurationMinutes,
      priorStepId: tempPriorStepId,
    });
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
      <span>after</span>
      <StepSelect
        dishId={dishId}
        onValueChange={setTempPriorStepId}
        value={tempPriorStepId}
      />

      <span>for</span>
      <InputGroup>
        <InputGroupInput
          className="w-42"
          onChange={(e) => setTempDurationMinutes(+e.target.value)}
          type="number"
          value={tempDurationMinutes}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>minutes</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <span>then wait</span>
      <InputGroup>
        <InputGroupInput
          className="w-42"
          onChange={(e) => setTempDelayMinutes(+e.target.value)}
          type="number"
          value={tempDelayMinutes}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>minutes</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <div className="col-span-2 flex gap-2 justify-end">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleCommit}>Save</Button>
      </div>
    </div>
  ) : (
    <div
      className="grid grid-cols-[auto_1fr] gap-2 items-center hover:cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {priorStepId && (
        <>
          <span>after</span>
          <StepBadge id={priorStepId} />
        </>
      )}
      {durationMinutes > 0 && (
        <>
          <span>for</span>
          <span>{durationMinutes} minutes</span>
        </>
      )}
      {delayMinutes > 0 && (
        <>
          <span>then wait</span>
          <span>{delayMinutes} minutes</span>
        </>
      )}
    </div>
  );
}
