import ProfileForm from "@/app/_components/ProfileForm";
import { getCoach } from "@/app/_lib/data-service";
import createClient from "@/app/_lib/supabase";

export const metadata = {
  title: "Profile",
};

async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const coach = await getCoach();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-medium">Profile</h1>
      <ProfileForm coach={coach} email={user?.email} />
    </div>
  );
}

export default Page;
