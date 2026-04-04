import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, ShieldCheck, Banknote, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const features = [
    { icon: UserCheck, label: t("exp.f1.label"), desc: t("exp.f1.desc") },
    { icon: Banknote, label: t("exp.f2.label"), desc: t("exp.f2.desc") },
    { icon: ShieldCheck, label: t("exp.f3.label"), desc: t("exp.f3.desc") },
    { icon: Clock, label: t("exp.f4.label"), desc: t("exp.f4.desc") },
  ];

  return (
    <section id="experiencia" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[hsl(222_80%_14%/0.85)]" />
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl text-primary-foreground mb-4 font-serif font-normal">
            {t("exp.title")}
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/75 max-w-2xl mx-auto font-serif">
            {t("exp.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm"
            >
              <f.icon className="text-accent" size={32} strokeWidth={1.5} />
              <span className="font-body text-sm text-primary-foreground font-semibold uppercase tracking-wider">
                {f.label}
              </span>
              <p className="font-body text-xs text-primary-foreground/60 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
