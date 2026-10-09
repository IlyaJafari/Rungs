"use client";

import {
  CalendarAlt,
  ChartTrend,
  Dashboard,
  FilePlus,
  Group,
  HomeAlt,
  PlusCircle,
  User,
} from "@boxicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_TABS = {
  coach: [
    { href: "/dashboard", label: "Dashboard", Icon: Dashboard },
    { href: "/clients", label: "Clients", Icon: Group },
    { href: "/programs/new", label: "Program Editor", Icon: FilePlus },
    { href: "/invite", label: "Invite", Icon: PlusCircle, accent: true },
  ],
  client: [
    { href: "/home", label: "Home", Icon: HomeAlt },
    { href: "/program", label: "My Program", Icon: CalendarAlt },
    { href: "/progress", label: "Progress", Icon: ChartTrend },
    { href: "/profile", label: "Profile", Icon: User },
  ],
};

function MobileNav({ variant = "coach" }) {
  const pathname = usePathname();

  const tabs = NAV_TABS[variant];

  const isActive = (href) => pathname.startsWith(href);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-99 bg-paper border-t border-steel flex justify-around items-center py-2">
      {tabs.map(({ href, label, Icon, accent }) => {
        const active = isActive(href);
        const defaultFill = accent ? "var(--color-iron)" : "var(--color-slate)";

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${active ? "bg-iron-100" : "bg-transparent"}`}
          >
            <Icon
              style={{ fill: active ? "var(--color-iron)" : defaultFill }}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default MobileNav;
