import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // service_role key — server-side only, bypasses RLS
);

// --- Your mock data, trimmed to what's actually needed to seed real rows ---
const athletes = [
  {
    id: "ATH-0001",
    name: "Ana K.",
    program: "Hypertrophy Ph. II",
    lastWeightKg: 82.5,
  },
  {
    id: "ATH-0002",
    name: "Marcus T.",
    program: "Peak Strength",
    lastWeightKg: 124.0,
  },
  {
    id: "ATH-0003",
    name: "Priya S.",
    program: "Mobility & GPP",
    lastWeightKg: 58.0,
  },
  {
    id: "ATH-0004",
    name: "James L.",
    program: "Olympic Lifting",
    lastWeightKg: 91.2,
  },
  {
    id: "ATH-0005",
    name: "Elena R.",
    program: "Post-Op Rehab",
    lastWeightKg: 65.4,
  },
  {
    id: "ATH-0006",
    name: "Tomas B.",
    program: "Base Strength",
    lastWeightKg: 98.6,
  },
];

// Helper: makes a fake-but-valid email from a name + id so createUser doesn't collide
function emailFor(athleteId) {
  return `${athleteId.toLowerCase()}@seed.rungs.dev`;
}

async function createAuthUser(email) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: "seed-only-temp-pw-123!",
    email_confirm: true,
  });
  if (error) throw error;
  return data.user.id;
}

async function seedCoach() {
  const email = "coach.demo@seed.rungs.dev";
  const userId = await createAuthUser(email);

  const { error: profileErr } = await supabase.from("profiles").insert({
    id: userId,
    role: "coach",
    full_name: "Demo Coach",
  });
  if (profileErr) throw profileErr;

  console.log("Coach profile created:", userId);
  return userId;
}

async function seedAthlete(athlete, coachId) {
  const email = emailFor(athlete.id);
  const userId = await createAuthUser(email);

  // profile
  const { error: profileErr } = await supabase.from("profiles").insert({
    id: userId,
    role: "athlete",
    full_name: athlete.name,
  });
  if (profileErr) throw profileErr;

  // client (links athlete's profile to the coach)
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .insert({ profile_id: userId, coach_id: coachId, status: "active" })
    .select()
    .single();
  if (clientErr) throw clientErr;

  // program
  const { data: program, error: programErr } = await supabase
    .from("programs")
    .insert({
      client_id: client.id,
      name: athlete.program,
      status: "active",
      start_date: "2026-08-01",
    })
    .select()
    .single();
  if (programErr) throw programErr;

  // workout
  const { data: workout, error: workoutErr } = await supabase
    .from("workouts")
    .insert({
      program_id: program.id,
      week_number: 1,
      day_number: 1,
      name: "Session 1",
    })
    .select()
    .single();
  if (workoutErr) throw workoutErr;

  // exercise
  const { data: exercise, error: exerciseErr } = await supabase
    .from("exercises")
    .insert({
      workout_id: workout.id,
      name: "Main Lift",
      target_sets: 3,
      target_reps: 8,
      target_weight: athlete.lastWeightKg,
    })
    .select()
    .single();
  if (exerciseErr) throw exerciseErr;

  // logged set
  const { error: setErr } = await supabase.from("logged_sets").insert({
    exercise_id: exercise.id,
    client_id: client.id,
    set_number: 1,
    actual_reps: 8,
    actual_weight: athlete.lastWeightKg,
    actual_rpe: 7.5,
  });
  if (setErr) throw setErr;

  console.log(`Seeded ${athlete.name} (${athlete.id})`);
}

async function main() {
  const coachId = await seedCoach();

  for (const athlete of athletes) {
    await seedAthlete(athlete, coachId);
  }

  console.log("All done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
