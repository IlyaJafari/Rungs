import Sidebar from "../_components/Sidebar";
import DashboardHeader from "../_components/DashboardHeader";
import { getCoach } from "../_lib/data-service";
import MobileNav from "../_components/MobileNav";
import { PageTitleProvider } from "../_components/PageTitleContext";

async function CoachLayout({ children }) {
  const coach = await getCoach();

  return (
    <PageTitleProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <DashboardHeader coach={coach} />
          <div className="flex-1 overflow-y-auto p-6 pb-20 md:p-6">
            {children}
          </div>
        </div>

        <MobileNav />
      </div>
    </PageTitleProvider>
  );
}

export default CoachLayout;
