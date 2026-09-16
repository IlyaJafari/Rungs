import { notFound } from "next/navigation";
import createClient from "./supabase";

export async function getClients() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, status, joined_at, profiles!clients_profile_id_fkey(full_name), programs(name, status)",
    )
    .order("joined_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Clients could not be loaded");
  }

  return data;
}

export async function getClient(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, status, joined_at, profiles!clients_profile_id_fkey(full_name)",
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    notFound();
  }

  return data;
}

export async function getBodyWeightLogs(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("body_weight_logs")
    .select("id, weight, logged_at")
    .eq("client_id", clientId)
    .order("logged_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Body weight logs could not be loaded");
  }

  return data;
}

export async function getClientsNeedingAttention() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, status, profiles!clients_profile_id_fkey(full_name), logged_sets(logged_at)",
    )
    .eq("status", "active");

  if (error) {
    console.error(error);
    throw new Error("Clients could not be loaded");
  }

  const THRESHOLD_DAYS = 5;
  const now = Date.now();

  return data
    .map((client) => {
      const timestamps = client.logged_sets.map((s) =>
        new Date(s.logged_at).getTime(),
      );
      const lastLogged = timestamps.length ? Math.max(...timestamps) : null;
      const daysSince = lastLogged
        ? (now - lastLogged) / (1000 * 60 * 60 * 24)
        : Infinity;
      return { ...client, daysSince };
    })
    .filter((client) => client.daysSince >= THRESHOLD_DAYS)
    .sort((a, b) => b.daysSince - a.daysSince);
}

export async function getCoach() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, avatar_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Coach profile could not be loaded");
  }

  return data;
}

export async function getPrograms(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("programs")
    .select("id, name, status, start_date")
    .eq("client_id", clientId)
    .order("start_date", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Programs could not be loaded");
  }

  return data;
}

export async function getWorkouts(programId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workouts")
    .select("id, week_number, day_number, name")
    .eq("program_id", programId)
    .order("week_number")
    .order("day_number");

  if (error) {
    console.log(error);
    throw new Error("Workouts could not be loaded");
  }

  return data;
}

export async function getWorkoutsForWeek(programId, weekNumber) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workouts")
    .select(
      "id, day_number, name, exercises(id, name, target_sets, target_reps, target_weight)",
    )
    .eq("program_id", programId)
    .eq("week_number", weekNumber)
    .order("day_number");

  if (error) {
    console.error(error);
    throw new Error("Workouts could not be loaded");
  }

  return data;
}

export async function getExercises(workoutId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exercises")
    .select("id, name, target_sets, target_reps, target_weight")
    .eq("workout_id", workoutId);

  if (error) {
    console.error(error);
    throw new Error("Exercises could not be loaded");
  }

  return data;
}

export async function getTotalPRs(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logged_sets")
    .select("actual_weight, logged_at, exercises(name)")
    .eq("client_id", clientId)
    .not("actual_weight", "is", null)
    .order("logged_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Logged sets could not be loaded");
  }

  const bestSoFar = {};
  let prCount = 0;

  for (const set of data) {
    const exerciseName = set.exercises?.name?.trim().toLowerCase();
    if (!exerciseName) continue;

    const weight = set.actual_weight;

    if (!(exerciseName in bestSoFar)) {
      bestSoFar[exerciseName] = weight;
      continue;
    }

    if (weight > bestSoFar[exerciseName]) {
      prCount++;
      bestSoFar[exerciseName] = weight;
    }
  }

  return prCount;
}

export async function getAvgIntensity(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logged_sets")
    .select("actual_rpe")
    .eq("client_id", clientId)
    .not("actual_rpe", "is", null);

  if (error) {
    console.error(error);
    throw new Error("Logged sets could not be loaded");
  }

  if (data.length === 0) return null;

  const sum = data.reduce((total, set) => total + set.actual_rpe, 0);
  return sum / data.length;
}

export async function getTotalVolume(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logged_sets")
    .select("actual_reps, actual_weight")
    .eq("client_id", clientId)
    .not("actual_weight", "is", null);

  if (error) {
    console.error(error);
    throw new Error("Logged sets could not be loaded");
  }

  return data.reduce(
    (total, set) => total + set.actual_reps * set.actual_weight,
    0,
  );
}

