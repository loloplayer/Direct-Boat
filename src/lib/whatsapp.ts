import type { Lang } from "@/data/siteData";
import { WHATSAPP_NUMBER } from "@/data/siteData";

const greetings: Record<Lang, string> = {
  en: "Hi Banús Charters, I would like help choosing a charter in Puerto Banús.",
  es: "Hola Banús Charters, me gustaría ayuda para elegir un charter en Puerto Banús.",
  fr: "Bonjour Banús Charters, j'aimerais être conseillé pour choisir un charter à Puerto Banús.",
};

export const getWhatsAppUrl = (lang: Lang = "en", customMessage?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage ?? greetings[lang])}`;
