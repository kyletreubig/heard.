import { useState } from "react";

import { Input } from "./ui/input";

export function EditableName({
  name,
  onChange,
}: {
  name: string;
  onChange: (newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempName !== name) {
      onChange(tempName);
    }
  };

  return isEditing ? (
    <Input
      autoFocus
      onBlur={handleBlur}
      onChange={(e) => setTempName(e.target.value)}
      value={tempName}
    />
  ) : (
    <span className="hover:cursor-text" onClick={() => setIsEditing(true)}>
      {name}
    </span>
  );
}
