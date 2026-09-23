import { signInWithGoogle } from "@/app/_lib/actions";

async function Page({ searchParams }) {
  const { invite } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        action={signInWithGoogle}
        className="flex flex-col gap-2 bg-steel p-20 rounded-xl shadow-md border-2 border-slate/10"
      >
        {invite && <input type="hidden" name="invite" value={invite} />}

        <h1 className="text-4xl font-medium">Log in</h1>
        <p>Start building your programs.</p>
        <button
          type="submit"
          className="px-4 py-2 bg-iron rounded-xl text-paper mt-4 cursor-pointer"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Page;