export async function getLastLoggedAt(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logged_sets")
    .select("logged_at")
    .eq("client_id", clientId)
    .order("logged_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Logged sets could not be loaded");
  }

  return data?.logged_at ?? null;
}

export async function getLoggedSets(exerciseId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logged_sets")
    .select("id, set_number, actual_reps, actual_weight, actual_rpe, logged_at")
    .eq("exercise_id", exerciseId)
    .order("set_number");

  if (error) {
    console.error(error);
    throw new Error("Logged sets could not be loaded");
  }

  return data;
}

export async function getCoachNotes(clientId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("coach_notes")
    .select("id, content, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Coach notes could not be loaded");
  }

  return data;
}

export async function getPersonalNotes() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("coach_personal_notes")
    .select("id, content, created_at")
    .eq("coach_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Personal notes could not be loaded");
  }

  return data;
}

export async function getRecentActivity(clientId, limit = 10) {
  const supabase = await createClient();

  // Workout logged
  const { data: loggedSets, error: setsErr } = await supabase
    .from("logged_sets")
    .select("logged_at, exercises(workout_id, workouts(name))")
    .eq("client_id", clientId);

  if (setsErr) {
    console.error(setsErr);
    throw new Error("Activity could not be loaded");
  }

  const workoutGroups = {};
  for (const set of loggedSets) {
    const workoutId = set.exercises?.workout_id;
    const workoutName = set.exercises?.workouts?.name ?? "Workout";
    if (!workoutId) continue;

    const day = set.logged_at.slice(0, 10);
    const key = `${workoutId}-${day}`;

    if (!workoutGroups[key] || set.logged_at < workoutGroups[key].timestamp) {
      workoutGroups[key] = { timestamp: set.logged_at, workoutName };
    }
  }

  const workoutEvents = Object.values(workoutGroups).map((w) => ({
    type: "workout_logged",
    timestamp: w.timestamp,
    title: "Workout Logged",
    description: `Completed "${w.workoutName}"`,
  }));

  //PR Achieved
  const { data: prSets, error: prErr } = await supabase
    .from("logged_sets")
    .select("actual_weight, logged_at, exercises(name)")
    .eq("client_id", clientId)
    .not("actual_weight", "is", null)
    .order("logged_at", { ascending: true });

  if (prErr) {
    console.error(prErr);
    throw new Error("Activity could not be loaded");
  }

  const bestSoFar = {};
  const prEvents = [];
  for (const set of prSets) {
    const name = set.exercises?.name?.trim().toLowerCase();
    if (!name) continue;
    const weight = set.actual_weight;

    if (!(name in bestSoFar)) {
      bestSoFar[name] = weight;
      continue;
    }

    if (weight > bestSoFar[name]) {
      prEvents.push({
        type: "pr",
        timestamp: set.logged_at,
        title: "PR Achieved",
        description: `New best on '${set.exercises.name}': ${weight}kg (+${(weight - bestSoFar[name]).toFixed(1)}kg)`,
      });
      bestSoFar[name] = weight;
    }
  }

  // Feedback: coach notes
  const { data: notes, error: notesErr } = await supabase
    .from("coach_notes")
    .select("created_at")
    .eq("client_id", clientId);

  if (notesErr) {
    console.error(notesErr);
    throw new Error("Activity could not be loaded");
  }

  const feedbackEvents = notes.map((note) => ({
    type: "feedback",
    timestamp: note.created_at,
    title: "Feedback",
    description: "A note was added.",
  }));

  // Program Assigned
  const { data: programs, error: programsErr } = await supabase
    .from("programs")
    .select("name, created_at")
    .eq("client_id", clientId);

  if (programsErr) {
    console.error(programsErr);
    throw new Error("Activity could not be loaded");
  }

  const programEvents = programs.map((program) => ({
    type: "program_assigned",
    timestamp: program.created_at,
    title: "Program Assigned",
    description: `"${program.name}" added.`,
  }));

  // Merge
  return [...workoutEvents, ...prEvents, ...feedbackEvents, ...programEvents]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}

/////////////
// CREATE

export async function createClientRecord(newClient) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .insert([newClient])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Client could not be created");
  }

  return data;
}

/////////////
// UPDATE

// updatedFields should ONLY contain the fields being changed
export async function updateClient(id, updatedFields) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Client could not be updated");
  }

  return data;
}

/////////////
// DELETE

export async function deleteClient(id) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Client could not be deleted");
  }

  return data;
}
