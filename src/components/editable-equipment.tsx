import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

import { EquipmentBadge } from "./equipment-badge";
import { EquipmentSelect } from "./equipment-select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EditableEquipment({
  equipment,
  onChange,
}: {
  equipment: string[];
  onChange: (newEquipment: string[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempEquipment, setTempEquipment] = useState(equipment);

  const handleChange = (index: number) => (newValue: string) => {
    const updatedEquipment = [...tempEquipment];
    updatedEquipment[index] = newValue;
    setTempEquipment(updatedEquipment);
  };

  const handleRemove = (index: number) => () => {
    const updatedEquipment = tempEquipment.filter((_, i) => i !== index);
    if (updatedEquipment.length === 0) {
      updatedEquipment.push("");
    }
    setTempEquipment(updatedEquipment);
  };

  const handleAppend = () => {
    setTempEquipment([...tempEquipment, ""]);
  };

  const handleCancel = () => {
    setTempEquipment(equipment);
    setIsEditing(false);
  };

  const handleCommit = () => {
    onChange(tempEquipment);
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
      {tempEquipment.map((item, index) => (
        <React.Fragment key={index}>
          <EquipmentSelect
            onValueChange={handleChange(index)}
            placeholder="None"
            value={item}
          />
          <Button onClick={handleRemove(index)} size="icon" variant="outline">
            <Minus />
          </Button>
          <Button onClick={handleAppend} size="icon" variant="outline">
            <Plus />
          </Button>
        </React.Fragment>
      ))}

      <div className="col-span-3 flex gap-2 justify-end">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleCommit}>Save</Button>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-wrap gap-2 hover:cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {equipment
        .filter((e) => e)
        .map((item) => (
          <EquipmentBadge key={item} name={item} />
        ))}
      {equipment.filter((e) => e).length === 0 && (
        <Badge variant="outline">None</Badge>
      )}
    </div>
  );
}
