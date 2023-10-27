export default function TextLink({ className, ...props }) {
  return (
    <a
      className={`transition-150 text-slate-900 transition hover:text-fuchsia-600`}
      {...props}
    />
  );
}
