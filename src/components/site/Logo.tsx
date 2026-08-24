import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="/images/logo-header.png"
        alt="청소청년"
        width={1040}
        height={320}
        className="h-9 w-auto object-contain"
        priority
      />
    </Link>
  );
}
