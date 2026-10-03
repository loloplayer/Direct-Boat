import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { SiteImage } from "@/data/siteData";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";

const labels = {
  en: { all: "View all photos", close: "Close photos", previous: "Previous photo", next: "Next photo" },
  es: { all: "Ver todas las fotos", close: "Cerrar fotos", previous: "Foto anterior", next: "Foto siguiente" },
  fr: { all: "Voir toutes les photos", close: "Fermer les photos", previous: "Photo précédente", next: "Photo suivante" },
} as const;

export default function BoatGallery({ images, boatName, lang }: { images: SiteImage[]; boatName: string; lang: "en" | "es" | "fr" }) {
  const unique = images.filter((image, index, all) => all.findIndex((item) => item.src === image.src) === index);
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef(0);
  const t = labels[lang];
  const move = (direction: number) => setActive((current) => current === null ? 0 : (current + direction + unique.length) % unique.length);
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active, unique.length]);
  return <>
    <div className="relative md:px-3">
      <div className="flex snap-x snap-mandatory overflow-x-auto md:grid md:h-[560px] md:grid-cols-3 md:grid-rows-2 md:gap-2 md:overflow-hidden">
        {unique.slice(0, 5).map((image, index) => <button type="button" key={image.src} onClick={() => setActive(index)} className={`relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden bg-muted md:aspect-auto md:h-full md:min-h-0 md:w-auto ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`} aria-label={`${boatName} photo ${index + 1}`}><ResponsiveImage image={image} sizes={index === 0 ? "(max-width:768px) 100vw, 67vw" : "(max-width:768px) 100vw, 33vw"} loading={index === 0 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover" alt={`${boatName} photo ${index + 1}`} /><span className="absolute bottom-3 right-3 rounded-full bg-primary/85 px-3 py-1 text-xs text-primary-foreground md:hidden">{index + 1}/{unique.length}</span></button>)}
      </div>
      <Button type="button" variant="secondary" className="absolute bottom-4 right-5 hidden bg-primary/85 md:inline-flex" onClick={() => setActive(0)}><Images />{t.all} ({unique.length})</Button>
    </div>
    {active !== null && <div role="dialog" aria-modal="true" aria-label={`${boatName} photos`} className="fixed inset-0 z-[100] flex items-center justify-center bg-primary p-4 text-primary-foreground" onTouchStart={(event) => { touchX.current = event.touches[0]?.clientX ?? 0; }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX ?? touchX.current; if (Math.abs(end - touchX.current) > 45) move(end < touchX.current ? 1 : -1); }}>
      <Button type="button" variant="ghost" size="icon" className="absolute right-4 top-4 text-primary-foreground" onClick={() => setActive(null)} aria-label={t.close}><X /></Button>
      <Button type="button" variant="ghost" size="icon" className="absolute left-3 top-1/2 text-primary-foreground" onClick={() => move(-1)} aria-label={t.previous}><ChevronLeft /></Button>
      <ResponsiveImage image={unique[active]} sizes="100vw" loading="eager" className="max-h-[86vh] max-w-[88vw] object-contain" alt={`${boatName} photo ${active + 1}`} />
      <Button type="button" variant="ghost" size="icon" className="absolute right-3 top-1/2 text-primary-foreground" onClick={() => move(1)} aria-label={t.next}><ChevronRight /></Button>
      <span className="absolute bottom-5 text-sm">{active + 1} / {unique.length}</span>
    </div>}
  </>;
}