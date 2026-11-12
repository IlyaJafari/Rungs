"use client";

import { usePathname } from "next/navigation";
import { usePageTitle } from "./PageTitleContext";
import Profile from "./Profile";
import Logo from "./Logo";

function ClientHeader({ profile }) {
  const pathname = usePathname();
  const { title } = usePageTitle();

  const isLoading = title === null;
  const heading = title ?? pathname.slice(1);

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-steel">
      <div className="md:hidden">
        <Logo />
      </div>

      {isLoading ? (
        <div className="h-6 w-40 bg-steel rounded-xl animate-pulse hidden md:block" />
      ) : (
        <h2 className="capitalize text-sm text-slate font-medium hidden md:block">
          / {heading}
        </h2>
      )}

      <div className="flex items-center gap-3">
        <Profile profile={profile} />
      </div>
    </div>
  );
}

export default ClientHeader;
