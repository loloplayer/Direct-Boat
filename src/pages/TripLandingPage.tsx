import { Link, Navigate, useParams } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import Seo from "@/components/Seo";
import ResponsiveImage from "@/components/ResponsiveImage";
import FleetGrid from "@/components/FleetGrid";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { findLanding, landingPages, localizedTripPath } from "@/data/landingPages";
import { guideSections, intentCopy, intentFaq, tripUi } from "@/data/tripContent";
import { boats, money, SITE_URL } from "@/data/siteData";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function TripLandingPage() {
 const { lang, copy } = useLanguage(); const { tripSlug = "" } = useParams();
 const page = findLanding(lang, tripSlug);
 if (!page) return <Navigate to={`/${lang}/fleet`} replace />;
 const selected = page.boatSlugs.flatMap((slug) => boats.filter((boat) => boat.slug === slug));
 const ui = tripUi[lang];
 const faq = [intentFaq[page.id][lang], ...copy.faq.filter((_, index) => [0,2,3,4].includes(index))];
 const schema = { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}${localizedTripPath(page,lang)}#faq`, mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
 const image = page.id === "yacht" ? boats[1].images[0] : page.id === "dolphins" ? { src: "/media/gallery_dolphins-640.webp", width: 640, height: 480 } : { src: `/media/${page.imageName}-1200.webp`, srcSet: `/media/${page.imageName}-640.webp 640w, /media/${page.imageName}-1200.webp 1200w, /media/${page.imageName}-2000.webp 2000w`, width: 1500, height: 2000 };
 return <PageShell><Seo lang={lang} title={`${page.title[lang]} | Banús Charters`} description={page.description[lang]} path={`/${page.slug[lang]}`} jsonLd={schema}/>
  <section className="page-hero min-h-[50vh]"><ResponsiveImage image={image} sizes="100vw" loading="eager" alt={page.title[lang]} /><div className="page-hero-overlay"/><div className="page-hero-content"><p className="section-kicker">Puerto Banús · Marbella</p><h1>{page.title[lang]}</h1></div></section>
  <section className="py-16 md:py-24"><div className="mx-auto max-w-3xl px-5 md:px-10"><p className="text-lg leading-8 text-muted-foreground">{intentCopy[page.id][lang]}</p><div className="mt-12 space-y-10">{guideSections[lang].map((section) => <article key={section.heading}><h2 className="font-display text-3xl md:text-4xl">{section.heading}</h2><p className="mt-4 leading-8 text-muted-foreground">{section.text}</p></article>)}</div><Button asChild className="mt-10"><a href={getWhatsAppUrl(lang)} target="_blank" rel="noreferrer"><MessageCircle/>{copy.bookWhatsapp}</a></Button></div></section>
  <section className="border-y border-border bg-card py-16 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-10"><h2 className="section-title">{ui.boats}</h2><div className="mt-10"><FleetGrid items={selected}/></div><div className="mt-10 divide-y divide-border">{selected.map((boat) => <article key={boat.slug} className="py-6"><h3 className="font-display text-3xl"><Link to={`/${lang}/fleet/${boat.slug}`}>{boat.name}</Link></h3><p className="mt-3 font-medium">{copy.from} {money(Math.min(...boat.prices.map((price) => price.price)),lang)} · {copy.vatIncluded} · {boat.location.name[lang]}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{ui.duration}: {boat.prices.map((price) => price.label[lang]).join(" · ")}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{copy.included}: {boat.includes.map((item) => item[lang]).join(" · ")}</p></article>)}</div><Button asChild variant="outline" className="mt-8"><Link to={`/${lang}/fleet`}>{copy.viewFleet}<ArrowRight/></Link></Button></div></section>
  <section className="py-16 md:py-24"><div className="mx-auto max-w-3xl px-5 md:px-10"><h2 className="section-title">{ui.faq}</h2><div className="mt-10 divide-y divide-border">{faq.map(([question, answer]) => <article key={question} className="py-6"><h3 className="font-display text-2xl">{question}</h3><p className="mt-3 leading-7 text-muted-foreground">{answer}</p></article>)}</div><h2 className="mt-12 font-display text-3xl">{ui.more}</h2><div className="mt-6 flex flex-col gap-3">{landingPages.filter((trip) => trip.id !== page.id).map((trip) => <Link key={trip.id} to={localizedTripPath(trip,lang)} className="text-sm underline underline-offset-4">{trip.title[lang]}</Link>)}</div></div></section>
 </PageShell>;
}
