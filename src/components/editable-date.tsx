import { useState } from "react";

import { toDatetimeLocalString } from "@/utils/dates";

import { Input } from "./ui/input";

export function EditableDate({
  date,
  onChange,
}: {
  date: Date;
  onChange: (newDate: Date) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(date);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempDate.getTime() !== date.getTime()) {
      onChange(tempDate);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setTempDate(date);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <Input
      autoFocus
      onBlur={handleBlur}
      onChange={(e) => setTempDate(new Date(e.target.value))}
      onKeyDown={handleKeyDown}
      type="datetime-local"
      value={toDatetimeLocalString(tempDate)}
    />
  ) : (
    <span className="hover:cursor-pointer" onClick={() => setIsEditing(true)}>
      {date.toLocaleString()}
    </span>
  );
}
