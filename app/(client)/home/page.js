import { getOwnClientRecord } from "@/app/_lib/data-service";

async function Page() {
  const client = await getOwnClientRecord();
  const firstName = client?.profiles?.full_name.split(" ")[0] ?? "Together";

  return (
    <div>
      <h1 className="text-4xl font-medium">
        Let&apos;s get stronger, {firstName}
      </h1>
    </div>
  );
}

export default Page;
