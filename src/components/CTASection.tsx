import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ctaBg from "@/assets/cta-bg.jpg";

const WHATSAPP_URL = "https://wa.me/000000000000?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20y%20precios.";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
        className="relative z-10 container mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-5xl font-medium text-primary-foreground mb-6 font-serif">
          ¿Listo para descubrir Marbella desde el mar?
        </h2>
        <p className="text-base md:text-lg text-primary-foreground/75 max-w-xl mx-auto mb-10 font-serif">
            Comunicate con nosotros y te enviaremos disponibilidad, precios y recomendaciones personalizadas.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-accent/90 transition-colors">
          
          ​CONTACTANOS   
        </a>
      </motion.div>
    </section>);

};

export default CTASection;