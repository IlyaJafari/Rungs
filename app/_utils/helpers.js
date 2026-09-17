import Image from "next/image";

export function getInitials(fullName) {
  if (!fullName) return "?";
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ client, width = 32, height = 32 }) {
  return client.avatarUrl ? (
    <Image
      src={client.avatarUrl}
      alt="user avatar"
      width={width}
      height={height}
      className="rounded-full"
    />
  ) : (
    <div
      style={{ width, height }}
      className="flex items-center justify-center bg-iron-100 text-iron-600 text-xs font-medium rounded-xl shrink-0"
    >
      {getInitials(client.profiles?.full_name)}
    </div>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    active: "border-2 border-moss-200 text-moss",
    invited: "border-2 border-iron/20 text-iron",
    archived: "border-2 border-rust-200 text-rust",
    completed: "border-2 border-slate/20 text-slate",
  };

  return (
    <span className={`rounded-xl px-2 py-1 text-sm ${styles[status] ?? ""}`}>
      {status}
    </span>
  );
}

export function getActiveProgram(programs) {
  if (!programs || programs.length === 0) return null;
  return programs.find((p) => p.status === "active") ?? programs[0];
}

export function timeAgo(timestamp) {
  if (!timestamp) return "Never";

  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
