import { Workout, TimeRange, StatsData, MuscleFrequency } from "@/types/workout";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch("/data/workouts.json");
  const data = await response.json();
  return data.sort((a: Workout, b: Workout) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getWeeklyStats(workouts: Workout[]): StatsData[] {
  const statsMap = new Map<string, { cardio: number; workouts: number; hasCardios: number }>();
  
  // Get the last 8 weeks
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    const weekKey = getWeekKey(d);
    statsMap.set(weekKey, { cardio: 0, workouts: 0, hasCardios: 0 });
  }
  
  workouts.forEach(workout => {
    const weekKey = getWeekKey(new Date(workout.date));
    if (statsMap.has(weekKey)) {
      const current = statsMap.get(weekKey)!;
      current.cardio += (workout.cardio || 0);
      current.workouts += 1;
      current.hasCardios += (workout.cardio && workout.cardio > 0) ? 1 : 0;
    }
  });
  
  return Array.from(statsMap.entries()).map(([label, data]) => ({
    label,
    cardio: data.cardio,
    workouts: data.workouts,
    hasCardios: data.hasCardios
  }));
}

export function getMonthlyStats(workouts: Workout[]): StatsData[] {
  const statsMap = new Map<string, { cardio: number; workouts: number; hasCardios: number }>();
  
  // Get the last 6 months
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const monthKey = getMonthKey(d);
    statsMap.set(monthKey, { cardio: 0, workouts: 0, hasCardios: 0 });
  }
  
  workouts.forEach(workout => {
    const monthKey = getMonthKey(new Date(workout.date));
    if (statsMap.has(monthKey)) {
      const current = statsMap.get(monthKey)!;
      current.cardio += (workout.cardio || 0);
      current.workouts += 1;
        current.hasCardios += (workout.cardio && workout.cardio > 0) ? 1 : 0;
    }
  });
  
  return Array.from(statsMap.entries()).map(([label, data]) => ({
    label,
    cardio: data.cardio,
    workouts: data.workouts,
    hasCardios: data.hasCardios
  }));
}

export function getYearlyStats(workouts: Workout[]): StatsData[] {
  const statsMap = new Map<string, { cardio: number; workouts: number; hasCardios: number }>();
  
  // Get all years from data
  const years = new Set(workouts.map(w => w.date.split("-")[0]));
  const sortedYears = Array.from(years).sort();
  
  sortedYears.forEach(year => {
    statsMap.set(year, { cardio: 0, workouts: 0, hasCardios: 0 });
  });
  
  workouts.forEach(workout => {
    const year = workout.date.split("-")[0];
    if (statsMap.has(year)) {
      const current = statsMap.get(year)!;
      current.cardio += (workout.cardio || 0);
      current.workouts += 1;
      current.hasCardios += (workout.cardio && workout.cardio > 0) ? 1 : 0;
    }
  });
  
  return Array.from(statsMap.entries()).map(([label, data]) => ({
    label,
    cardio: data.cardio,
    workouts: data.workouts,
    hasCardios: data.hasCardios,
  }));
}

export function getStatsByTimeRange(workouts: Workout[], range: TimeRange): StatsData[] {
  switch (range) {
    case "week":
      return getWeeklyStats(workouts);
    case "month":
      return getMonthlyStats(workouts);
    case "year":
      return getYearlyStats(workouts);
    default:
      return getWeeklyStats(workouts);
  }
}

export function countMuscleFrequency(workouts: Workout[], range: TimeRange): MuscleFrequency[] {
  const muscleCounts = new Map<string, number>();
  const now = new Date();
  
  const filteredWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const diffDays = (now.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24);
    
    switch (range) {
      case "week":
        return diffDays <= 56; // Last 8 weeks
      case "month":
        return diffDays <= 180; // Last 6 months
      case "year":
        return true; // All time
      default:
        return diffDays <= 56;
    }
  });
  
  filteredWorkouts.forEach(workout => {
    workout.muscles.forEach(muscle => {
      muscleCounts.set(muscle, (muscleCounts.get(muscle) || 0) + 1);
    });
  });
  
  return Array.from(muscleCounts.entries())
    .map(([muscle, count]) => ({ muscle, count }))
    .sort((a, b) => b.count - a.count);
}

function getWeekKey(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}
