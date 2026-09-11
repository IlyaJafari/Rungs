import { ArrowOutRightSquareHalf } from "@boxicons/react";
import { signOut } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-rust flex items-center gap-2 pl-3 pr-20 py-2 rounded-xl cursor-pointer"
      >
        <ArrowOutRightSquareHalf />
        <span>Log out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
