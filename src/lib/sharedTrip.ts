import { sharedCatamaranTrip, SITE_URL, type Lang } from "@/data/siteData";
import { getWhatsAppUrl } from "./whatsapp";

export const sharedTripMessage = (lang: Lang, date = "", guests = 2) => {
  if (!Number.isInteger(guests) || guests < 1 || guests > sharedCatamaranTrip.maxGuests) throw new Error("Invalid shared-trip guest count");
  const formattedDate = date ? new Intl.DateTimeFormat(lang, { timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`)) : "…";
  const message = {
    en: `Hi! I'd like tickets for the shared catamaran trip. Date: ${formattedDate}. Number of people: ${guests}. Catamarán Bali 4.0 · Puerto Banús · ${sharedCatamaranTrip.durationHours} h. Please confirm departure times and availability.`,
    es: `Hola, me gustaría reservar entradas para la salida compartida en catamarán. Fecha: ${formattedDate}. Número de personas: ${guests}. Catamarán Bali 4.0 · Puerto Banús · ${sharedCatamaranTrip.durationHours} h. ¿Podéis confirmar los horarios y la disponibilidad?`,
    fr: `Bonjour, j'aimerais réserver des places pour la sortie partagée en catamaran. Date : ${formattedDate}. Nombre de personnes : ${guests}. Catamarán Bali 4.0 · Puerto Banús · ${sharedCatamaranTrip.durationHours} h. Pouvez-vous confirmer les horaires et la disponibilité ?`,
    de: `Guten Tag, ich möchte Tickets für die geteilte Katamarantour buchen. Datum: ${formattedDate}. Personenanzahl: ${guests}. Catamarán Bali 4.0 · Puerto Banús · ${sharedCatamaranTrip.durationHours} h. Bitte bestätigen Sie die Abfahrtszeiten und die Verfügbarkeit.`,
  };
  return message[lang];
};
export const sharedTripBookingUrl = (lang: Lang, date = "", guests = 2) => getWhatsAppUrl(lang, sharedTripMessage(lang, date, guests));
export const sharedTripOffer = (lang: Lang) => ({
  "@type": "Offer", name: `Catamarán Bali 4.0 · ${sharedCatamaranTrip.durationHours} h · shared trip`,
  price: sharedCatamaranTrip.price, priceCurrency: "EUR", url: `${SITE_URL}/${lang}/fleet/${sharedCatamaranTrip.boatSlug}`,
  description: `Shared trip · ${sharedCatamaranTrip.durationHours} h · Puerto Banús · max ${sharedCatamaranTrip.maxGuests} guests · departure times on request`,
  priceSpecification: { "@type": "UnitPriceSpecification", price: sharedCatamaranTrip.price, priceCurrency: "EUR", unitText: "person", valueAddedTaxIncluded: true },
});