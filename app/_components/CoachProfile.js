"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import SignOutButtonProfile from "./SignOutButtonProfile";
import { PlusCircle, UserCircle } from "@boxicons/react";
import Link from "next/link";

function CoachProfile({ coach }) {
  function getInitials(fullName) {
    if (!fullName) return "?";
    return fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 outline-none cursor-pointer">
          {coach?.avatar_url ? (
            <img
              src={coach.avatar_url}
              alt="Avatar"
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-xl object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-iron-100 flex items-center justify-center text-sm font-medium">
              {getInitials(coach?.full_name)}
            </div>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="min-w-[180px] bg-paper border border-steel rounded-xl shadow-md p-1 z-50 data-[side=bottom]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=top]:animate-slideUpAndFade data-[side=right]:animate-slideRightAndFade"
        >
          <DropdownMenu.Item className="flex items-center gap-2 font-medium px-3 py-2 text-sm rounded-lg cursor-pointer outline-none hover:bg-slate/10">
            <UserCircle height={16} width={16} />
            {coach?.full_name}
          </DropdownMenu.Item>

          <DropdownMenu.Item className="font-medium px-3 py-2 text-sm rounded-lg cursor-pointer outline-none hover:bg-slate/10">
            <Link href="/invite" className="flex items-center gap-2">
              <PlusCircle height={16} width={16} />
              Add client
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-steel my-1" />

          <DropdownMenu.Item asChild>
            <SignOutButtonProfile />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default CoachProfile;
