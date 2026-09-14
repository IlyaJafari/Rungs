import { Clock5, Pulse } from "@boxicons/react";
import { timeAgo } from "../_utils/helpers";

function RecentActivity({ activity }) {
  return (
    <div className="rounded-xl border-2 border-steel">
      <div className="flex items-center gap-2 p-4 border-b-2 border-steel">
        <Clock5 />
        <h3 className="text-lg uppercase">Recent Activity</h3>
      </div>
      <div className="divide-y divide-steel">
        {activity.map((event, i) => (
          <div key={i} className="flex gap-4 items-center p-4">
            <div className="bg-steel p-2 rounded-xl">
              <Pulse fill="#6b6a63" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium uppercase text-xs text-iron">
                  {event.title}
                </span>
                <span className="text-xs text-slate">
                  {timeAgo(new Date(event.timestamp).toLocaleDateString())}
                </span>
              </div>
              <p className="mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
