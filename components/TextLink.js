import Link from "next/link";

export default function TextLink({ className, ...props }) {
  const defaultStyles =
    "transition-150 text-slate-900 transition hover:text-fuchsia-600";
  const styles = className ? `${defaultStyles} ${className}` : defaultStyles;
  return <Link className={styles} {...props} />;
}
