"use client";

import { CalendarAlt, ChartTrend, HomeAlt, User } from "@boxicons/react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

function ClientSidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:justify-between sticky top-0 h-screen gap-9 px-5 py-8 border-r border-steel">
      <div className="flex flex-col gap-9">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex flex-col gap-2">
          <NavLink
            href="/home"
            className="flex items-center gap-2 p-4 text-slate"
          >
            <HomeAlt />
            <span>Home</span>
          </NavLink>
          <NavLink
            href="/program"
            className="flex items-center gap-2 p-4 text-slate"
          >
            <CalendarAlt />
            <span>My Program</span>
          </NavLink>
          <NavLink
            href="/program"
            className="flex items-center gap-2 p-4 text-slate"
          >
            <ChartTrend />
            <span>Progress</span>
          </NavLink>
          <NavLink
            href="/program"
            className="flex items-center gap-2 p-4 text-slate"
          >
            <User />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>

      <SignOutButton />
    </aside>
  );
}

export default ClientSidebar;
