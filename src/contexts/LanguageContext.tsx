import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en" | "fr";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  es: {
    // Navbar
    "nav.fleet": "Flota",
    "nav.experience": "Experiencia",
    "nav.gallery": "Galería",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",
    "nav.book": "Reservar",
    "nav.bookNow": "Reservar ahora",

    // Hero
    "hero.title1": "Alquiler de Barcos",
    "hero.title2": "Directo con Propietarios",
    "hero.desc": "Conectamos a navegantes con propietarios de barcos y Jet Ski en todo el mundo. Sin intermediarios, sin comisiones — tú eliges, tú negocias, tú disfrutas.",
    "hero.subtitle": "Alquiler por horas · media jornada · día completo",
    "hero.cta": "Consultar disponibilidad",
    "hero.fleet": "Ver embarcaciones",
    "hero.discount": "🔥 10% de descuento reservando por esta web",
    "hero.location": "📍 Actualmente en Puerto Banús, Marbella — Próximamente en más destinos",

    // Fleet
    "fleet.title": "Nuestra Flota",
    "fleet.desc": "Barcos y Jet Ski premium en Puerto Banús, Marbella.",
    "fleet.from": "Desde",
    "fleet.perHour": "/hora",
    "fleet.jetskiNote": "Alquiler de 1 o 2 unidades",
    "fleet.location": "📍 Puerto Banús, Marbella — Pantalán 5",
    "fleet.discountBanner": "10% de descuento reservando por esta web",

    // Booking
    "booking.title": "Reserva Tu Experiencia",
    "booking.desc": "Elige tu embarcación, fecha y horario favoritos. Te confirmaremos la disponibilidad al instante por WhatsApp.",
    "booking.badge1": "Contacto directo con el propietario",
    "booking.badge2": "Sin comisiones ni intermediarios",
    "booking.badge3": "Pagos seguros directo al dueño",
    "booking.discount": "🔥 10% dto. exclusivo reservando por esta web",
    "booking.step1": "Elige embarcación",
    "booking.step2": "Selecciona fecha",
    "booking.step3": "Elige duración y precio",
    "booking.step3Guests": "Número de personas",
    "booking.datePlaceholder": "Selecciona una fecha",
    "booking.selectVesselFirst": "Selecciona primero una embarcación para ver los horarios y precios disponibles.",
    "booking.location": "📍 Puerto Banús, Pantalán 5",
    "booking.cta": "Consultar Disponibilidad",
    "booking.incomplete": "Completa los 3 pasos para enviar tu consulta",
    "booking.waMsg": "Hola, me interesa reservar el {vessel} para el día {date}, {guests}, en el horario {time}. ¿Está disponible?",

    // Experience
    "exp.title": "¿Por qué reservar con nosotros?",
    "exp.desc": "Somos el puente directo entre tú y los propietarios de embarcaciones en Marbella. Sin agencias, sin comisiones — solo experiencias auténticas en el mar.",
    "exp.f1.label": "Trato directo con el propietario",
    "exp.f1.desc": "Habla sin intermediarios con quien realmente conoce su embarcación.",
    "exp.f2.label": "Sin comisiones ocultas",
    "exp.f2.desc": "El precio que ves es el precio que pagas. Sin sorpresas ni recargos.",
    "exp.f3.label": "Pagos seguros y directos",
    "exp.f3.desc": "Toda transacción es directamente con el dueño. Máxima confianza.",
    "exp.f4.label": "Flexible: por horas o por día",
    "exp.f4.desc": "Desde 1 hora hasta un día completo. Tú decides cuánto tiempo navegar.",

    // Gallery
    "gallery.title": "Galería",

    // Testimonials
    "testimonials.title": "Testimonios",
    "testimonials.t1": "Increíble experiencia. El barco estaba impecable y el proceso de reserva fue súper fácil.",
    "testimonials.t2": "El mejor momento de nuestro viaje a Marbella. Totalmente recomendable.",
    "testimonials.t3": "Servicio premium de principio a fin. Volveremos sin duda.",

    // CTA
    "cta.title": "¿Listo para navegar sin intermediarios?",
    "cta.desc": "Habla directamente con el propietario de la embarcación que te interesa. Sin comisiones, sin recargos — solo el mejor precio y trato personalizado.",
    "cta.subtitle": "Contacto directo · Pago seguro · Confianza total",
    "cta.button": "Hablar por WhatsApp",

    // Footer
    "footer.tagline": "Navegación directa, sin intermediarios",
    "footer.rights": "Todos los derechos reservados.",
    "footer.currentLocation": "📍 Actualmente en Marbella, Puerto Banús — Próximamente más destinos",

    // Fleet WA messages
    "fleet.waMsg": "Hola, estoy interesado en alquilar el {name}. ¿Podrían enviarme disponibilidad y detalles?",
    "fleet.inquiry": "Consulta: {name}",
    "fleet.includes": "Incluye",
    "fleet.checkAvailability": "Consultar disponibilidad",
    "fleet.privateOrTicket": "Privado o Ticket",
    "fleet.ticketLabel": "Ticket",
    "fleet.perPerson": "persona",
  },
  en: {
    // Navbar
    "nav.fleet": "Fleet",
    "nav.experience": "Experience",
    "nav.gallery": "Gallery",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.book": "Book",
    "nav.bookNow": "Book now",

    // Hero
    "hero.title1": "Boat Rental",
    "hero.title2": "Direct with Owners",
    "hero.desc": "We connect sailors with boat and Jet Ski owners worldwide. No middlemen, no commissions — you choose, you negotiate, you enjoy.",
    "hero.subtitle": "Hourly rental · Half day · Full day",
    "hero.cta": "Check availability",
    "hero.fleet": "See vessels",
    "hero.discount": "🔥 10% off when you book through this website",
    "hero.location": "📍 Currently in Puerto Banús, Marbella — More destinations coming soon",

    // Fleet
    "fleet.title": "Our Fleet",
    "fleet.desc": "Premium boats and Jet Ski in Puerto Banús, Marbella.",
    "fleet.from": "From",
    "fleet.perHour": "/hour",
    "fleet.jetskiNote": "Rental of 1 or 2 units",
    "fleet.location": "📍 Puerto Banús, Marbella — Dock 5",
    "fleet.discountBanner": "10% off when you book through this website",

    // Booking
    "booking.title": "Book Your Experience",
    "booking.desc": "Choose your vessel, date and time. We'll confirm availability instantly via WhatsApp.",
    "booking.badge1": "Direct contact with the owner",
    "booking.badge2": "No commissions or middlemen",
    "booking.badge3": "Secure payments to the owner",
    "booking.discount": "🔥 Exclusive 10% off when you book here",
    "booking.step1": "Choose vessel",
    "booking.step2": "Select date",
    "booking.step3": "Choose duration & price",
    "booking.step3Guests": "Number of guests",
    "booking.datePlaceholder": "Select a date",
    "booking.selectVesselFirst": "Select a vessel first to see available times and prices.",
    "booking.location": "📍 Puerto Banús, Dock 5",
    "booking.cta": "Check Availability",
    "booking.incomplete": "Complete all 3 steps to send your inquiry",
    "booking.waMsg": "Hi, I'm interested in booking the {vessel} on {date}, {guests}, for the {time} slot. Is it available?",

    // Experience
    "exp.title": "Why book with us?",
    "exp.desc": "We are the direct bridge between you and boat owners in Marbella. No agencies, no commissions — just authentic experiences at sea.",
    "exp.f1.label": "Direct contact with the owner",
    "exp.f1.desc": "Talk directly to the person who really knows the boat.",
    "exp.f2.label": "No hidden commissions",
    "exp.f2.desc": "The price you see is the price you pay. No surprises.",
    "exp.f3.label": "Secure direct payments",
    "exp.f3.desc": "Every transaction is directly with the owner. Total trust.",
    "exp.f4.label": "Flexible: hourly or daily",
    "exp.f4.desc": "From 1 hour to a full day. You decide how long to sail.",

    // Gallery
    "gallery.title": "Gallery",

    // Testimonials
    "testimonials.title": "Testimonials",
    "testimonials.t1": "Incredible experience. The boat was impeccable and booking was super easy.",
    "testimonials.t2": "The best moment of our trip to Marbella. Highly recommended.",
    "testimonials.t3": "Premium service from start to finish. We'll be back for sure.",

    // CTA
    "cta.title": "Ready to sail with no middlemen?",
    "cta.desc": "Talk directly with the owner of the vessel you're interested in. No commissions, no surcharges — just the best price and personalised service.",
    "cta.subtitle": "Direct contact · Secure payment · Total trust",
    "cta.button": "Chat on WhatsApp",

    // Footer
    "footer.tagline": "Direct sailing, no middlemen",
    "footer.rights": "All rights reserved.",
    "footer.currentLocation": "📍 Currently in Marbella, Puerto Banús — More destinations coming soon",

    // Fleet WA messages
    "fleet.waMsg": "Hi, I'm interested in renting the {name}. Could you send me availability and details?",
    "fleet.inquiry": "Inquiry: {name}",
    "fleet.includes": "Includes",
    "fleet.checkAvailability": "Check availability",
    "fleet.privateOrTicket": "Private or Ticket",
    "fleet.ticketLabel": "Ticket",
    "fleet.perPerson": "person",
  },
};

const defaultContext: LanguageContextType = {
  lang: "es",
  setLang: () => {},
  t: (key: string) => translations.es[key] ?? key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[lang][key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
