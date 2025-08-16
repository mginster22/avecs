"use client";
import React from "react";

interface Props {
  className?: string;
}
const students = [
  { name: "Влад", subjects: ["Math", "Physics"], age: 20 },
  { name: "Аня", subjects: ["Biology", "Chemistry"], age: 22 },
  { name: "Игорь", subjects: ["Math", "Biology"], age: 21 },
  { name: "Оля", subjects: ["Physics"], age: 23 },
];
export const Testove: React.FC<Props> = ({ className }) => {
  const newStudents = function () {
    for (const [key, val] of Object.entries(students))
      console.log(`${key} + ${val}`);
    return true;
  };
  return <div className={className}>{newStudents()}</div>;
};
