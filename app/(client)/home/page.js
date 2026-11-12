import FromCoach from "@/app/_components/FromCoach";
import RecentProgram from "@/app/_components/RecentTraining";
import TodaysSession from "@/app/_components/TodaysSession";
import { formatWorkoutDate } from "@/app/_utils/helpers";
import { getOwnClientRecord } from "@/app/_lib/data-service";
import { Moon } from "@boxicons/react";

async function Page() {
  const client = await getOwnClientRecord();
  const firstName = client?.profiles?.full_name.split(" ")[0] ?? "Together";

  const date = new Date();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-slate font-semibold">
          {formatWorkoutDate(date)}
        </p>
        <h1 className="text-3xl font-semibold">
          Let&apos;s get stronger, {firstName}
        </h1>
      </div>

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
