"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children, coloredButton }) {
  const pathname = usePathname();
  const isSelected = pathname === href;
  const isColoredButton = coloredButton === true;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 w-full px-4 p-3 rounded-xl transition-colors ${isColoredButton ? "text-iron" : ""} ${isSelected ? "bg-iron-100/80 text-iron font-semibold" : "text-slate hover:bg-iron-100/80 hover:text-iron"}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
