import Link from "next/link";
import TextLink from "./TextLink";
import Image from "next/image";

export function Avatar() {
  return (
    <Link href="https://joeaverbukh.com">
      <Image
        src="/headshot.jpg"
        alt="me"
        width="180"
        height="180"
        className="rounded-full"
      />
    </Link>
  );
}

export default function Header({ showHome }) {
  return (
    <div className="flex flex-col items-center py-8">
      <Avatar />
      <div className="text-3xl font-bold my-4 text-slate-600">
        {`Heya, I'm Joe!`}
      </div>
      <div className="text-md text-slate-600">
        This is where I share my words
      </div>
      {showHome && (
        <Link href="/" className="text-4xl mt-6 -mb-6">
          🏠
        </Link>
      )}
    </div>
  );
}
