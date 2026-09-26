import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import Seo from "@/components/Seo";
import { experiences } from "@/data/content";
import { boats } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import sunset from "@/assets/gallery4.jpg";
import celebration from "@/assets/gallery3.jpg";
import family from "@/assets/catamaran_5_aperitivo.jpg";
import corporate from "@/assets/searay_interior.jpg";
import jetski from "@/assets/jetski2.jpg";
const images = [sunset, celebration, family, corporate, jetski];

export default function ExperiencesPage() { const { lang, copy } = useLanguage(); return <PageShell><Seo lang={lang} page="experiences" path="/experiences" /><section className="pt-36 pb-20"><div className="mx-auto max-w-7xl px-6 md:px-10"><p className="section-kicker">Puerto Banús · Marbella</p><h1 className="max-w-4xl font-display text-5xl md:text-7xl">{copy.expTitle}</h1><p className="section-copy max-w-2xl">{copy.expText}</p></div></section><div>{experiences.map((exp, i) => { const suitable = boats.filter((boat) => boat.experiences.includes(exp.id)); return <section id={exp.id} key={exp.id} className={`border-t border-border py-16 md:py-24 ${i % 2 ? "bg-muted" : ""}`}><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2 md:px-10"><img src={images[i]} alt={`${exp.title[lang]} in Marbella`} className={`aspect-[4/3] w-full rounded-sm object-cover ${i % 2 ? "md:order-2" : ""}`} /><div><span className="font-display text-5xl text-accent">0{i + 1}</span><h2 className="mt-4 font-display text-4xl md:text-5xl">{exp.title[lang]}</h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">{exp.text[lang]}</p><div className="mt-8 flex flex-wrap gap-3">{suitable.map((boat) => <Link key={boat.slug} to={`/${lang}/fleet/${boat.slug}`} className="inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-medium">{boat.name}<ArrowRight className="size-3" /></Link>)}</div></div></div></section>; })}</div></PageShell>; }