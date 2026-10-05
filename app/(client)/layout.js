import ClientHeader from "../_components/ClientHeader";
import ClientSidebar from "../_components/ClientSidebar";
import { PageTitleProvider } from "../_components/PageTitleContext";
import { getOwnClientRecord } from "../_lib/data-service";

async function ClientLayout({ children }) {
  const clientRecord = await getOwnClientRecord();

  const profile = {
    full_name: clientRecord.profiles.full_name,
    role: clientRecord.profiles.role,
  };

  return (
    <PageTitleProvider>
      <div className="flex min-h-screen">
        <ClientSidebar />

        <div className="flex flex-col flex-1">
          <ClientHeader profile={profile} />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </PageTitleProvider>
  );
}

export default ClientLayout;
