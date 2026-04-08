"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Workout, TimeRange } from "@/types/workout";
import { getWorkouts, getStatsByTimeRange, countMuscleFrequency } from "@/lib/data";
import { CardioChart, MuscleChart } from "@/components/StatsChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, Calendar } from "lucide-react";

export default function AnalysisPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      const data = await getWorkouts();
      setWorkouts(data);
      setLoading(false);
    }
    loadWorkouts();
  }, []);

  const statsData = getStatsByTimeRange(workouts, timeRange);
  const muscleFrequency = countMuscleFrequency(workouts, timeRange);

  const timeRangeLabels: Record<TimeRange, string> = {
    week: "近8周",
    month: "近6个月",
    year: "全年",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-semibold">统计分析</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">时间范围</span>
          </div>
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="week">周统计</TabsTrigger>
              <TabsTrigger value="month">月统计</TabsTrigger>
              <TabsTrigger value="year">年统计</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">训练次数</p>
            <p className="text-xl font-bold text-primary mt-1">
              {statsData.reduce((sum, s) => sum + s.workouts, 0)}
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">有氧总时长</p>
            <p className="text-xl font-bold text-primary mt-1">
              {statsData.reduce((sum, s) => sum + s.cardio, 0)} 分
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">平均有氧</p>
            <p className="text-xl font-bold text-primary mt-1">
              {(() => {
                const totalCardio = statsData.reduce((sum, s) => sum + s.cardio, 0);
                const cardioWorkouts = workouts.filter(w => (w.cardio || 0) > 0).length;
                return cardioWorkouts > 0 ? Math.round(totalCardio / cardioWorkouts) : 0;
              })()} 分
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">活跃肌肉群</p>
            <p className="text-xl font-bold text-primary mt-1">
              {muscleFrequency.length}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <CardioChart 
            data={statsData} 
            title={`有氧运动时长趋势 (${timeRangeLabels[timeRange]})`}
          />
          <MuscleChart 
            data={muscleFrequency}
            title={`肌肉群训练频率 (${timeRangeLabels[timeRange]})`}
          />
        </div>
      </main>
    </div>
  );
}
