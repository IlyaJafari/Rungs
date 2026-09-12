"use client";

import { motion } from "motion/react";
import Link from "next/link";

function CTASection() {
  return (
    <motion.div
      initial={{
        clipPath: "inset(100% 0 0 0)",
      }}
      whileInView={{
        clipPath: "inset(0 0 0 0)",
      }}
      viewport={{
        once: true,
        amount: "some",
      }}
      transition={{
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="bg-ink text-paper py-24 px-6 md:px-24 text-center flex flex-col items-center gap-5"
    >
      <h2 className="text-4xl md:text-5xl font-medium text-center">
        Ready to professionalize you performance workflow?
      </h2>
      <span className="text-steel text-sm md:text-base">
        Join the new standard in strength and conditioning. Start building your
        first program today.
      </span>
      <div className="flex gap-3 items-center justify-center">
        <Link
          href="#"
          className="px-6 py-3 bg-iron rounded-xl border-2 border-transparent hover:bg-transparent hover:border-iron transition-colors"
        >
          Start Free Trial
        </Link>
        <Link
          href="#"
          className="px-6 py-3 border-2 border-steel rounded-xl hover:border-transparent transition-all"
        >
          Contact Sales
        </Link>
      </div>
    </motion.div>
  );
}

export default CTASection;
