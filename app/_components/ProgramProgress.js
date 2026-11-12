function ProgramProgress({ program }) {
  const totalSessions = Object.values(program.weekProgress).reduce(
    (total, week) => total + week.total,
    0,
  );

  const progress = totalSessions
    ? (program.completedCount / totalSessions) * 100
    : 0;

  return (
    <div className="rounded-lg p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">
          Week {program.currentWeek} of {program.totalWeeks}
        </span>

        <span className="text-xs text-slate">
          {program.completedCount} sessions complete
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-steel">
        <div
          className="h-full rounded-full bg-iron transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgramProgress;
