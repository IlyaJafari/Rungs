"use client";

import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { Bell, PlusCircle } from "@boxicons/react";
import Link from "next/link";
import CoachProfile from "./CoachProfile";

function DashboardHeader({ coach }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-steel">
      <h2 className="capitalize">/ {pathname.slice(1)}</h2>

      <div className="flex items-center gap-3">
        <SearchBar />
        {/* <Link
          href="/invite"
          className="flex items-center gap-2 p-2 rounded-xl border-2 border-steel hover:text-slate transition-colors"
        >
          <PlusCircle />
          <span>Add Client</span>
        </Link> */}
        <CoachProfile coach={coach} />
      </div>
    </div>
  );
}

export default DashboardHeader;
