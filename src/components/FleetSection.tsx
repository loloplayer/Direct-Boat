import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Users, Gauge, Ruler, Anchor, Tag, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import catamaranExterior from "@/assets/catamaran_exterior.jpg";
import catamaranInterior from "@/assets/catamaran_interior.jpg";
import catamaranImg from "@/assets/catamaran_bali.jpg";

import azimutMain from "@/assets/azimut_main.jpg";
import azimut2 from "@/assets/azimut_2.jpg";
import azimut3 from "@/assets/azimut_3.jpg";
import azimut4 from "@/assets/azimut_4.jpg";
import azimut5 from "@/assets/azimut_5.jpg";
import azimut6 from "@/assets/azimut_6.jpg";
import azimut7 from "@/assets/azimut_7.jpg";
import azimut8 from "@/assets/azimut_8.jpg";
import azimut9 from "@/assets/azimut_9.jpg";

import rinkerMain from "@/assets/rinker_main.jpg";
import rinkerImg from "@/assets/rinker.jpg";

import jetski1 from "@/assets/jetski1.jpg";

const fleet = [
  {
    name: "Catamarán Bali 4.0",
    type: "Catamarán",
    images: [catamaranExterior, catamaranImg, catamaranInterior],
    passengers: "10 + crew",
    power: "2×40 CV Volvo",
    length: "12.50 m",
    beam: "7.00 m",
    cabins: 4,
    priceFrom: "338",
    pricePer: "h",
    includes: ["Captain & crew", "Rosé wine, Cava ×2", "Beer, soft drinks, water", "Paddle surf, snorkel", "Towels, Bluetooth music", "Gasoline"],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
  {
    name: "Azimut 39 Fly",
    type: "Yate",
    images: [azimutMain, azimut2, azimut3, azimut4, azimut5, azimut6, azimut7, azimut8, azimut9],
    passengers: "10",
    power: "Flybridge",
    length: "12.30 m",
    priceFrom: "360",
    pricePer: "h",
    includes: ["Captain", "Champagne ×2", "White wine ×2", "Drinks (limited)", "Paddle surf", "Insurance"],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
  {
    name: "Rinker 296 Captiva",
    type: "Lancha",
    images: [rinkerMain, rinkerImg],
    passengers: "10",
    power: "Sport cruiser",
    length: "9.4 m",
    priceFrom: "225",
    pricePer: "h",
    includes: ["Captain", "Welcome drink", "Stereo", "Gasoline", "V.A.T"],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
  {
    name: "Jet Ski",
    type: "Jet Ski",
    images: [jetski1],
    passengers: "1–2",
    power: "130 CV",
    length: "3.4 m",
    priceFrom: "108",
    pricePer: "h",
    includes: [],
    whatsapp: "34667266164",
    email: "marbellaoceanboats@gmail.com",
  },
];

const ImageCarousel = ({ images, name }: { images: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);

  if (images.length <= 1) {
    return (
      <img src={images[0]} alt={name} className="w-full aspect-[4/3] object-cover object-center" loading="lazy" />
    );
  }

  return (
    <div className="relative">
      <img
        src={images[current]}
        alt={`${name} ${current + 1}`}
        className="w-full aspect-[4/3] object-cover object-center transition-opacity duration-300"
        loading="lazy"
      />
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p - 1 + images.length) % images.length); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p + 1) % images.length); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-background/60"}`}
          />
        ))}
      </div>
    </div>
  );
};

const BoatCard = ({ boat, index }: { boat: typeof fleet[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const isJetSki = boat.type === "Jet Ski";

  const handleBooking = () => {
    const el = document.getElementById("elegir-embarcacion");
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
          <ImageCarousel images={boat.images} name={boat.name} />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 mb-4">
            <Tag className="w-4 h-4 text-accent" />
            <span className="font-body text-sm font-bold text-accent">{t("fleet.discountBanner")}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6 ml-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-body text-sm text-foreground">{t("fleet.location")}</span>
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
