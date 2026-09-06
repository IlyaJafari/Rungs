import { QuoteRight } from "@boxicons/react";
import Image from "next/image";

function Metrics() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-5 md:grid grid-cols-2 ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <span className="text-sm text-iron">IMPACT METRICS</span>
            <h2 className="text-3xl font-medium">
              Trusted by world-class practitioners.
            </h2>
          </div>
          <div className="flex flex-col gap-5 py-5 md:grid grid-cols-2 grid-rows-2">
            <div className="flex flex-col justify-center gap-0.5 border-steel p-5 border-b-2 md:border-b-0 md:border-l-2">
              <h4 className="font-medium font-mono">12.500+</h4>
              <span className="text-slate font-bold">PROGRAM BUILT</span>
              <span className="text-slate">
                High-precision cycles generated annually
              </span>
            </div>
            <div className="flex flex-col justify-center gap-0.5 border-steel p-5 border-b-2 md:border-b-0 md:border-l-2">
              <h4 className="font-medium font-mono">98.4%</h4>
              <span className="text-slate font-bold">LOGGING COMPLIANCE</span>
              <span className="text-slate">
                Average athletes engagement rate
              </span>
            </div>
            <div className="flex flex-col justify-center gap-0.5 border-steel p-5 border-b-2 md:border-b-0 md:border-l-2">
              <h4 className="font-medium font-mono">4.8/5</h4>
              <span className="text-slate font-bold">COACH RATING</span>
              <span className="text-slate">Based on workflow efficiency</span>
            </div>
            <div className="flex flex-col justify-center gap-0.5 border-steel p-5 border-b-2 md:border-b-0 md:border-l-2">
              <h4 className="font-medium font-mono">24/7</h4>
              <span className="text-slate font-bold">DATA INTEGRITY</span>
              <span className="text-slate">Secure performance data cloud</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 border-2 border-steel rounded-xl p-5">
            <QuoteRight fill="#e2e0d9" height={36} width={36} />
            <span className="italic">
              &quot;Rungs took my coaching from a chaotic mix of apps and
              spreadsheets to single source of truth. My athletes love the
              interface, and my programming speed has doubled.&quot;
            </span>
            <div className="flex items-center gap-3 pt-5 border-t border-steel">
              <Image
                src="/testimonial1.jpg"
                alt="testimonial avatar"
                width={56}
                height={56}
                className="rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium">MARCUS THRONE</span>
                <span className="text-sm text-slate">Head Strength Coach</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-2 border-steel rounded-xl p-5">
            <QuoteRight fill="#e2e0d9" height={36} width={36} />
            <span className="italic">
              &quot;The ability to see real-time volume tracking without chasing
              clients over DM is a game changer. It&apos;s the first tool that
              actually feels like it was designed by a coach.&quot;
            </span>
            <div className="flex items-center gap-3 pt-5 border-t border-steel">
              <Image
                src="/testimonial2.jpg"
                alt="testimonial avatar"
                width={56}
                height={56}
                className="rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium">SARAH JENKINS</span>
                <span className="text-sm text-slate">Performance Director</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
