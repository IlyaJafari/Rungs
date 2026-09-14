import { Check } from "@boxicons/react";

import Image from "next/image";
import Link from "next/link";
import CTASection from "../_components/CTASection";
import Pricing from "../_components/Pricing";
import Loop from "../_components/Loop";
import Capabilities from "../_components/Capabilities";
import Metrics from "../_components/Metrics";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import createClient from "../_lib/supabase";

async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header isLoggedIn={!!user} />
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full">
            <div className="flex flex-col gap-5 items-start">
              <span className="text-sm text-iron">
                PROFESSIONAL PERFORMANCE MANAGEMENT
              </span>
              <h1 className="text-3xl md:text-5xl font-semibold">
                Rungs replaces spreadsheet and Instagram DM workflows for
                strength coaches.
              </h1>
              <h3 className="text-slate">
                The only precision tool built specifically for high-performance
                practitioners. Move beyond fragmented systems to a unified
                platform for roster management, program delivery, and progress
                tracking.
              </h3>
              <Link
                href="#"
                className="bg-iron text-paper border-2 border-transparent px-6 py-3 rounded-lg hover:text-iron hover:bg-paper hover:border-iron transition-colors"
              >
                Get Started for Free &rarr;
              </Link>
            </div>
            <div className="relative w-full h-[300px] md:h-[380px]">
              <Image
                src="/hero.webp"
                alt="Hero image"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-10 py-6">
            <div className="flex gap-2 items-center">
              <Check fill="#6b6a63" />
              <span className="text-slate">no credit card</span>
            </div>
            <div className="flex gap-2 items-center">
              <Check fill="#6b6a63" />
              <span className="text-slate">14 days pro trial</span>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-20">
        <Capabilities />
      </section>

      <section id="rungs-loop" className="py-20">
        <Loop />
      </section>

      <section id="pricing" className="py-20">
        <Pricing />
      </section>

      <section className="py-20">
        <Metrics />
      </section>

      <section id="cta">
        <CTASection />
      </section>

      <footer className="py-6">
        <Footer />
      </footer>
    </>
  );
}

export default Page;
