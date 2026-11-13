"use client";

import { Check } from "@boxicons/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function getWeekState(week, currentWeek, progress) {
  if (progress && progress.total > 0 && progress.completed === progress.total) {
    return "complete";
  }
  if (week === currentWeek) return "current";
  if (week > currentWeek) return "upcoming";
  return "incomplete";
}

function WeekSelector({
  weekNumbers,
  selectedWeek,
  currentWeek,
  weekProgress,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleWeekChange(week) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("week", week);

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className="font-semibold">Your training weeks</h2>

      <div
        className={`grid w-full gap-2 ${
          weekNumbers.length <= 4
            ? "grid-cols-2 sm:grid-cols-4"
            : "grid-flow-col auto-cols-max overflow-x-auto"
        }`}
      >
        {weekNumbers.map((week) => {
          const progress = weekProgress[week];
          const state = getWeekState(week, currentWeek, progress);
          const isSelected = Number(week) === Number(selectedWeek);

          return (
            <button
              key={week}
              type="button"
              onClick={() => handleWeekChange(String(week))}
              className={`flex flex-col items-center gap-0.5 rounded-lg border border-steel px-4 py-3.5 cursor-pointer transition-colors ${
                isSelected ? "bg-iron text-paper" : "hover:bg-iron-100"
              }`}
            >
              <span>Week {week}</span>

              <span
                className={`flex h-4 items-center text-xs ${
                  isSelected ? "text-paper" : "text-slate"
                }`}
              >
                {state === "complete" && (
                  <Check
                    className="size-4"
                    style={{
                      fill: isSelected
                        ? "var(--color-paper)"
                        : "var(--color-moss)",
                    }}
                  />
                )}
                {state === "current" && "Current"}
                {state === "upcoming" && "Upcoming"}
                {state === "incomplete" &&
                  `${progress.completed}/${progress.total}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WeekSelector;
