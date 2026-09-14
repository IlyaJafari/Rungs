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
