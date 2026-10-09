import FromCoach from "@/app/_components/FromCoach";
import RecentProgram from "@/app/_components/RecentTraining";
import TodaysSession from "@/app/_components/TodaysSession";
import { getOwnClientRecord } from "@/app/_lib/data-service";
import { Moon } from "@boxicons/react";

async function Page() {
  const client = await getOwnClientRecord();
  const firstName = client?.profiles?.full_name.split(" ")[0] ?? "Together";

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">
        Let&apos;s get stronger, {firstName}
      </h1>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TodaysSession client={client} />

          <RecentProgram client={client} />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <FromCoach client={client} />

          <div className="flex gap-3 py-4 px-4.5 bg-steel rounded-xl">
            <Moon />
            <div>
              <p>Rest is part of the plan.</p>
              <p className="text-sm text-slate">
                Your weekend is for recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
