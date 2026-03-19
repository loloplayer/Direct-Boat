import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Flota", href: "#flota" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Galería", href: "#galeria" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className="font-display text-xl md:text-2xl font-semibold tracking-wide"
            style={{ color: scrolled ? "hsl(var(--primary))" : "hsl(var(--primary-foreground))" }}
          >
            Marbella Horizonte
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
            <a
              href="#reservar"
              className="px-5 py-2.5 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.12em] font-semibold rounded-md hover:bg-accent/90 transition-colors"
            >
              Reservar
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                Reservar ahora
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 safe-area-bottom">
        <a
          href="#reservar"
          className="flex items-center justify-center w-full py-3.5 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.15em] font-bold rounded-lg hover:bg-accent/90 transition-colors"
        >
          Reservar ahora
        </a>
      </div>
    </>
  );
};

export default Navbar;
