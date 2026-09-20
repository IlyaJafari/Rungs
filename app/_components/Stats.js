import { Bell, DumbbellAlt, Group, ListUl } from "@boxicons/react";
import {
  getActiveProgramCount,
  getClients,
  getClientsNeedingAttention,
  getSetsLoggedThisWeek,
} from "../_lib/data-service";

async function Stats() {
  const [clients, needingAttention, setsThisWeek, activePrograms] =
    await Promise.all([
      getClients(),
      getClientsNeedingAttention(),
      getSetsLoggedThisWeek(),
      getActiveProgramCount(),
    ]);

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
          <span className="uppercase text-sm">active program</span>
          <span className="font-mono text-xl">{activePrograms}</span>
        </div>
        <ListUl className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-sm">sets logged</span>
          <span className="font-mono text-xl">{setsThisWeek}</span>
        </div>
        <DumbbellAlt className="text-slate" />
      </div>
      <div className="flex justify-between gap-5 border-2 border-steel rounded-xl py-3 px-6">
        <div className="flex flex-col">
          <span className="uppercase text-sm">need attention</span>
          <span className="font-mono text-xl">{needingAttention.length}</span>
        </div>
        <Bell className="text-slate" />
      </div>
    </div>
  );
}

export default Stats;
