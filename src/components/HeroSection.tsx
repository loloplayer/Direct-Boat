import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_URL = "https://wa.me/000000000000?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20de%20barcos%20en%20Marbella.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Puerto Banús marina en Marbella"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0" style={{ background: "var(--navy-overlay)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl text-primary-foreground leading-tight mb-6 font-serif font-light">
          
          Alquiler de Barcos{" "}
          <br className="hidden sm:block" />
          de Lujo en Marbella
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-serif">
          
          Descubre Marbella desde el mar con nuestros barcos y motos de agua
          disponibles por hora.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            
            Consultar disponibilidad 
          </a>
          <a
            href="#flota"
            className="inline-block px-8 py-4 text-primary-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold border-b-2 border-primary-foreground/40 hover:border-primary-foreground transition-colors">
            
            Ver nuestra flota
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        
        <div className="w-px h-16 bg-primary-foreground/30" />
      </motion.div>
    </section>);

};

export default HeroSection;