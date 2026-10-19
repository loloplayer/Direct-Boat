import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { instagramImages } from "@/data/siteData";
import ResponsiveImage from "./ResponsiveImage";

const INSTAGRAM_URL = "https://www.instagram.com/banuscharters/";

const copy = {
  en: { heading: "See the sea from our Instagram", text: "Real days on board, dolphins and sunsets in Puerto Banús.", follow: "Follow @banuscharters", alt: "Banús Charters on Instagram" },
  es: { heading: "Míralo en nuestro Instagram", text: "Días reales a bordo, delfines y atardeceres en Puerto Banús.", follow: "Seguir a @banuscharters", alt: "Banús Charters en Instagram" },
  fr: { heading: "Suivez-nous sur Instagram", text: "Journées réelles à bord, dauphins et couchers de soleil à Puerto Banús.", follow: "Suivre @banuscharters", alt: "Banús Charters sur Instagram" },
  de: { heading: "Folgen Sie uns auf Instagram", text: "Echte Tage an Bord, Delfine und Sonnenuntergänge in Puerto Banús.", follow: "@banuscharters folgen", alt: "Banús Charters auf Instagram" },
} as const;

export default function InstagramSection() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <section className="py-16 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <p className="section-kicker text-brass-ink">@banuscharters</p>
          <h2 className="section-title">{t.heading}</h2>
          <p className="section-copy">{t.text}</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {instagramImages.map((image) => (
            <a
              key={image.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              aria-label={t.alt}
              className="group relative block aspect-square overflow-hidden rounded-[4px]"
            >
              <ResponsiveImage image={image} sizes="(max-width: 768px) 50vw, 33vw" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-40 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                <Instagram className="size-7 text-primary-foreground opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 rounded-[2px] border border-brass px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-brass-ink transition-colors hover:bg-brass hover:text-primary-foreground"
          >
            <Instagram className="size-5" strokeWidth={1.5} aria-hidden="true" />
            {t.follow}
          </a>
        </div>
      </div>
    </section>
  );
}
