"use client";

import { usePathname } from "next/navigation";
import { usePageTitle } from "./PageTitleContext";
import { formatWorkoutDate } from "../_utils/helpers";
import Profile from "./Profile";

function ClientHeader({ client }) {
  const pathname = usePathname();
  const { title } = usePageTitle();

  const isLoading = title === null;
  const heading = title ?? pathname.slice(1);

  const date = new Date();

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-steel">
      {isLoading ? (
        <div className="h-6 w-40 bg-steel rounded-xl animate-pulse" />
      ) : (
        <h2 className="capitalize text-sm text-slate font-medium">
          / {heading}
        </h2>
      )}

      <div className="flex items-center gap-3">
        <p className="text-sm text-slate">{formatWorkoutDate(date)}</p>
        <Profile profile={client} />
      </div>
    </div>
  );
}

export default ClientHeader;
