import catamaran1 from "@/assets/catamaran_1_aerial.jpg";
import catamaran2 from "@/assets/catamaran_2_marina.jpg";
import catamaran3 from "@/assets/catamaran_3_dock.jpg";
import catamaran4 from "@/assets/catamaran_4_salon.jpg";
import catamaran5 from "@/assets/catamaran_5_aperitivo.jpg";
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
import rinker from "@/assets/rinker.jpg";
import searayMain from "@/assets/searay_main.jpg";
import searay2 from "@/assets/searay_2.jpg";
import searay3 from "@/assets/searay_3.jpg";
import searay4 from "@/assets/searay_4.jpg";
import searayInterior from "@/assets/searay_interior.jpg";
import jetski1 from "@/assets/jetski1.jpg";
import jetski2 from "@/assets/jetski2.jpg";

export type Lang = "en" | "es" | "fr";
export type Localized = Record<Lang, string>;

export interface PriceOption {
  label: Localized;
  price: number;
}

export interface Boat {
  slug: string;
  name: string;
  type: Localized;
  description: Localized;
  images: string[];
  capacity: string;
  power: string;
  length: string;
  beam?: string;
  cabins?: number;
  prices: PriceOption[];
  includes: Localized[];
  ticket?: { price: number; times: string[]; duration: Localized };
  experiences: string[];
}

const l = (en: string, es: string, fr: string): Localized => ({ en, es, fr });

