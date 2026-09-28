import type { Boat, Lang, PriceOption } from "@/data/siteData";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const startTimes = Array.from({ length: 24 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export const durationHours = (option: PriceOption) => Number.parseInt(option.label.en, 10);

export const formatBookingDate = (date: string, lang: Lang) => {
  if (!date) return "—";
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang, { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(year, month - 1, day));
};

export const boatBookingMessage = (lang: Lang, boat: Boat, option: PriceOption, guests: number, date = "", time = "") => {
  const duration = `${durationHours(option)} h (${new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(option.price)})`;
  const values = { date: formatBookingDate(date, lang), time: time || "—", duration, guests };
  return {
    en: `Hi, I would like to book the ${boat.name}. Date: ${values.date} · Start time: ${values.time} · Duration: ${values.duration} · Guests: ${values.guests}. Is it available?`,
    es: `Hola, quiero reservar el ${boat.name}. Fecha: ${values.date} · Hora: ${values.time} · Duración: ${values.duration} · Personas: ${values.guests}. ¿Está disponible?`,
    fr: `Bonjour, je souhaite réserver le ${boat.name}. Date : ${values.date} · Heure : ${values.time} · Durée : ${values.duration} · Personnes : ${values.guests}. Est-il disponible ?`,
  }[lang];
};

export const boatBookingUrl = (lang: Lang, boat: Boat, option: PriceOption, guests: number, date = "", time = "") =>
  getWhatsAppUrl(lang, boatBookingMessage(lang, boat, option, guests, date, time));