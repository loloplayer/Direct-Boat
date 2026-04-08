import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { CalendarIcon, Ship, Clock, MessageCircle, Tag } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import boat1 from "@/assets/boat1.jpg";
import boat2 from "@/assets/boat2.jpg";
import jetski1 from "@/assets/jetski1.jpg";

const vessels = [
  { id: "catamaran-42", name: "Marbella Catamaran 42", type: "Catamarán", image: boat1, whatsapp: "34667266164" },
  { id: "azymut-12", name: "Azymut 12m", type: "Yate", image: boat2, whatsapp: "34667266164" },
  { id: "jetski", name: "Jet Ski", type: "Jet Ski", image: jetski1, whatsapp: "34667266164" },
];

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedVessel, setSelectedVessel] = useState<string>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const sectionRef = useRef(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { lang, t } = useLanguage();

  const dateFnsLocale = lang === "es" ? es : enUS;

  const timeSlots = [
    { id: "hourly", label: t("booking.hourly"), desc: t("booking.hourlyDesc") },
    { id: "morning", label: t("booking.morning"), desc: t("booking.morningDesc") },
    { id: "afternoon", label: t("booking.afternoon"), desc: t("booking.afternoonDesc") },
    { id: "fullday", label: t("booking.fullday"), desc: t("booking.fulldayDesc") },
  ];

  const vessel = vessels.find((v) => v.id === selectedVessel);
  const time = timeSlots.find((ts) => ts.id === selectedTime);

  // Auto-advance: vessel selected → open calendar & scroll
  useEffect(() => {
    if (selectedVessel && !date) {
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setCalendarOpen(true), 400);
      }, 200);
    }
  }, [selectedVessel]);

  // Auto-advance: date selected → scroll to time
  useEffect(() => {
    if (date && !selectedTime) {
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
    const timeStr = time ? `${time.label} (${time.desc})` : "[...]";
    const text = t("booking.waMsg")
      .replace("{vessel}", vesselName)
      .replace("{date}", dateStr)
      .replace("{time}", timeStr);
    const number = vessel?.whatsapp ?? "34667266164";
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [vessel, date, time, lang, t, dateFnsLocale]);

  const isComplete = date && selectedTime && selectedVessel;

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
          {/* Discount banner */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/15 border border-accent/30 mb-6">
            <Tag className="w-4 h-4 text-accent" />
            <span className="font-body text-sm font-bold text-accent">{t("booking.discount")}</span>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

          {/* Step 3 */}
          <motion.div ref={step3Ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-body text-sm font-bold">3</span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step3")}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.id)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-5 rounded-lg border transition-all duration-300 text-left",
                    selectedTime === slot.id
                      ? "border-accent bg-accent/10 ring-1 ring-accent"
                      : "border-border bg-background hover:border-accent/50"
                  )}
                >
                  <Clock className={cn("w-5 h-5 shrink-0", selectedTime === slot.id ? "text-accent" : "text-muted-foreground")} />
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">{slot.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{slot.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-center pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-3 px-10 py-4 rounded-lg font-body text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300",
                isComplete
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl"
                  : "bg-accent/40 text-accent-foreground/60 cursor-default"
              )}
            >
              <MessageCircle className="w-4 h-4" />
              {t("booking.cta")}
            </a>
            {!isComplete && (
              <p className="font-body text-xs text-muted-foreground mt-3">
                {t("booking.incomplete")}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
