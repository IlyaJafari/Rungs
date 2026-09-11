import Link from "next/link";

function SignInButton({ isLoggedIn, onClick, variant = "desktop" }) {
  const baseClasses = "px-4 py-2 rounded-xl";

  const desktopClasses =
    "hidden md:inline-block bg-iron text-paper border-2 border-transparent hover:bg-paper hover:text-iron hover:border-iron transition-colors";

  const mobileClasses = "inline-block bg-iron text-paper";

  const className = `${baseClasses} ${
    variant === "desktop" ? desktopClasses : mobileClasses
  }`;

  return (
    <Link
      href={isLoggedIn ? "/dashboard" : "/login"}
      onClick={onClick}
      className={className}
    >
      {isLoggedIn ? "Dashboard" : "Get Started"}
    </Link>
  );
}

export default SignInButton;
