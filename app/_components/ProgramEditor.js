"use client";

import { useState } from "react";
import {
  checkProgramHasLoggedData,
  createProgramWithWeeks,
  updateProgramWithWeeks,
} from "../_lib/actions";
import { Trash } from "@boxicons/react";

const emptyExercise = () => ({
  name: "",
  targetSets: "",
  targetReps: "",
  targetWeight: "",
});

const emptyDay = (dayNumber) => ({
  dayNumber,
  name: "",
  exercises: [emptyExercise()],
});

const emptyWeek = (weekNumber) => ({
  weekNumber,
  days: [emptyDay(1)],
});

function buildWeeksFromProgram(program) {
  const weekMap = {};

  for (const workout of program.workouts) {
    if (!weekMap[workout.week_number]) {
      weekMap[workout.week_number] = {
        weekNumber: workout.week_number,
        days: [],
      };
    }

    weekMap[workout.week_number].days.push({
      dayNumber: workout.day_number,
      name: workout.name,
      exercises: workout.exercises.length
        ? workout.exercises.map((ex) => ({
            name: ex.name,
            targetSets: ex.target_sets,
            targetReps: ex.target_reps,
            targetWeight: ex.target_weight ?? "",
          }))
        : [emptyExercise()],
    });
  }

  return Object.values(weekMap)
    .sort((a, b) => a.weekNumber - b.weekNumber)
    .map((week) => ({
      ...week,
      days: week.days.sort((a, b) => a.dayNumber - b.dayNumber),
    }));
}

