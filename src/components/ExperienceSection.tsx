import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Clock, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
{ icon: Anchor, label: "Flota premium" },
{ icon: Clock, label: "Alquiler por horas" },
{ icon: MessageCircle, label: "Reserva rápida por WhatsApp" }];


const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiencia" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#081b4f]/[0.52]" />
      </div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          
          <h2 className="text-3xl md:text-5xl text-primary-foreground mb-6 font-serif font-normal">
            La experiencia Marbella desde el mar
          </h2>
          <p className="font-body text-base md:text-lg text-primary-foreground/75 max-w-2xl mx-auto mb-14">
            Desde paseos al atardecer hasta días inolvidables navegando por la costa, ofrecemos barcos y motos de agua premium para quienes quieren vivir Marbella de una manera exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-16">
            {features.map((f, i) =>
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="flex flex-col items-center gap-3">
              
                <f.icon className="text-accent" size={28} strokeWidth={1.5} />
                <span className="font-body text-sm text-primary-foreground/90 uppercase tracking-wider">
                  {f.label}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default ExperienceSection;