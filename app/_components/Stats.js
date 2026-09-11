import { Clock5, Group, Pulse, Running } from "@boxicons/react";
import { getClients } from "../_lib/data-service";

async function Stats() {
  const clients = await getClients();

  return (
    <div className="md:grid md:grid-cols-4 flex flex-col gap-5">
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-sm">total athletes</span>
          <span className="font-mono text-xl">{clients.length}</span>
        </div>
        <Group className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-sm">avg. compliance</span>
          <span className="font-mono text-xl">84.2%</span>
        </div>
        <Pulse className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-sm">active sessions</span>
          <span className="font-mono text-xl">12</span>
        </div>
        <Clock5 className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-sm">ready to train</span>
          <span className="font-mono text-xl">8</span>
        </div>
        <Running className="text-slate" />
      </div>
    </div>
  );
}

export default Stats;
