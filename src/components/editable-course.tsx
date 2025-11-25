import { useState } from "react";

import { CourseBadge } from "./course-badge";
import { CourseSelect } from "./course-select";

export function EditableCourse({
  course,
  onChange,
}: {
  course: string;
  onChange: (newCourse: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempCourse, setTempCourse] = useState(course);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempCourse !== course) {
      onChange(tempCourse);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setTempCourse(course);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <CourseSelect
      autoFocus
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onValueChange={setTempCourse}
      value={tempCourse}
    />
  ) : (
    <span className="hover:cursor-pointer" onClick={() => setIsEditing(true)}>
      <CourseBadge course={course} />
    </span>
  );
}
