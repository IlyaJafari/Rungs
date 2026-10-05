import { ArrowRightStroke, CheckCircle } from "@boxicons/react";
import { getTodaysWorkout } from "../_lib/data-service";
import { estimateWorkoutDuration } from "@/app/_utils/helpers";
import Link from "next/link";

async function TodaysSession({ client }) {
  const clientId = client?.id;
  const todaysWorkout = await getTodaysWorkout(clientId);

  console.log(todaysWorkout);

  return (
    <div className="flex flex-col gap-5 bg-iron-100 p-7 rounded-xl border border-steel">
      <h3 className="text-xs font-bold uppercase text-iron">
        Today&apos;s session
      </h3>

      {todaysWorkout ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium">
              {todaysWorkout.workout.name}
            </h2>
            <p className="text-sm text-slate">
              {todaysWorkout.programName} · day {todaysWorkout.dayNumber} of
              week {todaysWorkout.weekNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-slate/15 pb-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-slate">Exercises</p>
              <p className="font-medium">
                {todaysWorkout.workout.exercises.length}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-slate">Duration</p>
              <p className="font-medium">
                ~ {estimateWorkoutDuration(todaysWorkout.workout)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate">UP NEXT</p>
            <p>
              {todaysWorkout.workout.exercises.at(0).name} ·{" "}
              {todaysWorkout.workout.exercises.at(0).target_sets}×
              {todaysWorkout.workout.exercises.at(0).target_reps}
            </p>
          </div>

          <Link
            href="#"
            className="flex items-center justify-center gap-1 text-paper bg-iron font-medium py-4 rounded-xl"
          >
            <ArrowRightStroke />
            <span>Start workout</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center text-iron">
          <CheckCircle width={64} height={64} />
          <p className="font-semibold">No workouts for today 🎉️</p>
        </div>
      )}
    </div>
  );
}

export default TodaysSession;
