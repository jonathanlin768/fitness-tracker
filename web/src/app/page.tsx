"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";
import { getWorkouts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart3, Loader2 } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError("加载数据失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    }
    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-destructive">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          重试
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">健身追踪</h1>
          </div>
          <Link href="/analysis">
            <Button variant="ghost" size="sm" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">统计分析</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{workouts.length}</p>
            <p className="text-xs text-muted-foreground mt-1">总训练次数</p>
          </div>
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {workouts.reduce((sum, w) => sum + w.cardio, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">有氧总时长(分)</p>
          </div>
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {Math.round(workouts.reduce((sum, w) => sum + w.cardio, 0) / (workouts.length || 1))}
            </p>
            <p className="text-xs text-muted-foreground mt-1">平均有氧(分)</p>
          </div>
        </div>

        {/* Workout List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">训练记录</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.date} workout={workout} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
