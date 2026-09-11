import { ArrowOutRightSquareHalf } from "@boxicons/react";
import { signOut } from "../_lib/actions";

function SignOutButtonProfile() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-rust text-sm font-medium flex items-center gap-2 pl-3 pr-20 py-2 rounded-xl cursor-pointer"
      >
        <ArrowOutRightSquareHalf height={16} width={16} />
        <span>Log out</span>
      </button>
    </form>
  );
}

export default SignOutButtonProfile;
