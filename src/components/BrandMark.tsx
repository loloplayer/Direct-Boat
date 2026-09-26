import { cn } from "@/lib/utils";

export default function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", inverse ? "text-primary-foreground" : "text-primary")}>
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-[1.45rem] font-semibold uppercase tracking-[0.18em]">BAN<span className="text-brass">Ú</span>S</span>
        {!compact && <span className={cn("mt-1 font-body text-[8px] font-semibold uppercase tracking-[0.42em]", inverse ? "text-primary-foreground" : "text-primary")}>CHARTERS</span>}
      </span>
    </span>
  );
}