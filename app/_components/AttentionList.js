import { getClientsNeedingAttention } from "../_lib/data-service";

function getInitials(fullName) {
  if (!fullName) return "?";
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getSeverity(daysSince) {
  if (daysSince >= 14) return "severe";
  return "warning";
}

async function AttentionList() {
  const clients = await getClientsNeedingAttention();

  return (
    <div className="rounded-xl border border-steel bg-paper">
      <div className="flex items-center justify-between px-4 py-3 border-b border-steel">
        <span className="text-lg font-medium">Needs Attention</span>
        {clients.length > 0 && (
          <span className="text-xs font-mono bg-rust-100 text-rust-600 rounded-full px-2 py-0.5">
            {clients.length}
          </span>
        )}
      </div>

      {clients.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-slate">
          Every active client has logged recently.
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto divide-y divide-steel">
          {clients.map((client) => {
            const days = Math.floor(client.daysSince);
            const severity = getSeverity(client.daysSince);

            return (
              <div
                key={client.id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-iron-100 text-iron-600 flex items-center justify-center text-xs font-medium">
                    {getInitials(client.profiles?.full_name)}
                  </div>
                  <span className="font-medium truncate">
                    {client.profiles?.full_name}
                  </span>
                </div>

                <span
                  className={`shrink-0 text-xs font-mono rounded-full px-2 py-1 ${
                    severity === "severe"
                      ? "bg-rust-100 text-rust-600"
                      : "bg-slate/10 text-slate"
                  }`}
                >
                  {days}d ago
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AttentionList;
