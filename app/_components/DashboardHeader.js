"use client";

import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import CoachProfile from "./CoachProfile";

function DashboardHeader({ coach }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-steel">
      <h2 className="capitalize">/ {pathname.slice(1)}</h2>

      <div className="flex items-center gap-3">
        <SearchBar />
        <CoachProfile coach={coach} />
      </div>
    </div>
  );
}

export default DashboardHeader;
