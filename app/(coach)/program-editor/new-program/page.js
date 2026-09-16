import ProgramEditor from "@/app/_components/ProgramEditor";
import SetPageTitle from "@/app/_components/SetPageTitle";
import { getClients } from "@/app/_lib/data-service";

async function Page({ searchParams }) {
  const { clientId } = await searchParams;
  const clients = await getClients();

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <SetPageTitle title={`Program Editor`} />

      <h1 className="text-4xl font-medium">Create a Program.</h1>
      <ProgramEditor clients={clients} defaultClientId={clientId} />
    </div>
  );
}

export default Page;
