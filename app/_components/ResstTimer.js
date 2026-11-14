"use client";

import { useEffect, useState } from "react";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function RestTimer({ duration = 90 }) {
  const [remaining, setRemaining] = useState(duration);
  const [endTime, setEndTime] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const isRunning = endTime !== null;
  const isFinished = hasStarted && remaining === 0 && !isRunning;

  useEffect(() => {
    if (!endTime) return;

    function tick() {
      const seconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

      setRemaining(seconds);

      if (seconds === 0) {
        setEndTime(null);
      }
    }

    tick();

    const interval = setInterval(tick, 250);

    return () => clearInterval(interval);
  }, [endTime]);

  function startTimer() {
    setRemaining(duration);
    setHasStarted(true);
    setEndTime(Date.now() + duration * 1000);
  }

  function pauseTimer() {
    if (!endTime) return;

    setRemaining(Math.max(0, Math.ceil((endTime - Date.now()) / 1000)));

    setEndTime(null);
  }

  function resumeTimer() {
    if (remaining > 0) {
      setEndTime(Date.now() + remaining * 1000);
    }
  }

  function adjustTime(seconds) {
    if (isRunning) {
      setEndTime((prev) => prev + seconds * 1000);
    } else {
      setRemaining((prev) => Math.max(0, prev + seconds));
    }
  }

  function skipTimer() {
    setEndTime(null);
    setRemaining(0);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-steel">
      <h3 className="font-medium border-b border-steel px-4.5 py-3.5">
        Rest Timer
      </h3>

      <div className="flex flex-col items-center gap-4 px-4.5 py-3.5">
        <p className="font-mono text-iron text-4xl font-semibold tabular-nums">
          {formatTime(remaining)}
        </p>

        {!hasStarted || isFinished ? (
          <button
            type="button"
            onClick={startTimer}
            className="rounded-lg text-sm text-iron border-3  border-steel px-5 py-2.5 font-medium cursor-pointer transition-colors hover:bg-steel"
          >
            Start {duration}s
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => adjustTime(-15)}
              disabled={remaining <= 0}
              className="text-sm rounded-lg border-3 border-steel px-5 py-2.5 cursor-pointer transition-colors hover:bg-steel disabled:opacity-40"
            >
              -15s
            </button>

            <button
              type="button"
              onClick={isRunning ? pauseTimer : resumeTimer}
              className="rounded-lg border-3 border-steel text-iron px-5 py-2 text-sm font-medium transition-colors cursor-pointer hover:bg-steel"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>

            <button
              type="button"
              onClick={() => adjustTime(15)}
              className="text-sm rounded-lg border-3 border-steel px-5 py-2.5 cursor-pointer transition-colors hover:bg-steel disabled:opacity-40"
            >
              +15s
            </button>

            <button
              type="button"
              onClick={skipTimer}
              className="text-sm text-rust border-3 border-steel px-5 py-2.5 rounded-lg transition-colors cursor-pointer hover:bg-rust-100 hover:border-rust-100"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestTimer;
