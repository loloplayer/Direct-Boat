import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import boat1 from "@/assets/boat1.jpg";
import boat2 from "@/assets/boat2.jpg";
import boat3 from "@/assets/boat3.jpg";
import boat4 from "@/assets/boat4.jpg";

const boats = [
  { name: "Marbella Catamaran 42", type: "Catamarán", price: "€350", image: boat1 },
  { name: "Azure Pearl 38", type: "Yate de motor de lujo", price: "€420", image: boat2 },
  { name: "Solmare 31", type: "Sport Cruiser", price: "€260", image: boat3 },
  { name: "Golden Wave 27", type: "Day Boat Premium", price: "€190", image: boat4 },
];

const BoatCard = ({ boat, index }: { boat: typeof boats[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const waMsg = `Hola, estoy interesado en alquilar el barco ${boat.name}. ¿Podrían enviarme disponibilidad y detalles?`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg mb-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <img
          src={boat.image}
          alt={boat.name}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground font-body text-xs uppercase tracking-wider rounded-md">
            {boat.type}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <a
            href={`https://wa.me/000000000000?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center px-6 py-3 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold rounded-md hover:bg-accent/90 transition-colors"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>
      <h3 className="font-display text-xl font-medium text-foreground mb-1">
        {boat.name}
      </h3>
      <p className="font-body text-sm text-accent font-semibold">
        Desde {boat.price} por hora
      </p>
    </motion.div>
  );
};

const FleetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="flota" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-5xl font-medium text-foreground text-center mb-16"
        >
          Nuestra Flota
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {boats.map((boat, i) => (
            <BoatCard key={boat.name} boat={boat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
