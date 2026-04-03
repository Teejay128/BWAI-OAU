import Link from "next/link";

type GhostPillButtonProps = {
  label: string;
  href: string;
  className?: string;
  target?: string;
};

export default function GhostPillButton({
  label,
  href,
  className,
  target,
}: GhostPillButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={`inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 font-bold transition-[transform,background-color,color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-coreBlue hover:bg-white/85 hover:text-coreBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-base ${className ?? ""}`}
    >
      <span className="text-[0.95rem] text-ink">{label}</span>
    </Link>
  );
}
