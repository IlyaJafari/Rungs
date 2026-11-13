import { format } from "date-fns";
import ProgramProgress from "./ProgramProgress";

async function ProgramOverview({ program }) {
  if (!program) return <p>No active program yet.</p>;

  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-steel p-4.5">
      <div>
        <p className="text-iron font-semibold text-xs uppercase">
          {program.totalWeeks}-week strength block
        </p>
        <p className="font-semibold text-2xl">{program.name}</p>
        <p className="text-slate text-sm">
          {format(new Date(program.start_date), "MMM d")} –{" "}
          {format(program.endDate, "MMM d, yyyy")} · {program.sessionsPerWeek}{" "}
          sessions per week
        </p>
      </div>

      <ProgramProgress program={program} />

      <p className="text-slate text-sm">
        Build confidence in the main lifts, add weight gradually, and leave a
        little in the tank.
      </p>
    </div>
  );
}

export default ProgramOverview;
