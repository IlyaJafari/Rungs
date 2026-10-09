import { getRecentTrainings } from "@/app/_lib/data-service";
import { CheckCircle } from "@boxicons/react";
import { format } from "date-fns";

async function RecentTraining({ client }) {
  const recentTraining = await getRecentTrainings(client.id);
  console.log(recentTraining);

  return (
    <div className="border border-steel rounded-xl">
      <div className="py-3.5 px-4.5 border-b border-steel">
        <p className="text-lg font-medium">Recent training</p>
      </div>

      <div className="flex flex-col divide-y divide-steel">
        {recentTraining.map((training) => (
          <div
            key={training.date}
            className="flex items-center justify-between p-4.5"
          >
            <div className="flex items-center gap-4">
              <p className="text-slate">{format(training.date, "MMM dd")}</p>

              <div>
                <p className="font-medium">{training.workoutName}</p>
                <div className="flex text-sm text-slate">
                  <p>
                    {training.setCount} sets · {training.volume} kg
                  </p>
                </div>
              </div>
            </div>

            <CheckCircle fill="#3f6b45" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTraining;
