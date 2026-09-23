"use server";

import { redirect } from "next/navigation";
import createClient from "./supabase";
import { revalidatePath } from "next/cache";
import { resend } from "./resend";

export async function signInWithGoogle(formData) {
  const supabase = await createClient();
  const inviteToken = formData.get("invite");

  const callbackUrl = new URL(
    "/auth/callback",
    process.env.NEXT_PUBLIC_SITE_URL,
  );
  if (inviteToken) {
    callbackUrl.searchParams.set("invite", inviteToken);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
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

  const { error: deactivateErr } = await supabase
    .from("programs")
    .update({ status: "completed" })
    .eq("client_id", programData.clientId)
    .eq("status", "active");

  if (deactivateErr) {
    console.error(deactivateErr);
    throw new Error("Could not update previous program");
  }

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

export async function checkProgramHasLoggedData(programId) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("logged_sets")
    .select("id, exercises!inner(workout_id, workouts!inner(program_id))", {
      count: "exact",
      head: true,
    })
    .eq("exercises.workouts.program_id", programId);

  if (error) {
    console.error(error);
    throw new Error("Could not check program history");
  }

  return count > 0;
}

export async function updateProgramWithWeeks(programId, programData) {
  const supabase = await createClient();

  const { error: programErr } = await supabase
    .from("programs")
    .update({
      name: programData.name,
      start_date: programData.startDate,
    })
    .eq("id", programId);

  if (programErr) {
    console.error(programErr);
    throw new Error("Program could not be updated");
  }

  const { error: deleteErr } = await supabase
    .from("workouts")
    .delete()
    .eq("program_id", programId);

  if (deleteErr) {
    console.error(deleteErr);
    throw new Error("Existing program structure could not be cleared");
  }

  for (const week of programData.weeks) {
    for (const day of week.days) {
      const { data: workout, error: workoutErr } = await supabase
        .from("workouts")
        .insert({
          program_id: programId,
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
          throw new Error("Exercise could not be created");
        }
      }
    }
  }

  revalidatePath(`/clients/${programData.clientId}`);
  redirect(`/clients/${programData.clientId}/programs/${programId}`);
}

export async function updateCoachName(fullName) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    console.log(error);
    throw new Error("Profile could not be updated");
  }

  revalidatePath("/profile");
}

export async function createInvitation({ firstName, lastName, email }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: coach } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: invitation, error } = await supabase
    .from("invitations")
    .insert({
      coach_id: user.id,
      first_name: firstName,
      last_name: lastName,
      email,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Invitation could not be created");
  }

  console.log("invitation", invitation);

  const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/login?invite=${invitation.token}`;

  const { error: emailError } = await resend.emails.send({
    from: "Rungs <onboarding@resend.dev>",
    to: email,
    subject: `${coach?.full_name ?? "Your coach"} invited you to Rungs`,
    html: `<p>You've been invited to train with ${coach?.full_name ?? "your coach"} on Rungs. </p><p><a href="${inviteUrl}">Accept invitation</a></p>`,
  });

  if (emailError) {
    console.error(emailError);
  }

  return inviteUrl;
}
