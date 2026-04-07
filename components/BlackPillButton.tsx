import Link from "next/link";

type BlackPillButtonProps = {
  label: string;
  href: string;
  className?: string;
  target?: string;
};

export default function BlackPillButton({
  label,
  href,
  className,
  target,
}: BlackPillButtonProps) {
  const isExternal = href.startsWith("http");
  const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
  const rel = isExternal ? "noreferrer" : undefined;

  return (
    <Link
      href={href}
      target={resolvedTarget}
      rel={rel}
      className={`group inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-coreBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-base ${className ?? ""}`}
    >
      <span className="text-[0.95rem] text-white group-hover:text-black">{label}</span>
    </Link>
  );
}
