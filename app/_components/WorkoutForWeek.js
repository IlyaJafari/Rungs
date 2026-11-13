import { getWorkoutsForWeek } from "@/app/_lib/data-service";
import Link from "next/link";

async function WorkoutForWeek({ programId, selectedWeek }) {
  const workoutForWeek = await getWorkoutsForWeek(programId, selectedWeek);
  console.log(workoutForWeek);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Week {selectedWeek}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workoutForWeek.map((workout) => (
          <div
            key={workout.id}
            className="flex h-full flex-col border border-steel rounded-lg"
          >
            <div className="flex flex-col gap-2.5 p-4.5 border-b border-steel">
              <p className="font-semibold text-xs text-slate">
                Day {workout.day_number}
              </p>
              <p className="font-semibold text-lg">{workout.name}</p>
            </div>

            <div className="flex flex-col p-4.5">
              <ul className="flex flex-col gap-3.5">
                {workout.exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-medium text-sm">{exercise.name}</p>
                      <p className="text-slate text-xs">
                        {exercise.target_sets} × {exercise.target_reps} ·{" "}
                        {exercise.target_weight} kg
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex items-center justify-center p-4.5">
              <Link
                href="#"
                className="font-semibold text-iron text-sm w-full text-center border-3 border-steel rounded-lg p-3"
              >
                View workout
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutForWeek;
