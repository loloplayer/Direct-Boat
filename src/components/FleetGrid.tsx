import { Link } from "react-router-dom";
import { ArrowUpRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { boats, money } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FleetGrid({ limit }: { limit?: number }) {
  const { lang, copy } = useLanguage();
  return <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{boats.slice(0, limit).map((boat, i) => <motion.article key={boat.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * .07 }}><Link to={`/${lang}/fleet/${boat.slug}`} className="group block"><div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted"><img src={boat.images[0]} alt={`${boat.name} private charter in Puerto Banús`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" /></div><div className="flex items-start justify-between border-b border-border py-5"><div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{boat.type[lang]}</p><h3 className="font-display text-2xl font-medium">{boat.name}</h3><p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-3.5" /> {boat.capacity} · {copy.from} {money(boat.prices[0].price, lang)}</p></div><span className="grid size-9 place-items-center rounded-sm border border-border transition-colors group-hover:border-accent group-hover:text-accent"><ArrowUpRight className="size-4" /></span></div></Link></motion.article>)}</div>;
}