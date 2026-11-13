function Tips({ coachName }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="flex flex-col border border-steel rounded-lg">
        <h2 className="font-semibold border-b border-steel px-4.5 py-3.5">
          How to progress
        </h2>

        <div className="flex flex-col gap-4 p-4.5">
          <p className="text-sm">
            When every set feels like RPE 7 or less, add 2.5 kg next time. If
            technique slips, keep tha same weight. {coachName.split(" ")[0]}{" "}
            will review your logs each week.
          </p>

          <p className="text-iron text-sm">
            RPE 7 = about 3 reps left in the tank.
          </p>
        </div>
      </div>

      <div className="flex flex-col border border-steel rounded-lg">
        <h2 className="font-semibold border-b border-steel px-4.5 py-3.5">
          This week&apos;s focus
        </h2>

        <div className="p-4.5">
          <p className="text-sm">
            Controlled lowering, consistent depth, and comfortable knees. Rest
            2-3 minutes on the main lifts and 60-90 seconds on accessories.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tips;
