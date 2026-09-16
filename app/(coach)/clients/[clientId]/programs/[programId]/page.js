import { getWorkoutsForWeek } from "@/app/_lib/data-service";

async function Page({ params, searchParams }) {
  const { clientId, programId } = await params;
  const { week } = await searchParams;
  const selectedWeek = Number(week) || 1;

  const workouts = await getWorkoutsForWeek(programId, selectedWeek);

  console.log(workouts);

  return <div>Hello</div>;
}

export default Page;
