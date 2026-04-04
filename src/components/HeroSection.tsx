import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tag } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_NUMBER = "34641992624";

const HeroSection = () => {
  const { t } = useLanguage();
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("hero.desc").slice(0, 80)
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background with Ken Burns effect */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Puerto Banús marina en Marbella"
          width={1920}
          height={1080}
          className="w-full h-full object-cover animate-hero-ken-burns"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl text-primary-foreground leading-tight mb-6 font-serif font-light"
        >
          {t("hero.title1")}{" "}
          <br className="hidden sm:block" />
          {t("hero.title2")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-4 font-serif"
        >
          {t("hero.desc")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
          className="text-sm text-accent font-body uppercase tracking-widest mb-4"
        >
          {t("hero.subtitle")}
        </motion.p>
        {/* Discount hook */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm mb-10"
        >
          <Tag className="w-4 h-4 text-accent" />
          <span className="font-body text-sm font-bold text-accent">{t("hero.discount")}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("hero.cta")}
          </a>
          <a
            href="#flota"
            className="inline-block px-8 py-4 text-primary-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold border-b-2 border-primary-foreground/40 hover:border-primary-foreground transition-colors bg-primary"
          >
            {t("hero.fleet")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-primary-foreground/30" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
