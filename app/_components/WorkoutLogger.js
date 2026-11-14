"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "@boxicons/react";
import { completeWorkout, logSet } from "../_lib/actions";
import RestTimer from "./ResstTimer";

const inputClass =
  "h-11 w-full min-w-0 rounded-xl border-2 border-steel bg-paper px-2 text-center font-mono outline-none focus:border-iron";
function buildInitialRows(exercises, loggedSets) {
  const rows = {};

  for (const exercise of exercises) {
    for (let setNumber = 1; setNumber <= exercise.target_sets; setNumber++) {
      const logged = loggedSets.find(
        (s) => s.exercise_id === exercise.id && s.set_number === setNumber,
      );

      rows[`${exercise.id}:${setNumber}`] = {
        reps: logged?.actual_reps ?? exercise.target_reps,
        weight: logged?.actual_weight ?? exercise.target_weight ?? "",
        rpe: logged?.actual_rpe ?? "",
        saved: Boolean(logged),
      };
    }
  }

  return rows;
}

function WorkoutLogger({ workout }) {
  const router = useRouter();

  const [rows, setRows] = useState(() =>
    buildInitialRows(workout.exercises, workout.loggedSets),
  );
  const [savingKey, setSavingKey] = useState(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState(null);

  const totalSets = Object.keys(rows).length;
  const savedSets = Object.values(rows).filter((row) => row.saved).length;

  function updateRow(key, field, value) {
    setRows((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value, saved: false },
    }));
  }

  async function handleSaveSet(exerciseId, setNumber) {
    const key = `${exerciseId}:${setNumber}`;
    const row = rows[key];

    if (row.reps === "") return;

    setSavingKey(key);
    setError(null);

    try {
      await logSet({
        exerciseId,
        setNumber,
        reps: row.reps,
        weight: row.weight,
        rpe: row.rpe,
      });

      setRows((prev) => ({ ...prev, [key]: { ...prev[key], saved: true } }));
    } catch (err) {
      console.error(err);
      setError("That set could not be saved. Please try again.");
    } finally {
      setSavingKey(null);
    }
  }

  async function handleFinish() {
    setIsFinishing(true);
    setError(null);

    try {
      await completeWorkout(workout.id);
      router.push(`/program?week=${workout.week_number}`);
    } catch (err) {
      console.error(err);
      setError("The workout could not be completed. Please try again.");
      setIsFinishing(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {workout.exercises.map((exercise) => (
        <section
          key={exercise.id}
          className="overflow-hidden rounded-xl border border-steel"
        >
          <div className="flex flex-col gap-1 border-b border-steel px-4 py-3">
            <h2 className="font-medium">{exercise.name}</h2>
            <p className="text-xs text-slate">
              Target: {exercise.target_sets} × {exercise.target_reps}
              {exercise.target_weight
                ? ` @ ${exercise.target_weight} kg`
                : " · bodyweight"}
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <div className="grid grid-cols-[1.5rem_1fr_1fr_1fr_2.75rem] gap-2 font-mono text-xs uppercase tracking-wider text-slate">
              <span>Set</span>
              <span className="text-center">Kg</span>
              <span className="text-center">Reps</span>
              <span className="text-center">RPE</span>
              <span />
            </div>

            {Array.from({ length: exercise.target_sets }, (_, index) => {
              const setNumber = index + 1;
              const key = `${exercise.id}:${setNumber}`;
              const row = rows[key];

              return (
                <div
                  key={key}
                  className="grid grid-cols-[1.5rem_1fr_1fr_1fr_2.75rem] items-center gap-2"
                >
                  <span className="font-mono text-sm text-slate">
                    {setNumber}
                  </span>

                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={row.weight}
                    onChange={(e) => updateRow(key, "weight", e.target.value)}
                    aria-label={`Set ${setNumber} weight in kilograms`}
                    className={inputClass}
                  />

                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={row.reps}
                    onChange={(e) => updateRow(key, "reps", e.target.value)}
                    aria-label={`Set ${setNumber} reps`}
                    className={inputClass}
                  />

                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="1"
                    max="10"
                    placeholder="—"
                    value={row.rpe}
                    onChange={(e) => updateRow(key, "rpe", e.target.value)}
                    aria-label={`Set ${setNumber} RPE`}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => handleSaveSet(exercise.id, setNumber)}
                    disabled={savingKey === key || row.reps === ""}
                    aria-label={`Log set ${setNumber}`}
                    className={`flex size-11 items-center justify-center rounded-xl transition-colors disabled:opacity-50 ${
                      row.saved
                        ? "bg-moss"
                        : "border-2 border-steel hover:bg-iron-100"
                    }`}
                  >
                    <Check
                      className="size-5"
                      style={{
                        fill: row.saved
                          ? "var(--color-paper)"
                          : "var(--color-slate)",
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <RestTimer />

      {error && (
        <div className="rounded-xl bg-rust-100 p-3 text-sm text-rust-600">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-xl border border-steel p-4">
        <p className="text-sm text-slate">
          {savedSets} / {totalSets} sets logged
        </p>

        {workout.isComplete ? (
          <p className="rounded-xl bg-moss-100 px-4 py-3 text-center font-medium text-moss">
            Workout completed
          </p>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={isFinishing}
            className="rounded-xl bg-iron px-4 py-3 font-medium text-paper transition-colors hover:bg-iron/80 disabled:opacity-50"
          >
            {isFinishing ? "Finishing..." : "Finish workout"}
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkoutLogger;
