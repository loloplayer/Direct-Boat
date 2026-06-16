import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { CalendarIcon, Ship, Clock, MessageCircle, Tag, MapPin, Users, Anchor, ChevronRight, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";
import catamaranExterior from "@/assets/catamaran_1_aerial.jpg";
import azimutMain from "@/assets/azimut_main.jpg";
import rinkerMain from "@/assets/rinker_main.jpg";
import searay3 from "@/assets/searay_3.jpg";
import jetski1 from "@/assets/jetski1.jpg";

interface PriceOption {
  hours: number;
  label: string;
  labelEn: string;
  price: number;
  originalPrice: number;
}

interface TicketOption {
  price: number;
  originalPrice: number;
  durationHours: number;
  label: string;
  labelEn: string;
  departureTimes: string[];
}

interface Vessel {
  id: string;
  name: string;
  type: string;
  image: string;
  whatsapp: string;
  minHours: number;
  maxGuests: number;
  pricing: PriceOption[];
  /** Optional ticket-per-person mode (e.g. shared catamaran outings) */
  ticket?: TicketOption;
}

const vessels: Vessel[] = [
  {
    id: "catamaran-bali",
    name: "Catamarán Bali 4.0",
    type: "Catamarán",
    image: catamaranExterior,
    whatsapp: "34664575058",
    minHours: 2,
    maxGuests: 10,
    pricing: [
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 709, originalPrice: 788 },
      { hours: 3, label: "3 horas", labelEn: "3 hours", price: 945, originalPrice: 1050 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 1087, originalPrice: 1208 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 1654, originalPrice: 1838 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 2127, originalPrice: 2363 },
    ],
    ticket: {
      price: 76.5,
      originalPrice: 85,
      durationHours: 2,
      label: "Ticket 2h por persona",
      labelEn: "2h ticket per person",
      departureTimes: ["10:00", "13:00", "16:00"],
    },
  },
  {
    id: "azimut-39",
    name: "Azimut 39 Fly",
    type: "Yate",
    image: azimutMain,
    whatsapp: "34664575058",
    minHours: 1,
    maxGuests: 10,
    pricing: [
      { hours: 1, label: "1 hora", labelEn: "1 hour", price: 423, originalPrice: 470 },
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 603, originalPrice: 670 },
      { hours: 3, label: "3 horas", labelEn: "3 hours", price: 783, originalPrice: 870 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 963, originalPrice: 1070 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 1413, originalPrice: 1570 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 1683, originalPrice: 1870 },
    ],
  },
  {
    id: "rinker-296",
    name: "Rinker 296 Captiva",
    type: "Lancha",
    image: rinkerMain,
    whatsapp: "34664575058",
    minHours: 1,
    maxGuests: 10,
    pricing: [
      { hours: 1, label: "1 hora", labelEn: "1 hour", price: 225, originalPrice: 250 },
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 360, originalPrice: 400 },
      { hours: 3, label: "3 horas", labelEn: "3 hours", price: 540, originalPrice: 600 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 720, originalPrice: 800 },
      { hours: 5, label: "5 horas", labelEn: "5 hours", price: 855, originalPrice: 950 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 990, originalPrice: 1100 },
      { hours: 7, label: "7 horas", labelEn: "7 hours", price: 1125, originalPrice: 1250 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 1260, originalPrice: 1400 },
    ],
  },
  {
    id: "searay-540",
    name: "Sea Ray Sundancer 540",
    type: "Yate",
    image: searay3,
    whatsapp: "34664575058",
    minHours: 2,
    maxGuests: 12,
    pricing: [
      { hours: 2, label: "2 horas", labelEn: "2 hours", price: 900, originalPrice: 1000 },
      { hours: 4, label: "4 horas", labelEn: "4 hours", price: 1620, originalPrice: 1800 },
      { hours: 6, label: "6 horas", labelEn: "6 hours", price: 2070, originalPrice: 2300 },
      { hours: 8, label: "8 horas", labelEn: "8 hours", price: 2520, originalPrice: 2800 },
    ],
  },
  {
    id: "jetski",
    name: "Jet Ski",
    type: "Jet Ski",
    image: jetski1,
    whatsapp: "34664575058",
    minHours: 1,
    maxGuests: 2,
    pricing: [
      { hours: 0.5, label: "30 minutos", labelEn: "30 minutes", price: 108, originalPrice: 120 },
      { hours: 1, label: "1 hora", labelEn: "1 hour", price: 170, originalPrice: 189 },
    ],
  },
];

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [selectedPricing, setSelectedPricing] = useState<string>();
  const [selectedVessel, setSelectedVessel] = useState<string>();
  const [guests, setGuests] = useState<number>(2);
  const [departureTime, setDepartureTime] = useState<string>();
  const [bookingMode, setBookingMode] = useState<"private" | "ticket">("private");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const sectionRef = useRef(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { lang, t } = useLanguage();

  const dateFnsLocale = lang === "es" ? es : enUS;

  const vessel = vessels.find((v) => v.id === selectedVessel);
  const hasTicketOption = !!vessel?.ticket;
  const isTicket = hasTicketOption && bookingMode === "ticket";
  const selectedPriceOption = !isTicket ? vessel?.pricing.find((p) => `${p.hours}h` === selectedPricing) : undefined;
  const ticketPrice = isTicket && vessel?.ticket ? vessel.ticket.price : 0;
  const ticketOriginal = isTicket && vessel?.ticket ? vessel.ticket.originalPrice : 0;

  const stepPricingDone = isTicket
    ? !!departureTime
    : !!selectedPricing;

  const completedSteps = [
    !!selectedVessel,
    !!date,
    !!guests,
    stepPricingDone,
  ];

  useEffect(() => {
    if (selectedVessel && !date) {
      setSelectedPricing(undefined);
      setDepartureTime(undefined);
      setBookingMode("private");
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setCalendarOpen(true), 400);
      }, 200);
    }
  }, [selectedVessel]);

  // Reset step 4 selections when switching mode
  useEffect(() => {
    setSelectedPricing(undefined);
    setDepartureTime(undefined);
  }, [bookingMode]);

  useEffect(() => {
    if (date && vessel) {
      setCalendarOpen(false);
      setTimeout(() => {
        step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [date]);

  useEffect(() => {
    if (guests && date && vessel && !stepPricingDone) {
      setTimeout(() => {
        step4Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [guests]);

  useEffect(() => {
    if (stepPricingDone && date && vessel && guests) {
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250);
    }
  }, [stepPricingDone]);

  const totalPrice = isTicket
    ? ticketPrice * guests
    : (selectedPriceOption?.price ?? 0);
  const totalOriginalPrice = isTicket
    ? ticketOriginal * guests
    : (selectedPriceOption?.originalPrice ?? 0);

  const whatsappUrl = useMemo(() => {
    const number = vessel?.whatsapp ?? "34664575058";
    if (!vessel || !date || !stepPricingDone) {
      return getWhatsAppUrl(number, lang);
    }

    const dateStr = format(date, "PPP", { locale: dateFnsLocale });
    const durationLabel = isTicket
      ? (lang === "en" ? vessel.ticket!.labelEn : vessel.ticket!.label)
      : (lang === "en" ? selectedPriceOption!.labelEn : selectedPriceOption!.label);

    const L = {
      es: {
        intro: "¡Hola! Quiero reservar con mi 10% de descuento por reserva directa:",
        vessel: "Embarcación",
        date: "Fecha",
        guests: "Personas",
        duration: "Duración",
        departure: "Hora de salida",
        original: "Precio original",
        total: "Total con 10% dto.",
        mode: "Modalidad",
        modePrivate: "Charter privado",
        modeTicket: "Ticket compartido (por persona)",
        confirm: "¿Podrían confirmarme disponibilidad? ¡Gracias!",
      },
      en: {
        intro: "Hi! I'd like to book with my 10% direct booking discount:",
        vessel: "Vessel",
        date: "Date",
        guests: "Guests",
        duration: "Duration",
        departure: "Departure time",
        original: "Original price",
        total: "Total with 10% off",
        mode: "Mode",
        modePrivate: "Private charter",
        modeTicket: "Shared ticket (per person)",
        confirm: "Could you confirm availability? Thank you!",
      },
      fr: {
        intro: "Bonjour! Je souhaite réserver avec ma réduction de 10% en réservation directe:",
        vessel: "Bateau",
        date: "Date",
        guests: "Personnes",
        duration: "Durée",
        departure: "Heure de départ",
        original: "Prix d'origine",
        total: "Total avec 10% de remise",
        mode: "Modalité",
        modePrivate: "Charter privé",
        modeTicket: "Ticket partagé (par personne)",
        confirm: "Pourriez-vous me confirmer la disponibilité? Merci!",
      },
    } as const;
    const tr = L[(lang as "es" | "en" | "fr")] ?? L.en;

    const lines = [
      tr.intro,
      "",
      `🛥️ ${tr.vessel}: ${vessel.name}`,
      `📅 ${tr.date}: ${dateStr}`,
      `👥 ${tr.guests}: ${guests}`,
      `⏱️ ${tr.duration}: ${durationLabel}`,
      `🏷️ ${tr.mode}: ${isTicket ? tr.modeTicket : tr.modePrivate}`,
    ];
    if (isTicket && departureTime) {
      lines.push(`🕒 ${tr.departure}: ${departureTime}`);
    }
    lines.push(
      "",
      `${tr.original}: €${totalOriginalPrice.toLocaleString(lang === "en" ? "en-US" : "es-ES")}`,
      `✅ ${tr.total}: €${totalPrice.toLocaleString(lang === "en" ? "en-US" : "es-ES")}`,
      "",
      tr.confirm,
    );

    return getWhatsAppUrl(number, lang, lines.join("\n"));
  }, [vessel, lang, date, guests, isTicket, selectedPriceOption, departureTime, stepPricingDone, totalPrice, totalOriginalPrice, dateFnsLocale]);

  const isComplete = !!(date && selectedVessel && guests && stepPricingDone);

  const steps = [
    { num: 1, label: t("booking.step1"), icon: Anchor },
    { num: 2, label: t("booking.step2"), icon: CalendarIcon },
    { num: 3, label: t("booking.step3Guests"), icon: Users },
    { num: 4, label: t("booking.step3"), icon: Clock },
  ];

  return (
    <section id="reservar" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground mb-4">
            {t("booking.title")}
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-6">
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
        </motion.div>

        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-accent transition-all duration-500"
              style={{ width: `${(completedSteps.filter(Boolean).length / 4) * 100}%` }}
            />
            {steps.map((step, i) => {
              const done = completedSteps[i];
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      done
                        ? "bg-accent border-accent text-accent-foreground"
                        : "bg-background border-border text-muted-foreground"
                    )}
                  >
                    {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={cn(
                    "font-body text-[10px] mt-2 text-center max-w-[70px] leading-tight",
                    done ? "text-accent font-semibold" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1 - Vessel */}
          <motion.div
            id="elegir-embarcacion"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full font-body text-sm font-bold transition-colors",
                selectedVessel ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              )}>
                {selectedVessel ? <Check className="w-4 h-4" /> : "1"}
              </span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step1")}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {vessels.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { setSelectedVessel(v.id); setGuests(Math.min(guests, v.maxGuests)); }}
                  className={cn(
                    "group relative overflow-hidden rounded-xl transition-all duration-300 focus:outline-none",
                    selectedVessel === v.id
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-[1.02] shadow-md"
                      : "hover:ring-1 hover:ring-border hover:shadow-sm"
                  )}
                >
                  <img src={v.image} alt={v.name} className="w-full aspect-[4/3] object-cover object-center" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                    <p className="font-body text-xs font-semibold text-primary-foreground leading-tight">{v.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="w-3 h-3 text-primary-foreground/70" />
                      <p className="font-body text-[10px] text-primary-foreground/70">
                        Max {v.maxGuests} {lang === "es" ? "personas" : "guests"}
                      </p>
                    </div>
                  </div>
                  {selectedVessel === v.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 text-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 2 - Date */}
          <motion.div
            ref={step2Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border transition-opacity",
              !selectedVessel && "opacity-50 pointer-events-none"
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full font-body text-sm font-bold transition-colors",
                date ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              )}>
                {date ? <Check className="w-4 h-4" /> : "2"}
              </span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step2")}</h3>
            </div>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-3 w-full px-5 py-4 rounded-xl border-2 bg-background font-body text-sm transition-all",
                    date ? "border-accent/50 bg-accent/5" : "border-border hover:border-accent/30",
                    !date && "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    date ? "bg-accent/15" : "bg-muted"
                  )}>
                    <CalendarIcon className={cn("w-5 h-5", date ? "text-accent" : "text-muted-foreground")} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                      {t("booking.step2")}
                    </p>
                    <p className={cn("font-medium", date ? "text-foreground" : "text-muted-foreground")}>
                      {date
                        ? format(date, lang === "es" ? "EEEE, d 'de' MMMM yyyy" : "EEEE, MMMM d, yyyy", { locale: dateFnsLocale })
                        : t("booking.datePlaceholder")}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => setDate(d)}
                  locale={dateFnsLocale}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Step 3 - Guests */}
          <motion.div
            ref={step3Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={cn(
              "bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border transition-opacity",
              (!selectedVessel || !date) && "opacity-50 pointer-events-none"
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full font-body text-sm font-bold transition-colors",
                guests ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              )}>
                {guests ? <Check className="w-4 h-4" /> : "3"}
              </span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step3Guests")}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: vessel?.maxGuests ?? 12 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setGuests(num)}
                  className={cn(
                    "w-12 h-12 rounded-xl border-2 font-body text-sm font-semibold transition-all duration-200",
                    guests === num
                      ? "border-accent bg-accent text-accent-foreground shadow-md scale-110"
                      : "border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent/5"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
            {vessel && (
              <p className="font-body text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {lang === "es" ? `Capacidad máxima: ${vessel.maxGuests} personas` : `Max capacity: ${vessel.maxGuests} guests`}
              </p>
            )}
          </motion.div>

          {/* Step 4 - Duration & Price */}
          <motion.div
            ref={step4Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border transition-opacity",
              (!selectedVessel || !date || !guests) && "opacity-50 pointer-events-none"
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full font-body text-sm font-bold transition-colors",
                stepPricingDone ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              )}>
                {stepPricingDone ? <Check className="w-4 h-4" /> : "4"}
              </span>
              <h3 className="font-display text-xl text-foreground">{t("booking.step3")}</h3>
            </div>
            {!vessel ? (
              <p className="font-body text-sm text-muted-foreground">{t("booking.selectVesselFirst")}</p>
            ) : (
              <>
                {hasTicketOption && (
                  <div className="mb-6">
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                      {lang === "es" ? "Modo de reserva" : "Booking mode"}
                    </p>
                    <div className="inline-flex p-1 bg-muted rounded-xl">
                      <button
                        onClick={() => setBookingMode("private")}
                        className={cn(
                          "px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all",
                          bookingMode === "private"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {lang === "es" ? "Privado por horas" : "Private by hours"}
                      </button>
                      <button
                        onClick={() => setBookingMode("ticket")}
                        className={cn(
                          "px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all",
                          bookingMode === "ticket"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {lang === "es" ? "Ticket por persona" : "Ticket per person"}
                      </button>
                    </div>
                  </div>
                )}

                {!isTicket ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {vessel.pricing.map((option) => {
                      const key = `${option.hours}h`;
                      const label = lang === "es" ? option.label : option.labelEn;
                      const selected = selectedPricing === key;
                      const fmt = (n: number) => Number.isInteger(n) ? `€${n}` : `€${n.toFixed(2)}`;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedPricing(key)}
                          className={cn(
                            "relative flex flex-col items-center px-4 py-5 rounded-xl border-2 transition-all duration-300 text-center",
                            selected
                              ? "border-accent bg-accent/10 shadow-md scale-[1.02]"
                              : "border-border bg-background hover:border-accent/50 hover:bg-accent/5"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mb-3",
                            selected ? "bg-accent/20" : "bg-muted"
                          )}>
                            <Clock className={cn("w-5 h-5", selected ? "text-accent" : "text-muted-foreground")} />
                          </div>
                          <p className="font-body text-sm font-semibold text-foreground">{label}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-body text-sm text-muted-foreground/60 line-through">{fmt(option.originalPrice)}</span>
                            <span className={cn("font-body text-xl font-bold", selected ? "text-accent" : "text-foreground")}>{fmt(option.price)}</span>
                          </div>
                          {selected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                              <Check className="w-3 h-3 text-accent-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : vessel.ticket && (
                  <div>
                    <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-5 flex items-baseline gap-2 flex-wrap">
                      <span className="font-body text-sm text-foreground">
                        {lang === "es" ? vessel.ticket.label : vessel.ticket.labelEn}:
                      </span>
                      <span className="font-body text-sm text-muted-foreground/60 line-through">€{vessel.ticket.originalPrice}</span>
                      <span className="font-display text-xl font-bold text-accent">€{vessel.ticket.price.toFixed(2).replace(/\.00$/, "")}</span>
                      <span className="font-body text-xs text-muted-foreground">/{lang === "es" ? "persona" : "person"}</span>
                    </div>
                    <p className="font-body text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      {lang === "es" ? "Elige horario de salida" : "Choose departure time"}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {vessel.ticket.departureTimes.map((time) => {
                        const sel = departureTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => setDepartureTime(time)}
                            className={cn(
                              "px-5 py-3 rounded-xl border-2 font-body text-sm font-semibold transition-all duration-200",
                              sel
                                ? "border-accent bg-accent text-accent-foreground shadow-md scale-105"
                                : "border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent/5"
                            )}
                          >
                            {time} h
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Summary & CTA */}
          <motion.div
            ref={summaryRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isComplete && vessel ? (
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-accent/30">
                <h4 className="font-display text-lg text-foreground mb-4">
                  {lang === "es" ? "Resumen de tu reserva" : "Booking summary"}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <Anchor className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{t("booking.step1")}</p>
                    <p className="font-body text-sm font-semibold text-foreground mt-0.5">{vessel.name}</p>
                    {hasTicketOption && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[9px] font-semibold uppercase tracking-wider">
                        {isTicket ? (lang === "es" ? "Ticket" : "Ticket") : (lang === "es" ? "Privado" : "Private")}
                      </span>
                    )}
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <CalendarIcon className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{t("booking.step2")}</p>
                    <p className="font-body text-sm font-semibold text-foreground mt-0.5">
                      {format(date!, lang === "es" ? "d MMM yyyy" : "MMM d, yyyy", { locale: dateFnsLocale })}
                    </p>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <Users className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">
                      {isTicket ? (lang === "es" ? "Tickets" : "Tickets") : t("booking.step3Guests")}
                    </p>
                    <p className="font-body text-sm font-semibold text-foreground mt-0.5">{guests}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{isTicket ? (lang === "es" ? "Salida" : "Departure") : t("booking.step3")}</p>
                    <p className="font-body text-sm font-semibold text-foreground mt-0.5">
                      {isTicket && departureTime
                        ? `${departureTime} h`
                        : selectedPriceOption
                          ? (lang === "es" ? selectedPriceOption.label : selectedPriceOption.labelEn)
                          : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="font-body text-sm text-muted-foreground">
                      {lang === "es" ? "Total estimado" : "Estimated total"}
                      {isTicket && (
                        <span className="ml-1 text-xs">
                          ({guests} × €{Number.isInteger(ticketPrice) ? ticketPrice : ticketPrice.toFixed(2)})
                        </span>
                      )}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-body text-lg text-muted-foreground/60 line-through">€{Number.isInteger(totalOriginalPrice) ? totalOriginalPrice : totalOriginalPrice.toFixed(2)}</span>
                      <span className="font-display text-3xl font-bold text-accent">€{Number.isInteger(totalPrice) ? totalPrice : totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="font-body text-xs text-accent font-medium mt-0.5">-10% {lang === "es" ? "dto. web" : "web discount"}</p>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("booking.cta")}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <span className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-body text-xs uppercase tracking-[0.2em] font-semibold bg-accent/30 text-accent-foreground/50 cursor-not-allowed">
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
