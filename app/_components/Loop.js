import Image from "next/image";

function Loop() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-8 items-start">
          <span className="text-sm text-iron">THE RUNGS LOOP</span>
          <h2 className="text-3xl font-medium">
            A continuous cycle of performance optimization.
          </h2>
          <div className="flex flex-col items-start gap-5">
            <div className="flex gap-8">
              <span className="font-mono text-iron text-xl">01</span>
              <div>
                <h4 className="font-medium text-xl">Plan with Precision</h4>
                <span className="text-slate">
                  Define loading parameters, exercise selection, and specific
                  adaptations within technical framework
                </span>
              </div>
            </div>
            <div className="flex gap-8">
              <span className="font-mono text-iron text-xl">02</span>
              <div>
                <h4 className="font-medium text-xl">Execute & Train</h4>
                <span className="text-slate">
                  Athletes receive their prescription and provide immediate
                  feedback on training stress and execution quality.
                </span>
              </div>
            </div>
            <div className="flex gap-8">
              <span className="font-mono text-iron text-xl">03</span>
              <div>
                <h4 className="font-medium text-xl">Review & Analyze</h4>
                <span className="text-slate">
                  Compare intended vs. actual load. Identify trends in
                  performance and adjust the next block accordingly.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[300px] md:h-[380px]">
          <Image
            src="/rungs-loop.webp"
            alt="Rungs loop"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Loop;
