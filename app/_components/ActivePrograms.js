import { BoltAlt, Calendar, ChevronRight, DumbbellAlt } from "@boxicons/react";
import { getPrograms } from "../_lib/data-service";
import { getActiveProgram } from "../_utils/helpers";
import Link from "next/link";

async function ActivePrograms({ client }) {
  const programs = await getPrograms(client.id);
  const activeProgram = getActiveProgram(programs);

  return (
    <div className="border-2 border-steel rounded-xl">
      <div className="flex items-center justify-between gap-2 p-4 border-b-2 border-steel">
        <div className="flex items-center gap-2">
          <BoltAlt fill="#2e4c6d" />
          <h3 className="text-sm md:text-lg uppercase">active programs</h3>
        </div>
        <Link
          href={`/clients/${client.id}/programs`}
          className="flex items-center gap-1 bg-iron text-sm text-paper p-3 md:px-4 md:py-2 rounded-xl"
        >
          <span className="hidden md:inline-block font-medium">View all</span>
          <ChevronRight width={16} height={16} />
        </Link>
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
