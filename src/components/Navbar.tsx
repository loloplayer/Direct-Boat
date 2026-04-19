import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav.fleet"), href: "#flota" },
    { label: t("nav.experience"), href: "#experiencia" },
    { label: t("nav.gallery"), href: "#galeria" },
    { label: t("nav.testimonials"), href: "#testimonios" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <a
            href="#"
            className="group flex items-center gap-2 font-display text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase leading-none"
            style={{ color: scrolled ? "hsl(var(--primary))" : "hsl(var(--primary-foreground))" }}
          >
            <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent text-accent-foreground text-sm md:text-base font-black shadow-md ring-2 ring-accent/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V12" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12L4 7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12l8-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="flex items-baseline gap-1.5">
              <span>DIRECT</span>
              <span className="text-accent drop-shadow-sm">BOAT</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-body font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                  scrolled ? "text-foreground" : "text-primary-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1.5 text-xs font-body font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
              aria-label="Change language"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "es" ? "EN" : "ES"}
            </button>

            <a
              href="#reservar"
              className="px-5 py-2.5 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.12em] font-semibold rounded-md hover:bg-accent/90 transition-colors"
            >
              {t("nav.book")}
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 text-xs font-body font-semibold ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button
              className={scrolled ? "text-foreground" : "text-primary-foreground"}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body font-medium uppercase tracking-[0.15em] text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservar"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.12em] font-semibold rounded-md"
              >
                {t("nav.bookNow")}
              </a>
            </div>
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;
