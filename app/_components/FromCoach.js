import { getCoachNotes } from "../_lib/data-service";
import { Avatar } from "../_utils/helpers";

async function FromCoach({ client }) {
  const notes = await getCoachNotes(client.id);
  const latestNote = notes[0];

  return (
    <div className="flex flex-col border border-steel rounded-xl">
      <div className="py-3.5 px-4.5 border-b border-steel">
        <h3 className="text-lg font-medium">From your coach</h3>
      </div>

      <div className="flex flex-col gap-4 p-4.5">
        <div className="flex items-center gap-2">
          <Avatar
            client={{
              avatarUrl: client.coach.avatar_url,
              profiles: { full_name: client.coach.full_name },
            }}
            width={40}
            height={40}
          />
          <p>{client.coach.full_name}</p>
        </div>
        <p className="italic">
          &quot;
          {latestNote ? latestNote.content : "No notes from your coach yet."}
          &quot;
        </p>
      </div>
    </div>
  );
}

export default FromCoach;
