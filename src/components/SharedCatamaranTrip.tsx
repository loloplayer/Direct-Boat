import { useState } from "react";
import { MapPin, MessageCircle, ShipWheel, Waves, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResponsiveImage from "./ResponsiveImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { money, sharedCatamaranTrip as trip } from "@/data/siteData";
import { sharedTripBookingUrl } from "@/lib/sharedTrip";

const text = {
  en: { kicker: "Shared trip", title: "Catamaran shared trip", person: "person", from: "From", season: "Low-season price", note: "Share the boat with other guests.", max: "Max", guests: "guests", times: "Times on request · confirmed via WhatsApp depending on availability", book: "Book tickets", also: "Also available as a shared trip" },
  es: { kicker: "Salida compartida", title: "Salida compartida en catamarán", person: "persona", from: "Desde", season: "Precio de temporada baja", note: "Compartes el barco con otros pasajeros.", max: "Máx.", guests: "personas", times: "Horarios bajo petición · confirmados por WhatsApp según disponibilidad", book: "Reservar entradas", also: "También disponible como salida compartida" },
  fr: { kicker: "Sortie partagée", title: "Sortie partagée en catamaran", person: "personne", from: "À partir de", season: "Tarif basse saison", note: "Vous partagez le bateau avec d’autres passagers.", max: "Max.", guests: "personnes", times: "Horaires sur demande · confirmés par WhatsApp selon disponibilité", book: "Réserver des places", also: "Également disponible en sortie partagée" },
  de: { kicker: "Geteilte Tour", title: "Geteilte Katamarantour", person: "Person", from: "Ab", season: "Preis in der Nebensaison", note: "Sie teilen das Boot mit anderen Gästen.", max: "Max.", guests: "Gäste", times: "Zeiten auf Anfrage · Bestätigung per WhatsApp je nach Verfügbarkeit", book: "Tickets buchen", also: "Auch als geteilte Tour verfügbar" },
};
const icons = [ShipWheel, Waves, LifeBuoy];
export default function SharedCatamaranTrip({ compact = false }: { compact?: boolean }) {
  const { lang, copy } = useLanguage();
  const t = text[lang];
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const content = <div className={compact ? "min-w-0" : "min-w-0 py-2"}>
    <p className="section-kicker">{t.kicker}</p>
    <h2 className={compact ? "font-display text-3xl" : "font-display text-4xl md:text-5xl"}>{compact ? t.also : t.title} · {trip.durationHours} h</h2>
    <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0" />{trip.boatName} · {trip.location.name[lang]}</p>
    <p className="mt-4 font-display text-3xl">{!compact && `${t.from} `}{money(trip.price, lang)} <span className="font-body text-base">/ {t.person}</span></p>
    <p className="mt-1 text-xs text-muted-foreground">{t.season} · {copy.vatIncluded}</p>
    <p className="mt-4 text-sm text-muted-foreground">{t.note}</p>
    {!compact && <ul className="mt-5 grid gap-3">{trip.includes.map((item, index) => { const Icon = icons[index]; return <li key={item.en} className="flex items-center gap-3 text-sm">{Icon && <Icon className="size-4 shrink-0 text-brass-ink" strokeWidth={1.5} />}{item[lang]}</li>; })}</ul>}
    <p className="mt-5 text-sm leading-6 text-muted-foreground">{t.max} {trip.maxGuests} {t.guests} · {t.times}</p>
    <div className="mt-5 grid grid-cols-2 gap-3">
      <label className="min-w-0 text-xs font-medium">{copy.fields.date}<Input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 w-full min-w-0" /></label>
      <label className="min-w-0 text-xs font-medium">{copy.fields.guests}<select className="mt-1 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm" value={guests} onChange={(event) => setGuests(Number(event.target.value))}>{Array.from({ length: trip.maxGuests }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>
    </div>
    <Button asChild className="mt-4 w-full sm:w-auto"><a href={sharedTripBookingUrl(lang, date, guests)} target="_blank" rel="noopener noreferrer"><MessageCircle />{t.book}</a></Button>
  </div>;
  if (compact) return <aside className="mt-12 rounded-lg border border-brass bg-muted p-5">{content}</aside>;
  return <section className="border-b border-border py-16 md:py-24"><div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-2 md:gap-12 md:px-10"><ResponsiveImage image={trip.image} alt={trip.boatName + " · " + t.title + " · Puerto Banús"} loading="lazy" sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-md object-cover" />{content}</div></section>;
}