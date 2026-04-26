import { Instagram, MapPin, Anchor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[hsl(222_80%_10%)] py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center gap-3">
            <Anchor className="w-6 h-6 text-accent" />
            <h3 className="font-display text-3xl md:text-4xl font-light text-primary-foreground tracking-wide">
              {t("footer.tagline")}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-primary-foreground/70">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-body text-sm tracking-wide">{t("footer.currentLocation")}</span>
          </div>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-body text-sm">@directboat</span>
          </a>

          <div className="w-16 h-px bg-primary-foreground/20" />

          <div>
            <p className="font-display text-lg text-primary-foreground mb-2">Direct Boat</p>
            <p className="font-body text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} Direct Boat. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
