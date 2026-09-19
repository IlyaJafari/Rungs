import SetPageTitle from "@/app/_components/SetPageTitle";
import Link from "next/link";

export const metadata = {
  title: "Security & Protection",
};

async function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <SetPageTitle title="Help / Security" />

      <Link
        href="/help"
        className="text-sm text-slate hover:underline uppercase"
      >
        &larr; back to help
      </Link>

      <h1 className="text-3xl font-medium">Security & Protection</h1>

      <div className="flex flex-col gap-6 text-ink">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">How you sign in</h2>
          <p className="text-sm text-slate">
            Rungs uses Google to handle sign-in — there&apos;s no separate
            password stored for your account. Your login is only ever as secure
            as your Google account itself, so make sure that account has strong
            security (a strong password, two-factor authentication) on
            Google&apos;s end.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Who can see your data</h2>
          <p className="text-sm text-slate">
            You only ever see your own clients — never another coach&apos;s
            roster, programs, or notes. Every request is scoped to your account
            at the database level, not just hidden in the interface.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Your client&apos;s data</h2>
          <p className="text-sm text-slate">
            Logged workouts, body weight entries, and notes are only visible to
            you as their coach. Clients aren&apos;t shown other client&apos;s
            data, and you&apos;re not shown anyone outside your own roster.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Signing out</h2>
          <p className="text-sm text-slate">
            You can sign out at any time from your profile menu. This ends your
            current session — you&apos;ll need to sign in again with Google to
            access your dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Page;
