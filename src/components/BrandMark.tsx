import { Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", inverse ? "text-primary-foreground" : "text-primary")}>
      <span className="grid size-9 place-items-center rounded-sm border border-accent/70 text-accent"><Anchor className="size-4" /></span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold uppercase tracking-[0.12em]">Banús</span>
        {!compact && <span className={cn("mt-1 font-body text-[10px] font-semibold uppercase tracking-[0.24em]", inverse ? "text-primary-foreground" : "text-accent")}>Charters</span>}
      </span>
    </span>
  );
}