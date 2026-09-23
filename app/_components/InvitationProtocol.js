import { BoltAlt } from "@boxicons/react";

function InvitationProtocol() {
  return (
    <div className="flex flex-col gap-6 bg-steel/50 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <BoltAlt />
        <span className="text-xl font-medium">Invitation Protocol</span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div>
            <div className="bg-iron-200 p-2 rounded-xl">
              <span className="font-mono text-iron text-sm">01</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium">Verify Credentials</span>
            <p className="text-sm text-light-ink">
              Ensure the email is accurate. This is the primary key for
              performance data synchronization.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <div className="bg-iron-200 p-2 rounded-xl">
              <span className="font-mono text-iron text-sm">02</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium">Auto-Assignment</span>
            <p className="text-sm text-light-ink">
              Once the athlete accepts the default &quot;Foundation Phase&quot;
              program will be automatically applied.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <div className="bg-iron-200 p-2 rounded-xl">
              <span className="font-mono text-iron text-sm">03</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium">Roster Updates</span>
            <p className="text-sm text-light-ink">
              Track invitation status in real-rime on your dashboard. Pending
              invites expire after 72 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationProtocol;
