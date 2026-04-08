"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MuscleTag } from "./MuscleTag";
import { Workout } from "@/types/workout";
import { formatDate } from "@/lib/data";
import { Dumbbell, Heart, Activity } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span>{formatDate(workout.date)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Muscles */}
        {workout.muscles.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Dumbbell className="w-4 h-4 text-primary" />
              <span>肌肉群</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {workout.muscles.map((muscle) => (
                <MuscleTag key={muscle} muscle={muscle} variant="muscle" />
              ))}
            </div>
          </div>
        )}
        
        {/* Abs */}
        {workout.abs.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>腹肌</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {workout.abs.map((ab) => (
                <MuscleTag key={ab} muscle={ab} variant="abs" />
              ))}
            </div>
          </div>
        )}
        
        {/* Cardio */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">有氧运动:</span>
            <span className="font-semibold text-primary">{workout.cardio} 分钟</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
