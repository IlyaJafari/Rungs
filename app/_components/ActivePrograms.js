import { BoltAlt, Calendar, DumbbellAlt } from "@boxicons/react";
import { getPrograms } from "../_lib/data-service";
import { getActiveProgram } from "../_utils/helpers";

async function ActivePrograms({ client }) {
  const programs = await getPrograms(client.id);
  const activeProgram = getActiveProgram(programs);
  console.log(activeProgram);

  return (
    <div className="border-2 border-steel rounded-xl">
      <div className="flex items-center gap-2 p-4 border-b-2 border-steel">
        <BoltAlt fill="#2e4c6d" />
        <h3 className="text-sm md:text-lg uppercase">active programs</h3>
      </div>
      <div className="p-4">
        {activeProgram ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <DumbbellAlt width={20} height={20} fill="#2e4c6d" />
              <span className="font-medium">{activeProgram?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar width={20} height={20} fill="#2e4c6d" />
              <span className="text-sm text-slate">
                {activeProgram?.start_date}
              </span>
            </div>
          </div>
        ) : (
          <span>No Active Programs</span>
        )}
      </div>
    </div>
  );
}

export default ActivePrograms;