function ProgramEditor({ clients, defaultClientId, program, clientName }) {
  const isEditMode = Boolean(program);

  const [clientId, setClientId] = useState(defaultClientId || "");
  const [name, setName] = useState(program?.name || "");
  const [startDate, setStartDate] = useState(program?.start_date || "");
  const [weeks, setWeeks] = useState(
    isEditMode ? buildWeeksFromProgram(program) : [emptyWeek(1)],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addWeek() {
    setWeeks((prev) => [...prev, emptyWeek(prev.length + 1)]);
  }

  function removeWeek(weekIndex) {
    setWeeks((prev) => prev.filter((_, i) => i !== weekIndex));
  }

  function addDay(weekIndex) {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? { ...week, days: [...week.days, emptyDay(week.days.length + 1)] }
          : week,
      ),
    );
  }

  function removeDay(weekIndex, dayIndex) {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? { ...week, days: week.days.filter((_, j) => j !== dayIndex) }
          : week,
      ),
    );
  }

  function updateDayName(weekIndex, dayIndex, value) {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? {
              ...week,
              days: week.days.map((day, j) =>
                j === dayIndex ? { ...day, name: value } : day,
              ),
            }
          : week,
      ),
    );
  }

  function addExercise(weekIndex, dayIndex) {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? {
              ...week,
              days: week.days.map((day, j) =>
                j === dayIndex
                  ? { ...day, exercises: [...day.exercises, emptyExercise()] }
                  : day,
              ),
            }
          : week,
      ),
    );
  }

  function removeExercise(weekIndex, dayIndex, exIndex) {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? {
              ...week,
              days: week.days.map((day, j) =>
                j === dayIndex
                  ? {
                      ...day,
                      exercises: day.exercises.filter((_, k) => k !== exIndex),
                    }
                  : day,
              ),
            }
          : week,
      ),
    );
  }

  function updateExercise(weekIndex, dayIndex, exIndex, field, value) {
    setWeeks((prev) =>
      prev.map((week, i) =>
        i === weekIndex
          ? {
              ...week,
              days: week.days.map((day, j) =>
                j === dayIndex
                  ? {
                      ...day,
                      exercises: day.exercises.map((ex, k) =>
                        k === exIndex ? { ...ex, [field]: value } : ex,
                      ),
                    }
                  : day,
              ),
            }
          : week,
      ),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isEditMode) {
      setIsSubmitting(true);
      try {
        const hasHistory = await checkProgramHasLoggedData(program.id);
        if (hasHistory) {
          const confirmed = window.confirm(
            "This program has logged workout history, Saving these changes will permanently remove those logged sets. Continue?",
          );
          if (!confirmed) {
            setIsSubmitting(false);
            return;
          }
        }
        await updateProgramWithWeeks(program.id, {
          clientId: program.client_id,
          name,
          startDate,
          weeks,
        });
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
      return;
    }

    if (!clientId) return;
    setIsSubmitting(true);
    try {
      await createProgramWithWeeks({ clientId, name, startDate, weeks });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border-2 border-steel p-4">
        {isEditMode ? (
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate">Client</span>
            <span className="font-medium">{clientName}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label htmlFor="client-select" className="text-sm text-slate">
              Client
            </label>
            <select
              id="client-select"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="bg-steel rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-iron-300"
            >
              <option value="" disabled>
                Select a client...
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.profiles?.full_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="program-name" className="text-sm text-slate">
            Program name
          </label>
          <input
            id="program-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-steel rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-iron-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="start-date" className="text-sm text-slate">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="bg-steel rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-iron-300"
          />
        </div>
      </div>

      {weeks.map((week, weekIndex) => (
        <div
          key={weekIndex}
          className="flex flex-col gap-4 rounded-xl border-2 border-steel p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Week {week.weekNumber}</span>
            {weeks.length > 1 && (
              <button
                type="button"
                onClick={() => removeWeek(weekIndex)}
                className="text-xs text-rust"
              >
                <Trash />
              </button>
            )}
          </div>

          {week.days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="flex flex-col gap-3 rounded-xl bg-slate/5 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  value={day.name}
                  onChange={(e) =>
                    updateDayName(weekIndex, dayIndex, e.target.value)
                  }
                  placeholder={`Day ${day.dayNumber} name (e.g. Upper Body)`}
                  className="flex bg-steel rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-iron-300"
                />
                {week.days.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDay(weekIndex, dayIndex)}
                    className="text-xs text-rust shrink-0"
                  >
                    <Trash />
                  </button>
                )}
              </div>

              {day.exercises.map((ex, exIndex) => (
                <div
                  key={exIndex}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center"
                >
                  <input
                    value={ex.name}
                    onChange={(e) =>
                      updateExercise(
                        weekIndex,
                        dayIndex,
                        exIndex,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="Exercise name"
                    className="col-span-2 md:col-span-1 bg-steel rounded-xl px-3 py-2 outline-none"
                  />
                  <input
                    value={ex.targetSets}
                    onChange={(e) =>
                      updateExercise(
                        weekIndex,
                        dayIndex,
                        exIndex,
                        "targetSets",
                        e.target.value,
                      )
                    }
                    type="number"
                    placeholder="sets"
                    className="bg-steel rounded-xl px-3 py-2 outline-none"
                  />
                  <input
                    value={ex.targetReps}
                    onChange={(e) =>
                      updateExercise(
                        weekIndex,
                        dayIndex,
                        exIndex,
                        "targetReps",
                        e.target.value,
                      )
                    }
                    type="number"
                    placeholder="Reps"
                    className="bg-steel rounded-xl px-3 py-2 outline-none"
                  />
                  <input
                    value={ex.targetWeight}
                    onChange={(e) =>
                      updateExercise(
                        weekIndex,
                        dayIndex,
                        exIndex,
                        "targetWeight",
                        e.target.value,
                      )
                    }
                    type="number"
                    placeholder="weight (kg)"
                    className="bg-steel rounded-xl px-3 py-2 outline-none"
                  />
                  {day.exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeExercise(weekIndex, dayIndex, exIndex)
                      }
                      className="text-xl text-rust"
                    >
                      <Trash width={20} height={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addExercise(weekIndex, dayIndex)}
                className="text-sm text-iron self-start"
              >
                + Add exercise
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addDay(weekIndex)}
            className="text-sm text-iron self-start"
          >
            + Add day
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addWeek}
        className="px-4 py-2 rounded-xl border-2 border-iron text-iron hover:bg-iron hover:text-paper transition-colors"
      >
        + Add week
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-iron text-paper px-4 py-3 rounded-xl hover:bg-iron/80 transition-colors disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : isEditMode
            ? "Save changes"
            : "Save program"}
      </button>
    </form>
  );
}

export default ProgramEditor;
