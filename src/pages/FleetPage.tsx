import PageShell from "@/components/PageShell";
import FleetGrid from "@/components/FleetGrid";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import hero from "@/assets/catamaran_1_aerial.jpg";

export default function FleetPage() { const { lang, copy } = useLanguage(); return <PageShell><Seo lang={lang} page="fleet" path="/fleet" /><section className="page-hero"><img src={hero} alt="Banús Charters fleet in Puerto Banús" /><div className="page-hero-overlay" /><div className="page-hero-content"><p className="section-kicker">Puerto Banús · Marbella</p><h1>{copy.nav.fleet}</h1><p>{copy.fleetText}</p></div></section><section className="py-20 md:py-28"><div className="mx-auto max-w-7xl px-6 md:px-10"><FleetGrid /></div></section></PageShell>; }