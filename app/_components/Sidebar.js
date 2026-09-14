"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Dashboard, Group, HelpCircle, PlusCircle } from "@boxicons/react";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-col md:justify-between sticky top-0 h-screen bg-steel px-6 py-3">
      <div className="flex flex-col gap-2">
        <Link href="/dashboard" aria-label="Rungs home" className="pl-3 pb-3">
          <Logo />
        </Link>
        <NavLink href="/dashboard">
          <Dashboard />
          <span>Dashboard</span>
        </NavLink>
        <NavLink href="/clients">
          <Group />
          <span>Athletes</span>
        </NavLink>
        <NavLink href="/invite" coloredButton={true}>
          {<PlusCircle />} Add Client
        </NavLink>
      </div>

      <div className="flex flex-col gap-2">
        <NavLink href="/help">
          <HelpCircle />
          <span>Help</span>
        </NavLink>
        <SignOutButton />
      </div>
    </div>
  );
}

export default Sidebar;
