import { Clock5, Group, Pulse, Running } from "@boxicons/react";
import {
  getAvgIntensity,
  getBodyWeightLogs,
  getLastLoggedAt,
  getTotalVolume,
} from "../_lib/data-service";
import { timeAgo } from "../_utils/helpers";

async function ClientStats({ client }) {
  const weights = await getBodyWeightLogs(client.id);
  const latestWeight = weights.at(-1)?.weight;
  const avgIntensity = await getAvgIntensity(client.id);
  const totalVolume = await getTotalVolume(client.id);
  const lastLoggedAt = await getLastLoggedAt(client.id);

  return (
    <div className="md:grid md:grid-cols-4 flex flex-col gap-5">
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col justify-between">
          <span className="uppercase text-sm">bodyweight</span>
          <span className="font-mono text-xl">
            {latestWeight ?? "-"}
            <span className="text-sm"> KG</span>
          </span>
        </div>
        <Group className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col justify-between">
          <span className="uppercase text-sm">avg. intensity</span>
          <span className="font-mono text-xl">
            {avgIntensity !== null ? avgIntensity.toFixed(1) : "-"}
          </span>
        </div>
        <Pulse className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col justify-between">
          <span className="uppercase text-sm">total volume</span>
          <span className="font-mono text-xl">
            {(totalVolume / 1000).toFixed(0)}k
            <span className="text-sm"> KG</span>
          </span>
        </div>
        <Clock5 className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col justify-between">
          <span className="uppercase text-sm">last logged</span>
          <span className="font-mono text-xl">{timeAgo(lastLoggedAt)}</span>
        </div>
        <Running className="text-slate" />
      </div>
    </div>
  );
}

export default ClientStats;
