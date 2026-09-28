import type { Lang } from "@/data/siteData";
import { supabase } from "@/integrations/supabase/client";

export const THE_POINT_WHATSAPP = "34622264991";

const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const makeRefCode = () => Array.from(crypto.getRandomValues(new Uint8Array(4)), (n) => chars[n % chars.length]).join("");

export const thePointMessage = (lang: Lang, code: string, activity: string, people: string, date: string) => {
  const details = {
    en: `${people ? ` for ${people} people` : ""}${date ? ` on ${date}` : ""}`,
    es: `${people ? ` para ${people} personas` : ""}${date ? ` el ${date}` : ""}`,
    fr: `${people ? ` pour ${people} personnes` : ""}${date ? ` le ${date}` : ""}`,
  }[lang];
  return {
    en: `Hi! I'm coming from the Banús Charters website (ref BC-${code}). I'd like to book ${activity}${details}.`,
    es: `¡Hola! Vengo de parte de la web de Banús Charters (ref BC-${code}). Me gustaría reservar ${activity}${details}.`,
    fr: `Bonjour ! Je viens du site de Banús Charters (réf BC-${code}). Je souhaite réserver ${activity}${details}.`,
  }[lang];
};

/** Records the referral without blocking; returns the WhatsApp URL to open. */
export function trackAndGetThePointUrl(lang: Lang, activity: string, people: string, date: string) {
  const code = makeRefCode();
  void supabase.from("activity_referrals" as never).insert({
    ref_code: `BC-${code}`, activity: activity.slice(0, 200), lang,
    page: window.location.pathname.slice(0, 300), referrer: document.referrer.slice(0, 1000) || null,
    user_agent: navigator.userAgent.slice(0, 500),
  } as never);
  return `https://wa.me/${THE_POINT_WHATSAPP}?text=${encodeURIComponent(thePointMessage(lang, code, activity, people, date))}`;
}
