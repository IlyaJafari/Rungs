import { Calendar, ChartLine, ClipboardDetail } from "@boxicons/react";

function Capabilities() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-5 items-start mb-10">
        <span className="text-sm text-iron">CORE CAPABILITIES</span>
        <h2 className="text-3xl font-medium">
          Designed for practitioners, not influencers.
        </h2>
        <span className="text-slate">
          Stop battling with templates and disorganized messages. Rungs provides
          a high-precision toolset for coaches who value data integrity and
          athlete results.
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-10 py-8 px-10 border border-steel rounded-xl">
        <div className="flex flex-col gap-3 items-start md:[&:not(:nth-child(3n))]:border-r md:[&:not(:nth-child(3n))]:border-steel pr-10">
          <Calendar
            width={36}
            height={36}
            className="bg-steel p-1.5 rounded-lg"
          />
          <h4 className="font-medium text-xl">Build Programs</h4>
          <span className="text-slate">
            Crete modular, periodized training cycles with our high-speed
            builder, save blocks as templates and deploy to athletes in seconds.
          </span>
        </div>

        <div className="flex flex-col gap-3 items-start md:[&:not(:nth-child(3n))]:border-r md:[&:not(:nth-child(3n))]:border-steel pr-10">
          <ClipboardDetail
            width={36}
            height={36}
            className="bg-steel p-1.5 rounded-lg"
          />
          <h4 className="font-medium text-xl">Log Every Set</h4>
          <span className="text-slate">
            Athletes use a clean, distraction-free interface to log volume,
            intensity, and RPE. No more scrolling through group chats.
          </span>
        </div>

        <div className="flex flex-col gap-3 items-start">
          <ChartLine
            width={36}
            height={36}
            className="bg-steel p-1.5 rounded-lg"
          />
          <h4 className="font-medium text-xl">Track Progress</h4>
          <span className="text-slate">
            Automated analytics visualize progress across strength, power, and
            readiness metrics with industrial precision.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Capabilities;
