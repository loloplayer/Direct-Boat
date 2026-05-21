// Mensajes por idioma para el botón de WhatsApp.
const MESSAGES: Record<string, string> = {
  en: "Hi! I am on direcboatcharter.com and I would like to check availability for a charter. I want to claim my 10% direct booking discount!",
  fr: "Bonjour! Je suis sur direcboatcharter.com et je souhaite vérifier la disponibilité pour une location. Je souhaite profiter de ma réduction de 10% en réservation directe!",
  es: "¡Hola! Estoy en direcboatcharter.com y me gustaría comprobar la disponibilidad para un charter. ¡Quiero aprovechar mi 10% de descuento por reserva directa!",
};

export const getWhatsAppMessage = (lang?: string): string => {
  if (lang === "fr") return MESSAGES.fr;
  if (lang === "es") return MESSAGES.es;
  return MESSAGES.en;
};

export const getWhatsAppUrl = (phone: string, lang?: string, customMessage?: string): string => {
  const text = customMessage ?? getWhatsAppMessage(lang);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};
