import ProgramOverview from "@/app/_components/ProgramOverview";
import Tips from "@/app/_components/Tips";
import WeekSelector from "@/app/_components/WeekSelector";
import WorkoutForWeek from "@/app/_components/WorkoutForWeek";
import {
  getOwnClientRecord,
  getActiveProgramOverview,
} from "@/app/_lib/data-service";

async function Page({ searchParams }) {
  const { week } = await searchParams;

  const client = await getOwnClientRecord();
  const program = await getActiveProgramOverview(client.id);

  const selectedWeek = Number(week) || program.currentWeek;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-slate font-semibold text-xs uppercase">
          your training plan
        </p>
        <h1 className="font-semibold text-3xl">My Program</h1>
        <p className="text-slate text-sm">
          Built by {client?.coach.full_name}.
        </p>
      </div>

      <ProgramOverview program={program} />

      <WeekSelector
        weekNumbers={program.weekNumbers}
        selectedWeek={selectedWeek}
        currentWeek={program.currentWeek}
        weekProgress={program.weekProgress}
      />

      <WorkoutForWeek programId={program.id} selectedWeek={selectedWeek} />

      <Tips coachName={client.coach.full_name} />
    </div>
  );
}

export default Page;
