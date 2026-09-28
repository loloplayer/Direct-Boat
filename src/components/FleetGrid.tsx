import { Link } from "react-router-dom";
import { MessageCircle, Ruler, Users } from "lucide-react";
import { boats, money, type Boat } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { boatBookingUrl, durationHours } from "@/lib/boatBooking";

export interface FleetSelection { guests?: number; duration?: number; date?: string }
const text = { en: { details: "Details", book: "Book on WhatsApp" }, es: { details: "Detalles", book: "Reservar por WhatsApp" }, fr: { details: "Détails", book: "Réserver sur WhatsApp" } } as const;
export const priceForDuration = (boat: Boat, duration?: number) => boat.prices.find((price) => durationHours(price) === (duration ?? 2))?.price;

export default function FleetGrid({ limit, items, selection }: { limit?: number; items?: Boat[]; horizontal?: boolean; selection?: FleetSelection }) {
  const { lang } = useLanguage(); const t = text[lang]; const list = (items ?? boats).slice(0, limit);
  return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{list.map((boat) => { const selected = boat.prices.find((price) => durationHours(price) === selection?.duration) ?? boat.prices.find((price) => durationHours(price) === 2) ?? boat.prices[0]; const href = `/${lang}/fleet/${boat.slug}`; const compact = [2,4,8].map((hours) => boat.prices.find((price) => durationHours(price) === hours)).filter((price) => price !== undefined); return <article key={boat.slug} className="min-w-0 border-b border-border pb-6"><Link to={href} className="block overflow-hidden rounded-md bg-muted"><ResponsiveImage image={boat.images[0]} alt={`${boat.name} private charter from Puerto Banús`} sizes="(max-width:768px) 100vw, 33vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" /></Link><div className="pt-5"><h3 className="font-display text-3xl font-medium">{boat.name}</h3><div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Users className="size-3.5" />{boat.capacity[lang]}</span>{boat.length && <span className="flex items-center gap-1.5"><Ruler className="size-3.5" />{boat.length}</span>}</div><p className="mt-4 text-sm font-semibold">{compact.map((price) => `${durationHours(price)} h ${money(price.price, lang)}`).join(" · ")}</p><div className="mt-5 grid grid-cols-2 gap-2"><Button asChild variant="outline"><Link to={href}>{t.details}</Link></Button><Button asChild><a href={boatBookingUrl(lang, boat, selected, selection?.guests ?? 2, selection?.date ?? "")} target="_blank" rel="noreferrer"><MessageCircle />{t.book}</a></Button></div></div></article>; })}</div>;
}