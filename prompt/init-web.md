
````markdown
# Tasks for Fitness Tracker Web Project

## Project Overview
- Build a mobile-friendly and desktop-friendly web app to track and analyze fitness sessions.
- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui + Recharts
- Data source: JSON files containing workout records
- Main features:
  - Homepage: list of workout sessions with date, muscles, abs, cardio duration
  - Analysis page: weekly/monthly/yearly stats for muscles and cardio
  - Mobile-friendly layout, responsive design

---

## 1. Project Setup
- Initialize Next.js with TypeScript, Tailwind, App Router
- Install shadcn/ui and Recharts
- Configure basic Tailwind and global styles
- Set up `/public/data/workouts.json` as the main data file

---

## 2. Data Structure
- Workout record format:
```ts
type Workout = {
  date: string;          // YYYY-MM-DD
  muscles: string[];     // e.g., ["胸", "肩膀"]
  abs: string[];         // e.g., ["上腹", "下腹"]
  cardio: number;        // duration in minutes
  raw?: string;          // original text input
};
````

* Place an example JSON file in `/public/data/workouts.json`

---

## 3. Homepage (Workout List)

* Create a page at `/` using App Router
* Display all workout records in a **list/card style**

  * Use shadcn/ui Card or similar components
  * Show: Date, Muscles, Abs, Cardio
* Make it mobile-responsive
* Optional: sort records by date descending
* Add basic CSS spacing and typography using Tailwind

---

## 4. Analysis Page

* Create a page at `/analysis`
* Features:

  * Weekly, monthly, yearly aggregation
  * Chart of cardio minutes over time (line chart)
  * Chart of muscle group frequency (bar chart)
* Use Recharts for charts
* Mobile-friendly layout
* Ability to select week/month/year for stats

---

## 5. JSON Data Handling

* Frontend reads JSON from `/public/data/workouts.json`
* Optional: create a helper in `/src/lib` to parse/aggregate data
* Example helpers:

  * getWeeklyStats(workouts)
  * getMonthlyStats(workouts)
  * getYearlyStats(workouts)
  * countMuscleFrequency(workouts)

---

## 6. UI Components

* Create reusable components:

  * `WorkoutCard` (display one workout)
  * `StatsChart` (line/bar chart)
  * `MuscleTag` (small pill showing muscle name)
* Place components in `/src/components`

---

## 7. Mobile-Friendly Considerations

* Use Tailwind responsive classes
* Add viewport meta tag
* Consider PWA setup for “Add to Home Screen” experience

---

## 8. Optional Advanced Tasks

* Input page for new workouts (later connect to Lambda)
* Real-time JSON update via API (Lambda or GitHub push)
* Weekly summary notifications (future)

---

## 9. Testing

* Verify JSON loading works
* Test on mobile and desktop
* Check charts render correctly for different date ranges

---

## 10. Deliverables

* `/src/app/page.tsx` – homepage
* `/src/app/analysis/page.tsx` – analysis page
* `/src/components/*` – reusable components
* `/public/data/workouts.json` – sample data
* `/src/lib/*` – helper functions for data parsing and stats

---

```
