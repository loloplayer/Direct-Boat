import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Clock, MessageCircle, ShieldCheck, Banknote, UserCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: UserCheck, label: "Trato directo con el propietario", desc: "Habla sin intermediarios con quien realmente conoce su embarcación." },
  { icon: Banknote, label: "Sin comisiones ocultas", desc: "El precio que ves es el precio que pagas. Sin sorpresas ni recargos." },
  { icon: ShieldCheck, label: "Pagos seguros y directos", desc: "Toda transacción es directamente con el dueño. Máxima confianza." },
  { icon: Clock, label: "Flexible: por horas o por día", desc: "Desde 1 hora hasta un día completo. Tú decides cuánto tiempo navegar." },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            ¿Por qué reservar con nosotros?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/75 max-w-2xl mx-auto font-serif">
            Somos el puente directo entre tú y los propietarios de embarcaciones en Marbella.
            Sin agencias, sin comisiones — solo experiencias auténticas en el mar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
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