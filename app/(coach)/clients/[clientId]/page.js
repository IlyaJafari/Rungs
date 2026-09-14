import ClientStats from "@/app/_components/ClientStats";
import CoachSummary from "@/app/_components/CoachSummary";
import RecentActivity from "@/app/_components/RecentActivity";
import SetPageTitle from "@/app/_components/SetPageTitle";
import {
  getClient,
  getCoachNotes,
  getPrograms,
  getRecentActivity,
} from "@/app/_lib/data-service";
import { Avatar, StatusBadge } from "@/app/_utils/helpers";
import { ArrowOutUpRightSquare } from "@boxicons/react";
import Link from "next/link";

async function Page({ params }) {
  const { clientId } = await params;
  const [client, programs] = await Promise.all([
    getClient(clientId),
    getPrograms(clientId),
  ]);
  const coachNotes = await getCoachNotes(client.id);
  const activity = await getRecentActivity(clientId);

  return (
    <div className="flex flex-col gap-8">
      <SetPageTitle title={`Clients / ${client.profiles?.full_name}`} />

      <Link
        href="/clients"
        className="text-sm text-slate hover:underline uppercase"
      >
        &larr; Back to clients
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <Avatar client={client} width={64} height={64} />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl md:text-3xl font-bold">
              {client.profiles.full_name}
            </h3>
            <div>
              <StatusBadge status={client.status} />
            </div>
          </div>
        </div>
        <Link
          href="#"
          aria-label="Open program editor"
          className="flex items-center gap-2 text-sm bg-iron text-paper p-2 md:px-4 md:py-2 rounded-xl"
        >
          <ArrowOutUpRightSquare />
          <span className="hidden md:inline-block">Program Editor</span>
        </Link>
      </div>

      <ClientStats client={client} />

      <div className="flex flex-col gap-4 lg:grid grid-cols-3">
        <div className="lg:col-span-2">
          <CoachSummary coachNotes={coachNotes} client={client} />
        </div>

        <div className="lg:col-span-1">
          <RecentActivity activity={activity} />
        </div>
      </div>
    </div>
  );
}

export default Page;
