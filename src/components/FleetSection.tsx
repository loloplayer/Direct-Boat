import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Gauge, Ruler, MessageCircle, Mail, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import boat1 from "@/assets/boat1.jpg";
import boat2 from "@/assets/boat2.jpg";
import jetski1 from "@/assets/jetski1.jpg";

/*
 * ─── FLEET CONFIG ────────────────────────────────────────────
 * Each vessel has its OWN whatsapp number and email.
 * To change a vessel's contact, just update these fields:
 */
const fleet = [
  { name: "Marbella Catamaran 42", type: "Catamarán", originalPrice: "390", price: "350", image: boat1, passengers: 12, power: "2×40 CV", length: "12.8 m", whatsapp: "34641992624", email: "catamaran42@example.com" },
  { name: "Azymut 12m", type: "Yate", originalPrice: "470", price: "420", image: boat2, passengers: 10, power: "2×300 CV", length: "12 m", whatsapp: "34641992624", email: "azymut@example.com" },
  { name: "Jet Ski", type: "Jet Ski", originalPrice: "135", price: "120", image: jetski1, passengers: "1–2", power: "130 CV", length: "3.4 m", whatsapp: "34641992624", email: "jetski@example.com" },
];

const BoatCard = ({ boat, index }: { boat: typeof fleet[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const waMsg = t("fleet.waMsg").replace("{name}", boat.name);
  const isJetSki = boat.type === "Jet Ski";

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
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="inline-block px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground font-body text-[10px] uppercase tracking-wider rounded-md font-medium">
              {boat.type}
            </span>
          </div>
          {/* Discount badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-accent text-accent-foreground font-body text-[10px] uppercase tracking-wider rounded-md font-bold">
              <Tag className="w-3 h-3" />
              -10%
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-medium text-foreground mb-1">
            {boat.name}
          </h3>
          {isJetSki && (
            <p className="font-body text-xs text-accent font-medium mb-3">{t("fleet.jetskiNote")}</p>
          )}

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

          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-sm">
              <span className="text-muted-foreground">{t("fleet.from")} </span>
              <span className="text-muted-foreground/60 line-through text-sm mr-1">€{boat.originalPrice}</span>
              <span className="text-accent font-bold text-lg">€{boat.price}</span>
              <span className="text-muted-foreground text-xs"> {t("fleet.perHour")}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-body text-[10px] uppercase tracking-[0.12em] font-semibold rounded-md hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={`mailto:${boat.email}?subject=${encodeURIComponent(t("fleet.inquiry").replace("{name}", boat.name))}&body=${encodeURIComponent(waMsg)}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground font-body text-[10px] uppercase tracking-[0.12em] font-semibold rounded-md hover:bg-muted transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
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
  const { t } = useLanguage();

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 mb-6">
            <Tag className="w-4 h-4 text-accent" />
            <span className="font-body text-sm font-bold text-accent">{t("fleet.discountBanner")}</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-4">
            {t("fleet.title")}
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            {t("fleet.desc")}
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
