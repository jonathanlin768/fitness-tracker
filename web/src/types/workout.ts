export type Workout = {
  date: string;          // YYYY-MM-DD
  muscles: string[];     // e.g., ["胸", "肩膀"]
  abs: string[];         // e.g., ["上腹", "下腹"]
  cardio: number;        // duration in minutes
  raw?: string;          // original text input
};

export type TimeRange = 'week' | 'month' | 'year';

export type StatsData = {
  label: string;
  cardio: number;
  workouts: number;
};

export type MuscleFrequency = {
  muscle: string;
  count: number;
};
