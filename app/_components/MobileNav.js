"use client";

import { Dashboard, Group, FilePlus, PlusCircle } from "@boxicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNav() {
  const pathname = usePathname();

  const isActive = (href) => pathname.startsWith(href);

  const tabs = [
    { href: "/dashboard", label: "Dashboard", Icon: Dashboard },
    { href: "/clients", label: "Clients", Icon: Group },
    {
      href: "/program-editor/new-program",
      label: "ProgramEditor",
      Icon: FilePlus,
    },
    { href: "/invite", label: "Invite", Icon: PlusCircle },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-99 bg-steel border-t border-slate/10 flex justify-around items-center py-2">
      {tabs.map(({ href, label, Icon }) => {
        const active = isActive(href);
        const defaultFill =
          href === "/invite" ? "var(--color-iron)" : "var(--color-ink)";

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${active ? "bg-iron" : "bg-transparent"}`}
          >
            <Icon
              style={{ fill: active ? "var(--color-paper" : defaultFill }}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default MobileNav;