export const boats: Boat[] = [
  {
    slug: "catamaran-bali-4",
    name: "Catamarán Bali 4.0",
    type: l("Catamaran", "Catamarán", "Catamaran"),
    description: l(
      "An exceptionally spacious catamaran for relaxed celebrations and long days at sea.",
      "Un catamarán excepcionalmente amplio para celebraciones tranquilas y largas jornadas en el mar.",
      "Un catamaran exceptionnellement spacieux pour les célébrations et les longues journées en mer.",
    ),
    images: [catamaran1, catamaran2, catamaran3, catamaran4, catamaran5],
    capacity: "10 + crew",
    power: "2×40 CV Volvo",
    length: "12.50 m",
    beam: "7.00 m",
    cabins: 4,
    prices: [
      { label: l("2 hours", "2 horas", "2 heures"), price: 709 },
      { label: l("3 hours", "3 horas", "3 heures"), price: 945 },
      { label: l("4 hours", "4 horas", "4 heures"), price: 1087 },
      { label: l("6 hours", "6 horas", "6 heures"), price: 1654 },
      { label: l("8 hours", "8 horas", "8 heures"), price: 2127 },
    ],
    ticket: { price: 76.5, times: ["10:00", "13:00", "16:00"], duration: l("2 hours per person", "2 horas por persona", "2 heures par personne") },
    includes: [l("Captain & crew", "Capitán y tripulación", "Capitaine et équipage"), l("Rosé, cava, beer and soft drinks", "Rosado, cava, cerveza y refrescos", "Rosé, cava, bière et boissons sans alcool"), l("Paddle surf and snorkel", "Paddle surf y snorkel", "Paddle et masque/tuba"), l("Towels and Bluetooth music", "Toallas y música Bluetooth", "Serviettes et musique Bluetooth"), l("Fuel", "Combustible", "Carburant")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "azimut-39-fly",
    name: "Azimut 39 Fly",
    type: l("Motor yacht", "Yate a motor", "Yacht à moteur"),
    description: l("Italian lines, a flybridge and effortless coastal cruising.", "Líneas italianas, flybridge y navegación costera sin esfuerzo.", "Lignes italiennes, flybridge et navigation côtière tout en douceur."),
    images: [azimut2, azimut3, azimut4, azimut5, azimut6, azimut7, azimut8, azimut9, azimutMain],
    capacity: "10",
    power: "Flybridge",
    length: "12.30 m",
    prices: [
      { label: l("1 hour", "1 hora", "1 heure"), price: 423 }, { label: l("2 hours", "2 horas", "2 heures"), price: 603 },
      { label: l("3 hours", "3 horas", "3 heures"), price: 783 }, { label: l("4 hours", "4 horas", "4 heures"), price: 963 },
      { label: l("6 hours", "6 horas", "6 heures"), price: 1413 }, { label: l("8 hours", "8 horas", "8 heures"), price: 1683 },
    ],
    includes: [l("Captain", "Capitán", "Capitaine"), l("Champagne and white wine", "Champán y vino blanco", "Champagne et vin blanc"), l("Selected drinks", "Bebidas seleccionadas", "Boissons sélectionnées"), l("Paddle surf", "Paddle surf", "Paddle"), l("Insurance", "Seguro", "Assurance")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "rinker-296-captiva",
    name: "Rinker 296 Captiva",
    type: l("Sport cruiser", "Lancha deportiva", "Bateau sportif"),
    description: l("An agile open cruiser for an easy escape along the Marbella coast.", "Una lancha ágil para una escapada sencilla por la costa de Marbella.", "Un bateau agile pour une escapade facile le long de la côte de Marbella."),
    images: [rinkerMain, rinker], capacity: "10", power: "Sport cruiser", length: "9.4 m",
    prices: [1,2,3,4,5,6,7,8].map((hours, index) => ({ label: l(`${hours} ${hours === 1 ? "hour" : "hours"}`, `${hours} ${hours === 1 ? "hora" : "horas"}`, `${hours} ${hours === 1 ? "heure" : "heures"}`), price: [225,360,540,720,855,990,1125,1260][index] })),
    includes: [l("Captain", "Capitán", "Capitaine"), l("Welcome drink", "Bebida de bienvenida", "Boisson de bienvenue"), l("Stereo", "Equipo de música", "Système audio"), l("Fuel", "Combustible", "Carburant"), l("VAT", "IVA", "TVA")],
    experiences: ["sunset", "celebrations", "family"],
  },
  {
    slug: "sea-ray-sundancer-540",
    name: "Sea Ray Sundancer 540",
    type: l("Luxury yacht", "Yate de lujo", "Yacht de luxe"),
    description: l("Generous decks and refined interiors for milestone occasions on the Mediterranean.", "Cubiertas generosas e interiores refinados para grandes ocasiones en el Mediterráneo.", "De vastes ponts et des intérieurs raffinés pour les grandes occasions en Méditerranée."),
    images: [searay3, searayMain, searay2, searay4, searayInterior], capacity: "12 + crew", power: "Caterpillar 800 HP", length: "16.7 m", beam: "4.8 m", cabins: 2,
    prices: [{ label: l("2 hours", "2 horas", "2 heures"), price: 900 }, { label: l("4 hours", "4 horas", "4 heures"), price: 1620 }, { label: l("6 hours", "6 horas", "6 heures"), price: 2070 }, { label: l("8 hours", "8 horas", "8 heures"), price: 2520 }],
    includes: [l("Captain & crew", "Capitán y tripulación", "Capitaine et équipage"), l("Fruit board and snacks", "Tabla de fruta y aperitivos", "Fruits et amuse-bouches"), l("Cava, wine, beer and soft drinks", "Cava, vino, cerveza y refrescos", "Cava, vin, bière et boissons sans alcool"), l("SUP and snorkel", "SUP y snorkel", "SUP et masque/tuba"), l("Towels and sound system", "Toallas y equipo de sonido", "Serviettes et système audio")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "jet-ski",
    name: "Jet Ski",
    type: l("Jet Ski", "Jet Ski", "Jet Ski"),
    description: l("A fast, guided burst of adrenaline just outside Puerto Banús.", "Una dosis rápida y guiada de adrenalina frente a Puerto Banús.", "Une parenthèse rapide et guidée d'adrénaline au large de Puerto Banús."),
    images: [jetski1, jetski2], capacity: "1–2", power: "130 CV", length: "3.4 m",
    prices: [{ label: l("30 minutes", "30 minutos", "30 minutes"), price: 108 }, { label: l("1 hour", "1 hora", "1 heure"), price: 170 }],
    includes: [l("Safety equipment", "Equipo de seguridad", "Équipement de sécurité"), l("Briefing", "Briefing", "Briefing")],
    experiences: ["jetski"],
  },
];

export const WHATSAPP_NUMBER = "34600746712";
export const SITE_URL = "https://sea-dreams-maker.lovable.app";
export const getBoat = (slug?: string) => boats.find((boat) => boat.slug === slug);
export const money = (value: number, lang: Lang) => new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
