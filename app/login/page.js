import { signInWithGoogle } from "@/app/_lib/actions";
import Image from "next/image";
import wordmark from "@/public/wordmark.webp";

async function Page({ searchParams }) {
  const { invite } = await searchParams;

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper flex items-center justify-center px-6 py-12">
      <div className="absolute -top-40 -right-40 size-96 rounded-full bg-steel/60 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-slate/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="relative size-16">
            <Image
              src={wordmark}
              alt="Rungs"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <form
          action={signInWithGoogle}
          className="rounded-2xl border border-slate/10 bg-steel p-8 shadow-xl shadow-ink/5 sm:p-10"
        >
          {invite && <input type="hidden" name="invite" value={invite} />}

          <div className="text-center">
            <h1 className="text-3xl font-medium tracking-tight text-ink">
              Sign up / Log in
            </h1>

            <p className="mt-2 text-sm leading-6 text-iron/70">
              Sign in to manage your programs and keep your athletes moving
              forward.
            </p>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-paper px-4 py-3 text-sm font-medium text-ink shadow-sm ring-1 ring-ink/10 transition hover:bg-white hover:shadow-md active:scale-[0.99] cursor-pointer"
            >
              <Image
                src="https://thesvg.org/icons/google/default.svg"
                alt="Google"
                width={24}
                height={24}
              />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="text-xs text-iron/80">Secure sign-in</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-iron/80">
            By continuing, you agree to use Rungs responsibly and keep your
            account information secure.
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-iron/50">
          Rungs · Built for independent strength coaches
        </p>
      </div>
    </main>
  );
}

export default Page;
