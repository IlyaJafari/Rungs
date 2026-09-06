"use client";

import { Menu, X } from "@boxicons/react";
import Link from "next/link";
import { useState } from "react";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="p-2"
      >
        <Menu fill="#1e1d1b" />
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-ink/50 z-40 transition-opacity dueation-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-paper z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>
        <ul className="flex flex-col gap-6 px-6">
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              Features
            </Link>
          </li>
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="bg-iron text-paper px-4 py-2 rounded-xl inline-block"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
