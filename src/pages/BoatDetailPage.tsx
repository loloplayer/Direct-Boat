import { Navigate, useParams } from "react-router-dom";
import { Check, MapPin, MessageCircle, Ruler, ShipWheel, Users } from "lucide-react";
import PageShell from "@/components/PageShell";
import Seo from "@/components/Seo";
import BookingBox from "@/components/BookingBox";
import BoatGallery from "@/components/BoatGallery";
import { getBoat, money, SITE_URL } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import InViewVideo from "@/components/InViewVideo";

const pageText = {
  en: { photos: "Photos", onboard: "On board", book: "Book on WhatsApp" },
  es: { photos: "Fotos", onboard: "A bordo", book: "Reservar por WhatsApp" },
  fr: { photos: "Photos", onboard: "À bord", book: "Réserver sur WhatsApp" },
} as const;

export default function BoatDetailPage() {
  const { slug } = useParams();
  const { lang, copy } = useLanguage();
  const boat = getBoat(slug);
  if (!boat) return <Navigate to={`/${lang}/fleet`} replace />;
  const t = pageText[lang];
  const lowest = Math.min(...boat.prices.map((price) => price.price));
  const offers = boat.prices.map((price) => ({ "@type": "Offer", priceCurrency: "EUR", price: price.price, url: `${SITE_URL}/${lang}/fleet/${boat.slug}`, availability: "https://schema.org/InStock", description: `${price.label[lang]} · ${copy.vatIncluded}`, priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "EUR", price: price.price, valueAddedTaxIncluded: true } }));
  const schema = { "@context": "https://schema.org", "@type": "Product", name: boat.name, description: boat.description[lang], image: boat.images.map((image) => image.src), brand: { "@type": "Brand", name: "Banús Charters" }, additionalProperty: [{ "@type": "PropertyValue", name: copy.capacity, value: boat.capacity[lang] }], location: { "@type": "Place", name: boat.location.name[lang], address: boat.location.address[lang], geo: { "@type": "GeoCoordinates", latitude: boat.location.latitude, longitude: boat.location.longitude } }, offers };
  const gallery = boat.images.filter((image, index, all) => all.findIndex((item) => item.src === image.src) === index);
  return <PageShell><Seo lang={lang} title={`${boat.name} | Banús Charters`} description={boat.description[lang]} path={`/fleet/${boat.slug}`} jsonLd={schema} />
    <section className="border-b border-border pb-8 pt-28 md:pb-10 md:pt-32"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="section-kicker">{boat.type[lang]}</p><h1 className="font-display text-5xl font-medium leading-none md:text-7xl">{boat.name}</h1><p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sea px-3 py-2 text-xs font-medium text-foam"><MapPin className="size-4" />{boat.location.name[lang]}</p></div><div className="lg:text-right"><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-end"><span className="flex items-center gap-1.5"><Users className="size-4" />{boat.capacity[lang]}</span>{boat.length && <span className="flex items-center gap-1.5"><Ruler className="size-4" />{boat.length}</span>}{boat.cabins && <span className="flex items-center gap-1.5"><ShipWheel className="size-4" />{boat.cabins} {copy.cabins.toLowerCase()}</span>}</div><p className="mt-4 font-display text-3xl">{copy.from} {money(lowest, lang)} <span className="font-body text-xs text-muted-foreground">· {copy.vatIncluded}</span></p></div></div></div></section>
    <section aria-label={t.photos} className="mx-auto max-w-[1500px] py-3"><BoatGallery images={gallery} boatName={boat.name} lang={lang} /></section>
    <section className="py-16 md:py-24"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[minmax(0,1fr)_390px] md:px-10"><div><p className="max-w-3xl font-display text-3xl leading-snug text-foreground md:text-4xl">{boat.description[lang]}</p><div className="mt-14"><h2 className="font-display text-4xl">{copy.included}</h2><ul className="mt-7 grid gap-3 sm:grid-cols-2">{boat.includes.map((item) => <li key={item.en} className="flex items-start gap-3 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-brass-ink" />{item[lang]}</li>)}</ul></div><div className="mt-16"><div className="flex items-end justify-between gap-4"><h2 className="font-display text-4xl">{copy.prices}</h2><p className="pb-1 text-xs text-muted-foreground">{copy.vatIncluded}</p></div><div className="mt-6 divide-y divide-border border-y border-border">{boat.prices.map((price) => <div key={price.label.en} className="flex justify-between py-4 text-sm"><span className="text-muted-foreground">{price.label[lang]}</span><strong>{money(price.price, lang)}</strong></div>)}</div></div>{boat.featuredVideo && <div className="mt-16"><h2 className="font-display text-4xl">{t.onboard}</h2><InViewVideo src={boat.featuredVideo.src} poster={boat.featuredVideo.poster.src} aria-label={`${boat.name} onboard in Marbella`} className="mt-6 aspect-[9/16] max-h-[600px] w-full max-w-[420px] rounded-lg object-cover" /></div>}</div><BookingBox boat={boat} /></div></section>
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-border bg-card px-4 py-3 shadow-brand md:hidden"><span className="font-display text-xl">{copy.from} {money(lowest, lang)}</span><Button asChild><a href="#booking"><MessageCircle />{t.book}</a></Button></div>
  </PageShell>;
}