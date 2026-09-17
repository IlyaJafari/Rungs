import ProgramEditor from "@/app/_components/ProgramEditor";
import { getClients } from "@/app/_lib/data-service";

async function Page() {
  const clients = await getClients();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-medium">New Program</h1>
      <ProgramEditor clients={clients} />
    </div>
  );
}

export default Page;
