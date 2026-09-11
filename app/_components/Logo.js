import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Rungs Logo"
      width={120}
      height={32}
      className="h-12 w-auto"
    />
  );
}

export default Logo;
