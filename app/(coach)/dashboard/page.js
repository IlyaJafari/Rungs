import { getClients, getPersonalNotes } from "@/app/_lib/data-service";
import Stats from "@/app/_components/Stats";
import AthleteSummaryTable from "@/app/_components/AthleteSummaryTable";
import TakeNotes from "@/app/_components/TakeNotes";
import AttentionList from "@/app/_components/AttentionList";

export const metadata = {
  title: "Dashboard",
};

async function Page() {
  const clients = await getClients();
  const personalNotes = await getPersonalNotes();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-medium ">Manage Work</h1>

      <Stats />

      <AthleteSummaryTable clients={clients} />

      <div className="flex flex-col md:grid grid-cols-2 gap-4">
        <TakeNotes notes={personalNotes} />
        <AttentionList />
      </div>
    </div>
  );
}

export default Page;
