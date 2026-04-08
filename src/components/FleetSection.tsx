import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Gauge, Ruler, Anchor, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import catamaranImg from "@/assets/catamaran_bali.jpg";
import azimutImg from "@/assets/azimut39.jpg";
import rinkerImg from "@/assets/rinker.jpg";
import jetski1 from "@/assets/jetski1.jpg";

const fleet = [
  {
    name: "Catamarán Bali 4.0",
    type: "Catamarán",
    image: catamaranImg,
    passengers: "10 + crew",
    power: "2×40 CV Volvo",
    length: "12.50 m",
    priceFrom: "375",
    pricePer: "h",
    includes: ["Captain & crew", "Rosé wine, Cava ×2", "Beer, soft drinks, water", "Paddle surf, snorkel", "Towels, Bluetooth music", "Gasoline"],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
  {
    name: "Azimut 39 Fly",
    type: "Yate",
    image: azimutImg,
    passengers: 12,
    power: "Flybridge",
    length: "12.30 m",
    priceFrom: "400",
    pricePer: "h",
    includes: ["Captain", "Champagne ×2", "White wine ×2", "Drinks (limited)", "Paddle surf", "Insurance"],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
  {
    name: "Rinker 296 Captiva",
    type: "Lancha",
    image: rinkerImg,
    passengers: 8,
    power: "Sport cruiser",
    length: "9.4 m",
    priceFrom: "250",
    pricePer: "h",
    includes: ["Captain", "Welcome drink", "Stereo", "Gasoline", "V.A.T"],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
  {
    name: "Jet Ski",
    type: "Jet Ski",
    image: jetski1,
    passengers: "1–2",
    power: "130 CV",
    length: "3.4 m",
    priceFrom: "120",
    pricePer: "h",
    includes: [],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
];

const BoatCard = ({ boat, index }: { boat: typeof fleet[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const isJetSki = boat.type === "Jet Ski";

  const handleBooking = () => {
    const el = document.getElementById("reservar");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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

          {boat.includes.length > 0 && (
            <div className="mb-4">
              <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">{t("fleet.includes")}</p>
              <div className="flex flex-wrap gap-1">
                {boat.includes.slice(0, 4).map((item) => (
                  <span key={item} className="inline-block px-2 py-0.5 bg-muted rounded text-[10px] font-body text-muted-foreground">
                    {item}
                  </span>
                ))}
                {boat.includes.length > 4 && (
                  <span className="inline-block px-2 py-0.5 bg-muted rounded text-[10px] font-body text-muted-foreground">
                    +{boat.includes.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-sm">
              <span className="text-muted-foreground">{t("fleet.from")} </span>
              <span className="text-accent font-bold text-lg">€{boat.priceFrom}</span>
              <span className="text-muted-foreground text-xs"> /{boat.pricePer}</span>
            </p>
          </div>

          <button
            onClick={handleBooking}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-body text-[10px] uppercase tracking-[0.12em] font-semibold rounded-md hover:bg-primary/90 transition-colors"
          >
            <Anchor className="w-3.5 h-3.5" />
            {t("fleet.checkAvailability")}
          </button>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((boat, i) => (
            <BoatCard key={boat.name} boat={boat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
