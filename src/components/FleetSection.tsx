import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Gauge, Ruler } from "lucide-react";
import boat1 from "@/assets/boat1.jpg";
import boat2 from "@/assets/boat2.jpg";
import boat3 from "@/assets/boat3.jpg";
import boat4 from "@/assets/boat4.jpg";
import jetski1 from "@/assets/jetski1.jpg";
import jetski2 from "@/assets/jetski2.jpg";

const fleet = [
  { name: "Marbella Catamaran 42", type: "Catamarán", price: "350", image: boat1, passengers: 12, power: "2×40 CV", length: "12.8 m" },
  { name: "Azure Pearl 38", type: "Yate de motor", price: "420", image: boat2, passengers: 10, power: "2×300 CV", length: "11.6 m" },
  { name: "Solmare 31", type: "Sport Cruiser", price: "260", image: boat3, passengers: 8, power: "260 CV", length: "9.4 m" },
  { name: "Golden Wave 27", type: "Day Boat Premium", price: "190", image: boat4, passengers: 6, power: "200 CV", length: "8.2 m" },
  { name: "Moto de Agua Sport", type: "Moto de Agua", price: "150", image: jetski1, passengers: 2, power: "130 CV", length: "3.4 m" },
  { name: "Moto de Agua Touring", type: "Moto de Agua", price: "120", image: jetski2, passengers: 2, power: "110 CV", length: "3.2 m" },
];

const BoatCard = ({ boat, index }: { boat: typeof fleet[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const waMsg = `Hola, estoy interesado en alquilar el ${boat.name}. ¿Podrían enviarme disponibilidad y detalles?`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="relative overflow-hidden">
          <img
            src={boat.image}
            alt={boat.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground font-body text-[10px] uppercase tracking-wider rounded-md font-medium">
              {boat.type}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-medium text-foreground mb-3">
            {boat.name}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="font-body text-xs">{boat.passengers}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Gauge className="w-3.5 h-3.5" />
              <span className="font-body text-xs">{boat.power}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Ruler className="w-3.5 h-3.5" />
              <span className="font-body text-xs">{boat.length}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-body text-sm">
              <span className="text-muted-foreground">Desde </span>
              <span className="text-accent font-bold text-lg">€{boat.price}</span>
              <span className="text-muted-foreground text-xs"> /hora</span>
            </p>
            <a
              href={`https://wa.me/000000000000?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground font-body text-[10px] uppercase tracking-[0.12em] font-semibold rounded-md hover:bg-primary/90 transition-colors"
            >
              Consultar
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FleetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="flota" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-4">
            Nuestra Flota
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Barcos y motos de agua premium para vivir Marbella desde el mar.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((boat, i) => (
            <BoatCard key={boat.name} boat={boat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
