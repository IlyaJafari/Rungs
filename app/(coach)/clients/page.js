import AthleteTable from "@/app/_components/AthleteTable";
import { getClients } from "@/app/_lib/data-service";

export const metadata = {
  title: "Athletes",
};

async function page() {
  const clients = await getClients();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-medium">Manage Athletes.</h1>

      <AthleteTable clients={clients} />
    </div>
  );
}

export default page;
