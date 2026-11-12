import ProgramOverview from "@/app/_components/ProgramOverview";
import { getOwnClientRecord } from "@/app/_lib/data-service";

async function Page({ searchParams }) {
  const { week } = searchParams;

  const client = await getOwnClientRecord();

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

      <ProgramOverview week={week} />
    </div>
  );
}

export default Page;
