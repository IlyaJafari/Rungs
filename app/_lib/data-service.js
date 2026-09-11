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
    .select("id, status, joined_at, profiles(full_name)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    notFound();
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
