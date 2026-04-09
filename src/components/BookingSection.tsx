import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { CalendarIcon, Ship, Clock, MessageCircle, Tag, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import catamaranExterior from "@/assets/catamaran_exterior.jpg";
import azimutMain from "@/assets/azimut_main.jpg";
import rinkerMain from "@/assets/rinker_main.jpg";
import jetski1 from "@/assets/jetski1.jpg";

interface PriceOption {
  hours: number;
  label: string;
  labelEn: string;
  price: number;
}

interface Vessel {
  id: string;
  name: string;
  type: string;
  image: string;
  whatsapp: string;
  minHours: number;
  pricing: PriceOption[];
}

const vessels: Vessel[] = [
  {
    id: "catamaran-bali",
    name: "Catamarán Bali 4.0",
    type: "Catamarán",
    image: catamaranExterior,
    whatsapp: "34667266164",
    minHours: 2,
    pricing: [
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 750 },
      { hours: 3, label: "3 horas", labelEn: "3 hours", price: 1000 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 1150 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 1750 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 2250 },
    ],
  },
  {
    id: "azimut-39",
    name: "Azimut 39 Fly",
    type: "Yate",
    image: azimutMain,
    whatsapp: "34667266164",
    minHours: 1,
    pricing: [
      { hours: 1, label: "1 hora", labelEn: "1 hour", price: 400 },
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 600 },
      { hours: 3, label: "3 horas", labelEn: "3 hours", price: 800 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 1000 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 1500 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 1800 },
    ],
  },
  {
    id: "rinker-296",
    name: "Rinker 296 Captiva",
    type: "Lancha",
    image: rinkerMain,
    whatsapp: "34667266164",
    minHours: 1,
    pricing: [
      { hours: 1, label: "1 hora", labelEn: "1 hour", price: 250 },
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 400 },
      { hours: 3, label: "3 horas", labelEn: "3 hours", price: 600 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 800 },
      { hours: 5, label: "5 horas", labelEn: "5 hours", price: 950 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 1100 },
      { hours: 7, label: "7 horas", labelEn: "7 hours", price: 1250 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 1400 },
    ],
  },
  {
    id: "jetski",
    name: "Jet Ski",
    type: "Jet Ski",
    image: jetski1,
    whatsapp: "34667266164",
    minHours: 1,
    pricing: [
      { hours: 1, label: "1 hora", labelEn: "1 hour", price: 120 },
    ],
  },
];

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [selectedPricing, setSelectedPricing] = useState<string>();
  const [selectedVessel, setSelectedVessel] = useState<string>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const sectionRef = useRef(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { lang, t } = useLanguage();

  const dateFnsLocale = lang === "es" ? es : enUS;

  const vessel = vessels.find((v) => v.id === selectedVessel);
  const selectedPriceOption = vessel?.pricing.find((p) => `${p.hours}h` === selectedPricing);

  useEffect(() => {
    if (selectedVessel && !date) {
      setSelectedPricing(undefined);
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setCalendarOpen(true), 400);
      }, 200);
    }
  }, [selectedVessel]);

  useEffect(() => {
    if (date && !selectedPricing && vessel) {
      setCalendarOpen(false);
      setTimeout(() => {
        step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [date]);

  const whatsappUrl = useMemo(() => {
    const vesselName = vessel?.name ?? "[...]";
    const dateStr = date
      ? format(date, lang === "es" ? "d 'de' MMMM yyyy" : "MMMM d, yyyy", { locale: dateFnsLocale })
      : "[...]";
    const timeStr = selectedPriceOption
      ? `${lang === "es" ? selectedPriceOption.label : selectedPriceOption.labelEn} (€${selectedPriceOption.price})`
      : "[...]";
    const text = t("booking.waMsg")
      .replace("{vessel}", vesselName)
      .replace("{date}", dateStr)
      .replace("{time}", timeStr);
    const number = vessel?.whatsapp ?? "34667266164";
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [vessel, date, selectedPriceOption, lang, t, dateFnsLocale]);

  const isComplete = date && selectedPricing && selectedVessel;

  return (
    <section id="reservar" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-4">
            {t("booking.title")}
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-4">
            {t("booking.desc")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/15 border border-accent/30">
              <Tag className="w-4 h-4 text-accent" />
              <span className="font-body text-sm font-bold text-accent">{t("booking.discount")}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-body text-xs text-foreground">{t("booking.location")}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
            {[
              { icon: "🔒", text: t("booking.badge1") },
              { icon: "💰", text: t("booking.badge2") },
              { icon: "✅", text: t("booking.badge3") },
            ].map((item) => (
              <span key={item.text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 font-body text-xs text-foreground">
                <span>{item.icon}</span>{item.text}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Step 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-body text-sm font-bold">1</span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step1")}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {vessels.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVessel(v.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-lg transition-all duration-300 focus:outline-none",
                    selectedVessel === v.id
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-muted scale-[1.02]"
                      : "hover:ring-1 hover:ring-border"
                  )}
                >
                  <img src={v.image} alt={v.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                    <p className="font-body text-xs font-semibold text-primary-foreground leading-tight">{v.name}</p>
                    <p className="font-body text-[10px] text-primary-foreground/70">{v.type}</p>
                  </div>
                  {selectedVessel === v.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Ship className="w-3 h-3 text-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div ref={step2Ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-body text-sm font-bold">2</span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step2")}</h3>
            </div>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-3 w-full sm:w-auto px-6 py-4 rounded-lg border border-border bg-background font-body text-sm transition-colors hover:border-accent",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-5 h-5 text-accent" />
                  {date
                    ? format(date, lang === "es" ? "EEEE, d 'de' MMMM yyyy" : "EEEE, MMMM d, yyyy", { locale: dateFnsLocale })
                    : t("booking.datePlaceholder")}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); }}
                  locale={dateFnsLocale}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Step 3 - Dynamic pricing */}
          <motion.div ref={step3Ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-body text-sm font-bold">3</span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step3")}</h3>
            </div>
            {!vessel ? (
              <p className="font-body text-sm text-muted-foreground">{t("booking.selectVesselFirst")}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {vessel.pricing.map((option) => {
                  const key = `${option.hours}h`;
                  const label = lang === "es" ? option.label : option.labelEn;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPricing(key)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 rounded-lg border transition-all duration-300 text-left",
                        selectedPricing === key
                          ? "border-accent bg-accent/10 ring-1 ring-accent"
                          : "border-border bg-background hover:border-accent/50"
                      )}
                    >
                      <Clock className={cn("w-4 h-4 shrink-0", selectedPricing === key ? "text-accent" : "text-muted-foreground")} />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-foreground">{label}</p>
                        <p className="font-body text-lg font-bold text-accent">€{option.price}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-center pt-4">
            {isComplete ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-body text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4" />
                {t("booking.cta")}
              </a>
            ) : (
              <div>
                <span className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-body text-xs uppercase tracking-[0.2em] font-semibold bg-accent/40 text-accent-foreground/60 cursor-not-allowed">
                  <MessageCircle className="w-4 h-4" />
                  {t("booking.cta")}
                </span>
                <p className="font-body text-xs text-muted-foreground mt-3">
                  {t("booking.incomplete")}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
