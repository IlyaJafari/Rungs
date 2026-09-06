"use client";

import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - scrollY.getPrevious();
    setHidden(diff > 0 && current > 100);
  });

  return (
    <motion.header
      initial={{ y: "0%" }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 x-50 z-99 bg-paper border-b border-steel"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 ">
          <Logo />

          <div className="hidden md:block">
            <ul className="flex gap-8">
              <li className="hover:text-slate">
                <Link href="#">Features</Link>
              </li>
              <li className="hover:text-slate">
                <Link href="#">Pricing</Link>
              </li>
              <li className="hover:text-slate">
                <Link href="#">About</Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="hover:text-slate">
              Sign In
            </Link>
            <Link
              href="#"
              className="bg-iron text-paper border-2 border-transparent px-4 py-2 rounded-xl hover:bg-paper hover:text-iron hover:border-iron transition-colors"
            >
              Get Started
            </Link>
          </div>

          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
