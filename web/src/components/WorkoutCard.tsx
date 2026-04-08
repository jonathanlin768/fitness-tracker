"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workout } from "@/types/workout";
import { formatDate } from "@/lib/data";
import { 
  Dumbbell, 
  Heart, 
  CalendarDays, 
  Flame,
  Timer,
  StickyNote,
  Sparkles
} from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card className="w-full max-w-lg hover:shadow-lg hover:border-primary/20 transition-all duration-200">
      {/* Header with Date */}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold">
            {formatDate(workout.date)}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {/* Muscles Section */}
        {workout.muscles.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">肌肉群</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {workout.muscles.map((muscle) => (
                <span
                  key={muscle}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-semibold text-foreground ring-1 ring-inset ring-border"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Abs Section */}
        {workout.abs.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-semibold">腹肌</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {workout.abs.map((ab) => (
                <span
                  key={ab}
                  className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-200"
                >
                  {ab}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cardio Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-semibold">有氧运动</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {workout.cardio > 0 ? `${workout.cardio} 分钟` : "无"}
            </span>
          </div>
        </div>

        {/* Relax Section */}
        {workout.relax && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-teal-500" />
              <span className="text-sm font-semibold">拉伸课</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-200">
                有
              </span>
            </div>
          </div>
        )}

        {/* Raw Note Section (if exists) */}
        {workout.raw && (
          <div className="flex flex-col gap-2 col-span-full">
            <div className="flex items-center gap-1.5">
              <StickyNote className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">备注</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {workout.raw}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}