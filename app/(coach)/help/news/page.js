import SetPageTitle from "@/app/_components/SetPageTitle";
import Link from "next/link";

export const metadata = {
  title: "News & Updates",
};

async function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <SetPageTitle title="Help / News" />

      <Link
        href="/help"
        className="text-sm text-slate hover:underline uppercase"
      >
        &larr; back to help
      </Link>

      <h1 className="text-3xl font-medium">News & Updates</h1>

      <div className="flex flex-col gap-6 text-ink">
        <section className="flex flex-col gap-2 border-b border-steel pb-6">
          <span className="text-xs font-mono uppercase text-slate">Latest</span>
          <h2 className="text-lg font-medium">Welcome to Rungs</h2>
          <p className="text-sm text-slate">
            Rungs is under active development. This page will list new features,
            fixes, and announcements as they ship — check back here for updates.
          </p>
        </section>

        <p className="text-sm text-slate">
          Nothing else to show yet — you&apos;re all caught up.
        </p>
      </div>
    </div>
  );
}

export default Page;
