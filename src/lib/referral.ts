import type { Lang } from "@/data/siteData";

export const THE_POINT_WHATSAPP = "34622264991";
const GENERAL_ENQUIRY = "Flyer / general enquiry";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const makeRefCode = () => Array.from(crypto.getRandomValues(new Uint8Array(4)), (n) => chars[n % chars.length]).join("");

export const thePointMessage = (lang: Lang, code: string, activity: string, people: string, date: string) => {
  if (activity === GENERAL_ENQUIRY) {
    return {
      en: `Hi! I'm coming from the Banús Charters website (ref BC-${code}). I'd like information about your water activities.`,
      es: `¡Hola! Vengo de parte de la web de Banús Charters (ref BC-${code}). Me gustaría información sobre vuestras actividades acuáticas.`,
      fr: `Bonjour ! Je viens du site de Banús Charters (réf BC-${code}). J'aimerais des informations sur vos activités nautiques.`,
    }[lang];
  }
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
  const referral = {
    ref_code: `BC-${code}`, activity: activity.slice(0, 200), lang,
    page: window.location.pathname.slice(0, 300), referrer: document.referrer.slice(0, 1000) || null,
    user_agent: navigator.userAgent.slice(0, 500),
  };
  void fetch(`${SUPABASE_URL}/rest/v1/activity_referrals`, {
    method: "POST",
    keepalive: true,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(referral),
  }).then((response) => {
    if (!response.ok) console.warn("referral", response.statusText);
  }).catch((error: unknown) => {
    console.warn("referral", error instanceof Error ? error.message : "request failed");
  });
  return `https://wa.me/${THE_POINT_WHATSAPP}?text=${encodeURIComponent(thePointMessage(lang, code, activity, people, date))}`;
}
