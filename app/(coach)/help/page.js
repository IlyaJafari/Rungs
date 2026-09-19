import FAQ from "@/app/_components/FAQ";
import HelpCards from "@/app/_components/HelpCards";

export const metadata = {
  title: "Help",
};

function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-medium mb-2">Need Assistance?</h1>
        <span className="text-slate">
          If you&apos;re feeling overwhelmed, remember you don&apos;t have to
          face it alone.
        </span>
        <span className="text-slate">Reach out and get the help you need</span>
      </div>

      <div>
        <HelpCards />
      </div>

      <div>
        <FAQ />
      </div>
    </div>
  );
}

export default Page;
