# Tasks: Upgrade Workout Card UI

## Project Context
- Existing project: Fitness Tracker Web App
- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui
- Current workout cards are functional but visually plain
- Goal: redesign workout cards to look like `CardInviteCardDemo` (modern, clean, grid, avatars/icons)

---

## 1. Create a new reusable `WorkoutCard` component
- File: `/src/components/WorkoutCard.tsx`
- Use shadcn/ui:
  - `Card`, `CardHeader`, `CardContent`, `CardTitle`
  - Optional: `Avatar`, `AvatarImage`, `AvatarFallback`
- Include icons from `lucide-react` if appropriate
- Layout:
  - CardHeader: display date
  - CardContent: grid layout for:
    - Muscles trained
    - Abs targeted
    - Cardio info
    - Optional: "raw" note text
- Use spacing and typography similar to `CardInviteCardDemo`:
  - `text-sm font-semibold` for labels
  - `text-muted-foreground text-sm` for secondary info

---

## 2. Replace old card rendering on homepage
- File: `/src/app/page.tsx`
- For each workout record:
  - Replace the plain `<div>` card with the new `<WorkoutCard workout={...} />`
- Keep the same data mapping:
  - `date`, `muscles`, `abs`, `cardio`, `raw`

---

## 3. Add iconography and visual cues
- For cardio: consider a small icon (`CircleFadingPlusIcon`) or similar from `lucide-react`
- For muscles: use a pill-style span or small badges (`text-sm font-semibold bg-muted rounded px-2 py-1`) 
- Optional: add placeholder avatars if user/record attribution exists

---

## 4. Styling guidelines
- Card width: `w-full max-w-lg`
- CardContent: grid layout
  - `grid gap-4 sm:grid-cols-2` for two-column display on larger screens
- Ensure spacing between items is consistent
- Responsive design: mobile first, gracefully adapt to larger screens
- Keep Tailwind classes consistent with shadcn/ui styling

---

## 5. Testing & Verification
- Open homepage in mobile and desktop
- Confirm:
  - Cards match style of `CardInviteCardDemo`
  - All fields visible: date, muscles, abs, cardio
  - Grid layout looks good on small and large screens
  - Optional: hover/focus states are clean

---

## 6. Deliverables
- `/src/components/WorkoutCard.tsx` – new card component
- Updated `/src/app/page.tsx` using new cards
- Tailwind + shadcn/ui styling applied
- Optional: icons and avatars integrated

---

## 7. Notes for Agent
- Goal: **modern, visually appealing, shadcn/ui style**
- Keep the UI consistent with `CardInviteCardDemo`
- Focus on layout, typography, spacing, and minor visual cues
- Do not modify backend/data logic