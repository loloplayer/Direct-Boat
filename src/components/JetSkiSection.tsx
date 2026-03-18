import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import jetski1 from "@/assets/jetski1.jpg";
import jetski2 from "@/assets/jetski2.jpg";

const WHATSAPP_URL = "https://wa.me/000000000000?text=Hola%2C%20estoy%20interesado%20en%20alquilar%20una%20moto%20de%20agua.%20%C2%BFPodr%C3%ADan%20enviarme%20disponibilidad%20y%20precios%3F";

const JetSkiSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="motos" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}>
            
            <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-6">
              Motos de agua
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground mb-10 max-w-lg">
              Si buscas adrenalina en el mar, nuestras motos de agua son perfectas para una experiencia emocionante en Marbella.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <div className="bg-muted rounded-lg px-6 py-5">
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">1 hora</p>
                <p className="font-display text-2xl font-semibold text-foreground">desde €150</p>
              </div>
              <div className="bg-muted rounded-lg px-6 py-5">
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">2 horas</p>
                <p className="font-display text-2xl font-semibold text-foreground">desde €280</p>
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-accent/90 transition-colors">
              
              RESERVAR
            </a>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4">
            
            <img
              src={jetski1}
              alt="Moto de agua en acción"
              className="rounded-lg w-full h-64 object-cover"
              loading="lazy" />
            
            <img
              src={jetski2}
              alt="Motos de agua en marina"
              className="rounded-lg w-full h-64 object-cover mt-8"
              loading="lazy" />
            
          </motion.div>
        </div>
      </div>
    </section>);

};

export default JetSkiSection;