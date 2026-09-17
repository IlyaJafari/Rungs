import SetPageTitle from "@/app/_components/SetPageTitle";
import { getProgramName, getWorkoutsForWeek } from "@/app/_lib/data-service";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  DumbbellAlt,
  Edit,
} from "@boxicons/react";

import Link from "next/link";

export const metadata = {
  title: "Program",
};

async function Page({ params, searchParams }) {
  const { clientId, programId } = await params;
  const { week } = await searchParams;

  const selectedWeek = Number(week) || 1;

  const [programName, workouts] = await Promise.all([
    getProgramName(programId),
    getWorkoutsForWeek(programId, selectedWeek),
  ]);

  const previousWeek = Math.max(1, selectedWeek - 1);
  const nextWeek = selectedWeek + 1;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <SetPageTitle title="Program" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="truncate text-2xl font-medium tracking-tight text-ink sm:text-4xl">
            {programName}
          </h1>
        </div>

        <Link
          href={`/clients/${clientId}/programs/${programId}/edit`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-steel px-4 py-2 text-sm font-medium text-light-ink transition-colors hover:bg-steel sm:w-auto"
        >
          <Edit className="size-4" />
          Edit program
        </Link>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-steel p-2 sm:p-3">
        <Link
          href={`/clients/${clientId}/programs/${programId}?week=${previousWeek}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-light-ink transition-colors hover:bg-steel"
          aria-label="Previous week"
        >
          <ChevronLeft className="size-5" />
        </Link>

        <div className="flex items-center gap-2">
          <Calendar className="size-5" fill="#2e4c6d" />
          <span className="font-mono text-sm font-medium text-ink">
            Week {selectedWeek}
          </span>
        </div>

        <Link
          href={`/clients/${clientId}/programs/${programId}?week=${nextWeek}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-light-ink transition-colors hover:bg-steel"
          aria-label="Next week"
        >
          <ChevronRight className="size-5" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {workouts?.length > 0 ? (
          workouts.map((workout) => (
            <section
              key={workout.id}
              className="overflow-hidden rounded-xl border border-steel"
            >
              <div className="flex items-center justify-between gap-3 border-b border-steel px-4 py-4 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-iron">
                    <DumbbellAlt className="size-5" fill="#f7f7f5" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate">
                      Day {workout.day_number}
                    </span>
                    <h2 className="truncate font-medium text-ink">
                      {workout.name.replace(`Day ${workout.day_number}: `, "")}
                    </h2>
                  </div>
                </div>

                <span className="shrink-0 font-mono text-xs text-slate">
                  {workout.exercises.length}{" "}
                  {workout.exercises.length === 1 ? "exercise" : "exercises"}
                </span>
              </div>

              <div className="hidden items-center border-b border-steel px-5 py-3 sm:flex">
                <span className="flex-1 font-mono text-xs uppercase tracking-wider text-slate">
                  Exercise
                </span>
                <span className="w-16 text-center font-mono text-xs uppercase tracking-wider text-slate">
                  Sets
                </span>
                <span className="w-16 text-center font-mono text-xs uppercase tracking-wider text-slate">
                  Reps
                </span>
                <span className="w-24 text-center font-mono text-xs uppercase tracking-wider text-slate">
                  Weight
                </span>
              </div>

              <div className="divide-y divide-steel">
                {workout.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:gap-0 sm:px-5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-steel">
                        <DumbbellAlt className="size-4" fill="#2e4c6d" />
                      </div>
                      <span className="truncate text-sm font-medium text-ink">
                        {exercise.name}
                      </span>
                    </div>

                    <div className="flex justify-between pl-12 text-sm text-light-ink sm:contents sm:pl-0">
                      <span className="font-mono sm:w-16 sm:text-center">
                        {exercise.target_sets}
                        <span className="text-slate sm:hidden"> sets</span>
                      </span>
                      <span className="font-mono sm:w-16 sm:text-center">
                        {exercise.target_reps}
                        <span className="text-slate sm:hidden"> reps</span>
                      </span>
                      <span className="font-mono sm:w-24 sm:text-center">
                        {exercise.target_weight
                          ? `${exercise.target_weight} kg`
                          : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-steel px-6 py-10 text-center sm:py-12">
            <DumbbellAlt className="mx-auto size-6" fill="#6b6a63" />
            <p className="mt-3 text-sm font-medium text-ink">
              No workouts scheduled
            </p>
            <p className="mt-1 text-sm text-slate">
              There are no workouts assigned for week {selectedWeek}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
