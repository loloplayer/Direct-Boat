import { useLanguage } from "@/contexts/LanguageContext";

const labels = {
  en: { title: "Two ways into the Mediterranean", text: "Private charters from Puerto Banús and water activities at The Point beach.", banus: "Private yachts", point: "Water activities with our partner", note: "On a clear day you can see Gibraltar and Africa." },
  es: { title: "Dos puertas al Mediterráneo", text: "Charters privados desde Puerto Banús y actividades acuáticas en The Point beach.", banus: "Yates privados", point: "Actividades acuáticas con nuestro socio", note: "En un día claro se ven Gibraltar y África." },
  fr: { title: "Deux accès à la Méditerranée", text: "Charters privés depuis Puerto Banús et activités nautiques à The Point beach.", banus: "Yachts privés", point: "Activités nautiques avec notre partenaire", note: "Par temps clair, Gibraltar et l’Afrique sont visibles." },
} as const;

export default function CoastMap() {
  const { lang } = useLanguage(); const t = labels[lang]; const stops = [["Puerto Banús", t.banus], ["The Point beach", t.point]];
  return <section className="overflow-hidden bg-primary py-16 text-primary-foreground md:py-36"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><p className="section-kicker">Marbella coastline</p><h2 className="section-title max-w-full text-primary-foreground">{t.title}</h2><p className="section-copy text-primary-foreground/65">{t.text}</p><p className="mt-8 border-l border-brass pl-5 font-display text-2xl italic text-brass md:mt-10">{t.note}</p></div><ol className="relative ml-2 grid border-l border-brass/50 pl-7">{stops.map(([name, note], index) => <li key={name} className="relative py-7 first:pt-0 last:pb-0"><span className="absolute -left-[2.15rem] top-8 size-3 rounded-full border border-brass bg-primary first:top-1" /><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-brass">0{index + 1}</span><strong className="mt-1 block font-display text-3xl font-medium leading-tight">{name}</strong><span className="mt-2 block text-sm leading-6 text-primary-foreground/65">{note}</span></li>)}</ol></div></div></section>;
}