import InvitationForm from "@/app/_components/InvitationForm";
import InvitationProtocol from "@/app/_components/InvitationProtocol";

function Page() {
  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
      <h1 className="text-4xl font-medium lg:col-span-3">Add New Athlete</h1>

      <div className="lg:col-span-2">
        <InvitationForm />
      </div>

      <div className="lg:col-span-1">
        <InvitationProtocol />
      </div>
    </div>
  );
}

export default Page;
