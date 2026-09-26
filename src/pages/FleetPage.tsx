import { useState } from "react";
import PageShell from "@/components/PageShell";
import FleetGrid from "@/components/FleetGrid";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { boats } from "@/data/siteData";
import ResponsiveImage from "@/components/ResponsiveImage";

export default function FleetPage() { const { lang, copy } = useLanguage(); const [filter, setFilter] = useState("all"); const filtered = filter === "all" ? boats : boats.filter((boat) => boat.location.id === filter); return <PageShell><Seo lang={lang} page="fleet" path="/fleet" /><section className="page-hero"><ResponsiveImage image={boats[0].images[0]} sizes="100vw" loading="eager" alt="Banús Charters fleet in Marbella" /><div className="page-hero-overlay" /><div className="page-hero-content"><p className="section-kicker">Puerto Banús · Marbella Centre</p><h1>{copy.nav.fleet}</h1><p>{copy.fleetText}</p></div></section><section className="py-20 md:py-28"><div className="mx-auto max-w-7xl px-6 md:px-10"><div className="mb-12 flex flex-wrap gap-2" role="group" aria-label={copy.location}>{[["all", copy.allLocations], ["puerto-banus", copy.puertoBanus], ["marbella-centre", copy.marbellaCentre]].map(([id, label]) => <button key={id} type="button" onClick={() => setFilter(id)} className={`rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[.12em] ${filter === id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}>{label}</button>)}</div><FleetGrid items={filtered} /></div></section></PageShell>; }