"use server";

import { redirect } from "next/navigation";
import createClient from "./supabase";
import { revalidatePath } from "next/cache";

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    throw new Error("Could not sign in with Google");
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function addPersonalNote(content) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("coach_personal_notes")
    .insert({ coach_id: user.id, content });

  if (error) {
    console.log(error);
    throw new Error("Note could not be saved");
  }

  revalidatePath("/dashboard");
}

export async function deletePersonalNote(noteId) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("coach_personal_notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.error(error);
    throw new Error("Note could not be deleted");
  }

  revalidatePath("/dashboard");
}

export async function addCoachNote(clientId, content) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("coach_notes")
    .insert({ client_id: clientId, content });

  if (error) {
    console.log(error);
    throw new Error("Note could not be saved");
  }

  revalidatePath(`/clients/${clientId}`);
}

export async function deleteCoachNote(noteId, clientId) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("coach_notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.error(error);
    throw new Error("Note could not be deleted");
  }

  revalidatePath(`/clients/${clientId}`);
}

export async function createProgramWithWeeks(programData) {
  const supabase = await createClient();

  const { data: program, error: programErr } = await supabase
    .from("programs")
    .insert({
      client_id: programData.clientId,
      name: programData.name,
      status: "active",
      start_date: programData.startDate,
    })
    .select()
    .single();

  if (programErr) {
    console.error(programErr);
    throw new Error("Program could not be created");
  }

  for (const week of programData.weeks) {
    for (const day of week.days) {
      const { data: workout, error: workoutErr } = await supabase
        .from("workouts")
        .insert({
          program_id: program.id,
          week_number: week.weekNumber,
          day_number: day.dayNumber,
          name: day.name || `Day ${day.dayNumber}`,
        })
        .select()
        .single();

      if (workoutErr) {
        console.error(workoutErr);
        throw new Error("Workout could not be created");
      }

      const exercisesToInsert = day.exercises
        .filter((ex) => ex.name.trim() !== "")
        .map((ex) => ({
          workout_id: workout.id,
          name: ex.name,
          target_sets: Number(ex.targetSets) || 0,
          target_reps: Number(ex.targetReps) || 0,
          target_weight: ex.targetWeight ? Number(ex.targetWeight) : null,
        }));

      if (exercisesToInsert.length > 0) {
        const { error: exErr } = await supabase
          .from("exercises")
          .insert(exercisesToInsert);

        if (exErr) {
          console.error(exErr);
          throw new Error("Exercises could not be created");
        }
      }
    }

    revalidatePath(`/clients/${programData.clientId}`);
    redirect(`/clients/${programData.clientId}/programs/${program.id}`);
  }
}
