import ClientHeader from "../_components/ClientHeader";
import ClientSidebar from "../_components/ClientSidebar";
import { PageTitleProvider } from "../_components/PageTitleContext";
import { getOwnClientRecord } from "../_lib/data-service";

async function ClientLayout({ children }) {
  const client = await getOwnClientRecord();

  return (
    <PageTitleProvider>
      <div className="flex min-h-screen">
        <ClientSidebar />

        <div className="flex flex-col flex-1">
          <ClientHeader client={client} />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </PageTitleProvider>
  );
}

export default ClientLayout;
