import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ctaBg from "@/assets/cta-bg.jpg";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const WHATSAPP_URL = "https://wa.me/34600746712?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20alquiler.";

  return (
    <section id="contacto" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0">
        <img src={ctaBg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "var(--navy-overlay)" }} />
      </div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-medium text-primary-foreground mb-4 font-serif">
          {t("cta.title")}
        </h2>
        <p className="text-base md:text-lg text-primary-foreground/75 max-w-xl mx-auto mb-3 font-serif">
          {t("cta.desc")}
        </p>
        <p className="text-sm text-accent font-body uppercase tracking-widest mb-10">
          {t("cta.subtitle")}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          {t("cta.button")}
        </a>
      </motion.div>
    </section>
  );
};

export default CTASection;
