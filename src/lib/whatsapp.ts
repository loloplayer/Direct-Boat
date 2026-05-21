// Mensajes por idioma para el botón de WhatsApp.
// Por defecto se usa el mensaje en INGLÉS. Si el idioma activo es francés
// se devuelve el mensaje en FRANCÉS.
const MESSAGES: Record<string, string> = {
  en: "Hi! I am on direcboatcharter.com and I would like to check availability for a charter. I want to claim my 10% direct booking discount!",
  fr: "Bonjour! Je suis sur direcboatcharter.com et je souhaite vérifier la disponibilité pour une location. Je souhaite profiter de ma réduction de 10% en réservation directe!",
};

export const getWhatsAppMessage = (lang?: string): string => {
  if (lang === "fr") return MESSAGES.fr;
  return MESSAGES.en;
};

export const getWhatsAppUrl = (phone: string, lang?: string, customMessage?: string): string => {
  const text = customMessage ?? getWhatsAppMessage(lang);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};
