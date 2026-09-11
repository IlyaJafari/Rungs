"use client";

import Image from "next/image";
import { useState } from "react";

const PAGE_SIZE = 5;

function getInitials(fullName) {
  if (!fullName) return "?";
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ client }) {
  return client.avatarUrl ? (
    <Image
      src={client.avatarUrl}
      alt="user avatar"
      width={32}
      height={32}
      className="rounded-full"
    />
  ) : (
    <div className="w-8 h-8 flex items-center justify-center bg-iron-100 text-iron-600 text-xs font-medium rounded-full shrink-0">
      {getInitials(client.profiles?.full_name)}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-moss-100 text-moss",
    invited: "bg-slate/20 text-slate",
    archived: "bg-rust-100 text-rust",
  };

  return (
    <span className={`rounded-xl px-2 py-1 text-sm ${styles[status] ?? ""}`}>
      {status}
    </span>
  );
}

function getActiveProgram(programs) {
  if (!programs || programs.length === 0) return null;
  return programs.find((p) => p.status === "active") ?? programs[0];
}

function AthleteSummaryTable({ clients }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(clients.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageData = clients.slice(startIndex, startIndex + PAGE_SIZE);

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  return (
    <>
      {/* DesktoP */}
      <div className="hidden md:block rounded-xl overflow-hidden border border-steel">
        <table className="w-full">
          <thead>
            <tr className="bg-slate text-steel">
              <th className="text-left px-4 py-4 font-normal">Athletes</th>
              <th className="text-left px-4 py-4 font-normal">
                Current Program
              </th>
              <th className="text-left px-4 py-4 font-normal">Joined</th>
              <th className="text-left px-4 py-4 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel">
            {pageData.map((client) => {
              const program = getActiveProgram(client.programs);
              return (
                <tr key={client.id}>
                  <td className="text-left font-medium px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar client={client} />
                      <div className="flex flex-col">
                        <span>{client.profiles?.full_name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left px-4 py-4">
                    {program ? (
                      <div className="flex flex-col">
                        {program.name}
                        <span className="text-xs text-slate">
                          {program.status}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate">
                        No active program
                      </span>
                    )}
                  </td>
                  <td className="text-left px-4 py-4">
                    {new Date(client.joined_at).toLocaleDateString()}
                  </td>
                  <td className="text-left px-4 py-2">
                    <StatusBadge status={client.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {pageData.map((client) => {
          const program = getActiveProgram(client.programs);
          return (
            <div
              key={client.id}
              className="rounded-xl border border-steel p-4 bg-paper"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar client={client} />
                  <div className="flex flex-col">
                    <span className="font-medium text-ink">
                      {client.profiles?.full_name}
                    </span>
                  </div>
                </div>
                <StatusBadge status={client.status} />
              </div>

              <div className="mt-3 text-sm">
                {program ? (
                  <>
                    <div className="text-light-ink">{program.name}</div>
                    <div className="text-xs text-slate">{program.status}</div>
                  </>
                ) : (
                  <div className="text-xs text-slate">No active program</div>
                )}
              </div>

              <div className="mt-1 text-xs text-slate">
                Joined {new Date(client.joined_at).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-slate">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm rounded-md border border-steel disabled:opacity-40 disabled:cursor-not-allowed hover:bg-steel/40 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm rounded-md border border-steel disabled:opacity-40 disabled:cursor-not-allowed hover:bg-steel/40 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AthleteSummaryTable;
