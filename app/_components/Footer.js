import Link from "next/link";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <span className="font-medium">
        &copy; {year} Rungs. All rights reserved.
      </span>
      <div className="flex items-center gap-5 mt-2">
        <Link href="#" className="hover:text-light-ink text-sm">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:text-light-ink text-sm">
          Terms of Service
        </Link>
        <Link href="#" className="hover:text-light-ink text-sm">
          Cookie Settings
        </Link>
      </div>
    </div>
  );
}

export default Footer;
