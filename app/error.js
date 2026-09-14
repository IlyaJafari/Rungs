"use client";

import { ArrowLeft, HelpCircle } from "@boxicons/react";

export default function Error({ error, reset }) {
  const errorCode = error?.statusCode ?? error?.status ?? "ERROR";

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-xl border border-steel bg-paper">
          <div className="flex items-center justify-between border-b border-steel px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-iron">
                <span className="font-sans text-sm font-medium text-paper">
                  R
                </span>
              </div>

              <span className="font-sans text-base font-medium text-ink">
                Rungs
              </span>
            </div>

            <span className="font-mono text-xs text-slate">{errorCode}</span>
          </div>

          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-rust-200 bg-rust-100">
              <HelpCircle className="size-6 text-rust" />
            </div>

            <span className="mb-3 font-mono text-xs uppercase tracking-wider text-slate">
              Something went wrong
            </span>

            <h1 className="font-sans text-2xl font-medium tracking-tight text-ink">
              We couldn&apos;t load this page.
            </h1>

            <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-slate">
              Something unexpected happened while loading Rungs. Try refreshing
              the page or head back and continue where you left off.
            </p>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => reset()}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-iron px-5 font-sans text-sm font-medium text-paper transition-colors hover:bg-light-ink focus:outline-none focus:ring-2 focus:ring-iron-200"
              >
                Try again
              </button>

              <button
                onClick={() => window.history.back()}
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-steel px-5 font-sans text-sm font-medium text-light-ink transition-colors hover:bg-steel focus:outline-none focus:ring-2 focus:ring-iron-200"
              >
                <ArrowLeft className="size-4" />
                Go back
              </button>
            </div>
          </div>

          <div className="border-t border-steel px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate">
                RUNGS / SYSTEM
              </span>

              <span className="font-mono text-xs text-slate">{errorCode}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-sans text-xs text-slate">
          If the problem keeps happening, try again in a few moments.
        </p>
      </div>
    </main>
  );
}
