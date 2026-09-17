"use client";

import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import CoachProfile from "./CoachProfile";
import { usePageTitle } from "./PageTitleContext";

function DashboardHeader({ coach }) {
  const pathname = usePathname();
  const { title } = usePageTitle();

  const isClientDetailPage = /^\/clients\/[0-9a-f-]{36}$/.test(pathname);
  const isLoading = isClientDetailPage && title === null;

  const heading = title ?? pathname.slice(1);

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-steel">
      {isLoading ? (
        <div className="h-6 w-40 bg-steel rounded-xl animate-pulse" />
      ) : (
        <h2 className="capitalize">/ {heading}</h2>
      )}

      <div className="flex items-center gap-3">
        <SearchBar />
        <CoachProfile coach={coach} />
      </div>
    </div>
  );
}

export default DashboardHeader;
