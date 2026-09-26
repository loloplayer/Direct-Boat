import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandMark from "./BrandMark";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/data/siteData";

export default function SiteHeader() {
  const { lang, setLang, copy } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => setOpen(false), [location.pathname]);
  const links = [[copy.nav.fleet, "fleet"], [copy.nav.activities, "activities"], [copy.nav.experiences, "experiences"], [copy.nav.faq, "faq"], [copy.nav.about, "about"], [copy.nav.contact, "contact"]];
  const onHome = location.pathname === `/${lang}` || location.pathname === `/${lang}/`;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || !onHome ? "border-b border-primary-foreground/10 bg-primary/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link to={`/${lang}`} aria-label="Banús Charters home"><BrandMark inverse /></Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, path]) => <Link key={path} to={`/${lang}/${path}`} className={`font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-accent text-primary-foreground`}>{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex" aria-label="Language selector">{(["en", "es", "fr"] as Lang[]).map((item) => <Button key={item} variant="ghost" size="sm" onClick={() => setLang(item)} className={`h-8 px-2 text-[10px] uppercase ${item === lang ? "text-accent" : "text-primary-foreground/65"}`}>{item}</Button>)}</div>
          <Button asChild size="sm"><Link to={`/${lang}/contact`}>{copy.askAvailability}</Link></Button>
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <div className="border-t border-border bg-background px-5 py-6 lg:hidden"><nav className="flex flex-col gap-1">{links.map(([label, path]) => <Button key={path} asChild variant="ghost" className="justify-start"><Link to={`/${lang}/${path}`}>{label}</Link></Button>)}<div className="mt-4 flex gap-2">{(["en", "es", "fr"] as Lang[]).map((item) => <Button key={item} variant={item === lang ? "default" : "outline"} size="sm" onClick={() => setLang(item)}>{item.toUpperCase()}</Button>)}</div></nav></div>}
    </header>
  );
}