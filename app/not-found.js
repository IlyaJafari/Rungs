import { Home } from "@boxicons/react";
import ButtonBack from "@/app/_components/ButtonBack";

export default function NotFound() {
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

            <span className="font-mono text-xs text-slate">ERROR 404</span>
          </div>

          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-iron-200 bg-iron-100">
              <span className="font-mono text-sm font-medium text-iron">
                404
              </span>
            </div>

            <span className="mb-3 font-mono text-xs uppercase tracking-wider text-slate">
              Page not found
            </span>

            <h1 className="font-sans text-2xl font-medium tracking-tight text-ink">
              We couldn&apos;t find that page.
            </h1>

            <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-slate">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved. Check the address or head back to your dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <a
                href="/dashboard"
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-iron px-5 font-sans text-sm font-medium text-paper transition-colors hover:bg-light-ink focus:outline-none focus:ring-2 focus:ring-iron-200"
              >
                <Home className="size-4" />
                Dashboard
              </a>

              <ButtonBack />
            </div>
          </div>

          <div className="border-t border-steel px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate">
                RUNGS / SYSTEM
              </span>

              <span className="font-mono text-xs text-slate">404</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-sans text-xs text-slate">
          The page you requested could not be found.
        </p>
      </div>
    </main>
  );
}
