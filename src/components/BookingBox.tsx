import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { boatBookingUrl, durationHours, startTimes } from "@/lib/boatBooking";
import type { Boat } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingBox({ boat }: { boat: Boat }) {
  const { lang, copy } = useLanguage();
  const [searchParams] = useSearchParams();
  const maxGuests = boat.maxGuests;
  const selectedHours = Number(searchParams.get("duration"));
  const initialOption = boat.prices.find((price) => durationHours(price) === selectedHours) ?? boat.prices[0];
  const [form, setForm] = useState({ date: searchParams.get("date") ?? "", time: "11:00", duration: String(durationHours(initialOption)), guests: searchParams.get("guests") ?? "2" });
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const option = useMemo(() => boat.prices.find((price) => durationHours(price) === Number(form.duration)) ?? boat.prices[0], [boat.prices, form.duration]);
  const labels = { en: { time: "Start time", button: "Book on WhatsApp" }, es: { time: "Hora de inicio", button: "Reservar por WhatsApp" }, fr: { time: "Heure de départ", button: "Réserver sur WhatsApp" } }[lang];
  return <aside id="booking" className="rounded-lg border border-border bg-card p-6 shadow-brand lg:sticky lg:top-28"><p className="section-kicker mb-0">{boat.location.name[lang]}</p><h2 className="mt-2 font-display text-3xl">{copy.reserveTitle}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.reserveNote}</p><div className="mt-6 grid gap-4"><label className="text-xs font-medium">{copy.fields.date}<Input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(event) => set("date", event.target.value)} className="mt-1" /></label><label className="text-xs font-medium">{labels.time}<select value={form.time} onChange={(event) => set("time", event.target.value)} className="mt-1 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm">{startTimes.map((time) => <option key={time}>{time}</option>)}</select></label><label className="text-xs font-medium">{copy.fields.duration}<select value={form.duration} onChange={(event) => set("duration", event.target.value)} className="mt-1 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm">{boat.prices.map((price) => <option key={price.label.en} value={durationHours(price)}>{price.label[lang]} · {new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price.price)}</option>)}</select></label><label className="text-xs font-medium">{copy.fields.guests}<select value={form.guests} onChange={(event) => set("guests", event.target.value)} className="mt-1 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm">{Array.from({ length: maxGuests }, (_, index) => index + 1).map((guests) => <option key={guests}>{guests}</option>)}</select></label><Button asChild size="lg"><a href={boatBookingUrl(lang, boat, option, Number(form.guests), form.date, form.time)} target="_blank" rel="noreferrer"><MessageCircle />{labels.button}</a></Button></div></aside>;
}