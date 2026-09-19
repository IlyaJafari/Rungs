import SetPageTitle from "@/app/_components/SetPageTitle";
import Link from "next/link";

export const metadata = {
  title: "Getting Started",
};

async function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <SetPageTitle title="Help / Getting Started" />

      <Link
        href="/help"
        className="text-sm text-slate hover:underline uppercase"
      >
        &larr; back to help
      </Link>

      <h1 className="text-3xl font-medium">Getting Started</h1>

      <div className="flex flex-col gap-6 text-ink">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">1. Add your first client</h2>
          <p className="text-sm text-slate">
            Head to <strong>Add Client</strong> in the sidebar and invite
            someone by email. Once they accept, their profile appears under{" "}
            <strong>Athletes</strong>.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">2. Build a program</h2>
          <p className="text-sm text-slate">
            Open <strong>Program Editor</strong> to lay out a training block
            week by week. Add days, exercises, and target sets/reps/weight for
            each — your client will see their assigned program once it&apos;s
            saved.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">3. Track progress</h2>
          <p className="text-sm text-slate">
            As your client logs sets, their compliance, personal records, and
            body weight trends update automatically on their profile — no manual
            tracking required on your end.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">4. Keep notes</h2>
          <p className="text-sm text-slate">
            Use <strong>Coach Summary &amp; Observations</strong> on a
            client&apos;s page for anything specific to them, and the{" "}
            <strong>Take a Note</strong> widget on your dashboard for general
            reminders unrelated to any one client.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Page;
