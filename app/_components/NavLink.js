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
      className={`flex items-center gap-2 pl-3 py-2 rounded-xl ${isColoredButton ? "text-iron" : ""} ${isSelected ? "bg-paper" : ""}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
