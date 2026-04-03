type PillTagProps = {
  label: string;
  color: string;
  className?: string;
};

export default function PillTag({ label, color, className }: PillTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-ink shadow-[0_10px_24px_rgba(30,30,30,0.1)] ring-1 ring-black/5 ${className ?? ""}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}
