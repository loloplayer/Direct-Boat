import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tag, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  const handleCheckAvailability = () => {
    const el = document.getElementById("elegir-embarcacion");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl lg:max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[8.5rem] text-primary-foreground leading-snug sm:leading-tight lg:leading-[1.05] mb-8 lg:mb-10 font-serif font-light tracking-tight"
        >
          {t("hero.title1")}{" "}
          <br className="hidden sm:block" />
          {t("hero.title2")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg lg:text-xl xl:text-2xl text-primary-foreground/85 max-w-2xl lg:max-w-3xl mx-auto mb-6 lg:mb-8 font-serif leading-relaxed"
        >
          {t("hero.desc")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
          className="text-sm lg:text-base text-accent font-body uppercase tracking-widest lg:tracking-[0.3em] mb-6 lg:mb-8"
        >
          {t("hero.subtitle")}
        </motion.p>
        {/* Discount hook */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm mb-5 lg:mb-6"
        >
          <Tag className="w-4 h-4 lg:w-5 lg:h-5 text-accent" />
          <span className="font-body text-sm lg:text-base font-bold text-accent">{t("hero.discount")}</span>
        </motion.div>
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-10 lg:mb-12"
        >
          <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-primary-foreground/70" />
          <span className="font-body text-xs lg:text-sm text-primary-foreground/70 tracking-wide">{t("hero.location")}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6"
        >
          <button
            onClick={handleCheckAvailability}
            className="inline-block px-8 py-4 lg:px-12 lg:py-5 bg-primary text-primary-foreground font-body text-xs lg:text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/30"
          >
            {t("hero.cta")}
          </button>
          <a
            href="#flota"
            className="inline-block px-8 py-4 lg:px-12 lg:py-5 text-primary-foreground font-body text-xs lg:text-sm uppercase tracking-[0.2em] font-semibold border-2 border-primary-foreground/40 hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all rounded-lg"
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
