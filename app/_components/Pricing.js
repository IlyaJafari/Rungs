import { Check } from "@boxicons/react";
import Link from "next/link";

function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-5 mb-10">
        <span className="text-sm text-iron">PRICING PLANS</span>
        <h2 className="text-3xl font-medium">
          Built for professional scaling.
        </h2>
        <span className="text-slate">
          Simple, transparent pricing for coaches at any stage of their career.
          Start for free and upgrade as your roster grows.
        </span>
      </div>

      <div className="flex flex-col gap-5 md:grid grid-cols-2">
        <div className="flex flex-col gap-10 p-8 border border-steel rounded-xl">
          <div>
            <h4 className="text-xl font-medium mb-1">Free</h4>
            <div>
              <span className="font-mono text-3xl font-bold">$0</span>
              <span className="text-slate"> /mo</span>
            </div>
          </div>
          <span className="text-slate">
            Perfect for individual practitioners getting started with
            hight-precision tracking.
          </span>
          <ul className="flex flex-col gap-3">
            <li className="flex gap-2 items-center">
              <Check /> 14-day free trial
            </li>
            <li className="flex gap-2 items-center">
              <Check /> limited access
            </li>
          </ul>
          <Link
            href="#"
            className="mt-auto w-full text-center px-6 py-3 rounded-xl border-2 border-steel hover:text-slate transition-colors"
          >
            Start 14-day trial
          </Link>
        </div>

        <div className="flex flex-col gap-10 p-8 border-2 border-iron rounded-xl">
          <div>
            <h4 className="text-xl font-medium mb-1">Pro</h4>
            <div>
              <span className="font-mono text-3xl font-bold">$49</span>
              <span className="text-slate"> /mo</span>
            </div>
          </div>
          <span>
            Full suite tools for professional coaches managing a
            high-performance roster.
          </span>
          <ul className="flex flex-col gap-3">
            <li class="flex gap-2 items-center">
              <Check /> Build and manage training programs
            </li>
            <li class="flex gap-2 items-center">
              <Check /> Unlimited active clients
            </li>
            <li class="flex gap-2 items-center">
              <Check /> Client set logging
            </li>
            <li class="flex gap-2 items-center">
              <Check /> Progress tracking
            </li>
            <li class="flex gap-2 items-center">
              <Check /> Program editing
            </li>
            <li class="flex gap-2 items-center">
              <Check /> Coach-client workflow
            </li>
          </ul>
          <Link
            href="#"
            className="text-paper font-medium bg-iron px-6 py-3 mt-auto w-full text-center rounded-xl border-2 border-transparent hover:border-iron hover:bg-paper hover:text-iron transition-colors "
          >
            Choose Pro
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
