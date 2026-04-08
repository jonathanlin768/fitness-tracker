"use client";

import { cn } from "@/lib/utils";

interface MuscleTagProps {
  muscle: string;
  variant?: "muscle" | "abs";
  className?: string;
}

const muscleColors: Record<string, string> = {
  "胸": "bg-red-100 text-red-800 border-red-200",
  "背": "bg-blue-100 text-blue-800 border-blue-200",
  "腿": "bg-green-100 text-green-800 border-green-200",
  "肩膀": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "二头": "bg-purple-100 text-purple-800 border-purple-200",
  "三头": "bg-pink-100 text-pink-800 border-pink-200",
  "臀": "bg-orange-100 text-orange-800 border-orange-200",
  "核心": "bg-teal-100 text-teal-800 border-teal-200",
};

const absColors: Record<string, string> = {
  "上腹": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "下腹": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "侧腹": "bg-rose-100 text-rose-800 border-rose-200",
};

export function MuscleTag({ muscle, variant = "muscle", className }: MuscleTagProps) {
  const colors = variant === "abs" ? absColors : muscleColors;
  const colorClass = colors[muscle] || "bg-gray-100 text-gray-800 border-gray-200";
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colorClass,
        className
      )}
    >
      {muscle}
    </span>
  );
}
