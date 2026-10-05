import TodaysSession from "@/app/_components/TodaysSession";
import { getOwnClientRecord } from "@/app/_lib/data-service";

async function Page() {
  const client = await getOwnClientRecord();
  const firstName = client?.profiles?.full_name.split(" ")[0] ?? "Together";

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">
        Let&apos;s get stronger, {firstName}
      </h1>

      <TodaysSession client={client} />
    </div>
  );
}

export default Page;
