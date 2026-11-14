import SetPageTitle from "@/app/_components/SetPageTitle";
import WorkoutLogger from "@/app/_components/WorkoutLogger";
import {
  getActiveProgramOverview,
  getOwnClientRecord,
  getWorkoutForLogging,
} from "@/app/_lib/data-service";
import {
  estimateWorkoutDuration,
  formatWorkoutDate,
} from "@/app/_utils/helpers";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Workout",
};

async function Page({ params }) {
  const { workoutId } = await params;

  const client = await getOwnClientRecord();
  const workout = await getWorkoutForLogging(workoutId, client.id);
  const program = await getActiveProgramOverview(client.id);
  console.log(program);

  if (!workout) notFound();

  const date = new Date();

  return (
    <div className="flex flex-col gap-6">
      <SetPageTitle title="workout" />

      <Link
        href={`/program?week=${workout.week_number}`}
        className="text-xs text-slate font-medium hover:underline"
      >
        &larr; Back to programs
      </Link>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-slate">
          {formatWorkoutDate(date)} · Day {workout.day_number}
        </p>
        <h1 className="text-3xl font-semibold">{workout.name}</h1>
        <p className="text-sm text-slate">
          {program.name} · ~ {estimateWorkoutDuration(workout)}
        </p>
      </div>
      <WorkoutLogger workout={workout} />
    </div>
  );
}

export default Page;
