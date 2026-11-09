import { getWhatsAppUrl } from "./whatsapp";
import { formatBookingDate } from "./boatBooking";
import type { Lang, WaterActivity } from "@/data/siteData";

export const activityBookingUrl = (lang: Lang, activity: WaterActivity, option: string, people: string, date: string) => {
  const count = Math.max(1, Math.min(activity.maxPeople ?? 100, Number(people) || 1));
  const details = `${activity.title[lang]} · ${option} · ${activity.location.name[lang]}`;
  const day = formatBookingDate(date, lang);
  return getWhatsAppUrl(lang, {
    en: `Hi, I would like to book ${details}. Date: ${day} · People: ${count}. Is it available?`,
    es: `Hola, quiero reservar ${details}. Fecha: ${day} · Personas: ${count}. ¿Está disponible?`,
    fr: `Bonjour, je souhaite réserver ${details}. Date : ${day} · Personnes : ${count}. Est-ce disponible ?`,
    de: `Guten Tag, ich möchte ${details} buchen. Datum: ${day} · Personen: ${count}. Ist es verfügbar?`,
  }[lang]);
};

export const activityOffers = (activity: WaterActivity, lang: Lang) => activity.prices.map((option) => ({
  "@type": "Offer", price: option.price, priceCurrency: "EUR",
  url: `https://banuscharters.com/${lang}/activities/${activity.slug}`,
  description: option.label[lang],
  priceSpecification: { "@type": "UnitPriceSpecification", price: option.price, priceCurrency: "EUR", valueAddedTaxIncluded: true },
}));