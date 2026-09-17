import SetPageTitle from "@/app/_components/SetPageTitle";
import { getPrograms } from "@/app/_lib/data-service";
import { StatusBadge } from "@/app/_utils/helpers";
import { Calendar, ChevronRight, DumbbellAlt } from "@boxicons/react";
import Link from "next/link";

export const metadata = {
  title: "Programs",
};

async function Page({ params }) {
  const { clientId } = await params;
  const programs = await getPrograms(clientId);

  return (
    <div className="flex flex-col gap-6">
      <SetPageTitle title="Programs" />

      <h1 className="text-4xl font-medium">Programs.</h1>

      <div className="flex flex-col gap-3">
        {programs?.length > 0 ? (
          programs.map((program) => (
            <Link
              key={program.id}
              href={`/clients/${clientId}/programs/${program.id}`}
              className="flex items-center justify-between rounded-xl border-2 border-steel p-4 transition-colors hover:bg-steel/30"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <DumbbellAlt fill="#2e4c6d" />
                  <span className="text-xl font-medium">{program.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar fill="#2e4c6d" />
                  <span className="text-slate">{program.start_date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <StatusBadge status={program.status} />
                <ChevronRight />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-slate">No programs found.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
