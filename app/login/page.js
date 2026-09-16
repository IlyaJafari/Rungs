import { signInWithGoogle } from "@/app/_lib/actions";

function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <form
        action={signInWithGoogle}
        className="flex flex-col gap-2 bg-steel p-20 rounded-xl shadow-md border-2 border-slate/10"
      >
        <h1 className="text-4xl font-medium">Welcome to the app!</h1>
        <p>Start building your program.</p>

        <button
          type="submit"
          className="px-4 py-2 bg-iron text-paper rounded-xl mt-4 cursor-pointer"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Page;
