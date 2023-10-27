import Link from "next/link";

export default function TextLink({ ...props }) {
  return (
    <Link
      className={`transition-150 text-slate-900 transition hover:text-fuchsia-600 `}
      {...props}
    />
  );
}
