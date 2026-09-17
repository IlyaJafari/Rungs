import ProgramEditor from "@/app/_components/ProgramEditor";
import SetPageTitle from "@/app/_components/SetPageTitle";
import { getClient, getProgramWithWeeks } from "@/app/_lib/data-service";

async function Page({ params }) {
  const { programId } = await params;
  const program = await getProgramWithWeeks(programId);
  const client = await getClient(program.client_id);

  return (
    <div className="flex flex-col gap-8">
      <SetPageTitle title="Program" />

      <h1 className="text-4xl font-medium">Edit Program</h1>
      <ProgramEditor
        program={program}
        clientName={client.profiles?.full_name}
      />
    </div>
  );
}

export default Page;
