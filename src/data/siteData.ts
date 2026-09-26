import { fleetPrices, hourlyRates, type Lang, type Localized, type PriceOption } from "./fleet";

export type { Lang, Localized, PriceOption } from "./fleet";

export interface SiteImage {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

const image = (name: string, width: number, height: number, large = Math.min(width, 1200)): SiteImage => ({
  src: `/media/${name}-${large === 1080 ? 1200 : large}.webp`,
  srcSet: width > 640 ? `/media/${name}-640.webp 640w, /media/${name}-${large}.webp ${large}w` : undefined,
  width,
  height,
});

export const siteImages = {
  hero: image("hero-coast", 1376, 768, 1920),
  about: image("hero-bg", 1920, 1080, 1920),
  cta: image("cta-bg", 1920, 800),
  gallery: [image("gallery_dolphins", 640, 480, 640), image("gallery3", 1440, 1920), image("gallery4", 1440, 1920), image("gallery5", 1080, 1920)],
  experiences: [image("gallery4", 1440, 1920), image("gallery3", 1440, 1920), image("catamaran_5_aperitivo", 1440, 1920), image("searay_interior", 3200, 1799)],
};

export interface Boat {
  slug: string;
  name: string;
  type: Localized;
  description: Localized;
  images: SiteImage[];
  capacity: string;
  power?: string;
  length: string;
  year?: number;
  configuration?: Localized;
  beam?: string;
  cabins?: number;
  electricWc?: number;
  prices: PriceOption[];
  hourlyRate?: number;
  priceOnRequest?: boolean;
  includes: Localized[];
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
    images: [image("catamaran_1_aerial", 1280, 720), image("catamaran_2_marina", 1200, 1600), image("catamaran_3_dock", 1440, 1920), image("catamaran_4_salon", 1440, 1920), image("catamaran_5_aperitivo", 1440, 1920)],
    capacity: "12 + crew",
    power: "2×40 HP Volvo",
    length: "12.50 m",
    year: 2020,
    beam: "7.00 m",
    cabins: 4,
    electricWc: 4,
    prices: fleetPrices["catamaran-bali-4"],
    includes: [
      l("Water (limited)", "Agua (cantidad limitada)", "Eau (quantité limitée)"),
      l("Soft drinks (limited)", "Refrescos (cantidad limitada)", "Boissons sans alcool (quantité limitée)"),
      l("Rosé wine (1 bottle)", "Vino rosado (1 botella)", "Vin rosé (1 bouteille)"),
      l("Beer (limited)", "Cerveza (cantidad limitada)", "Bière (quantité limitée)"),
      l("Cava (2 bottles)", "Cava (2 botellas)", "Cava (2 bouteilles)"),
      l("Chips (limited)", "Patatas fritas (cantidad limitada)", "Chips (quantité limitée)"),
      l("Towels", "Toallas", "Serviettes"),
      l("Paddle surf", "Paddle surf", "Paddle"),
      l("Snorkel", "Snorkel", "Masque et tuba"),
      l("Bluetooth music", "Música Bluetooth", "Musique Bluetooth"),
      l("Captain & crew", "Capitán y tripulación", "Capitaine et équipage"),
      l("Fuel", "Combustible", "Carburant"),
    ],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "azimut-39-fly",
    name: "Azimut 39 Fly",
    type: l("Motor yacht", "Yate a motor", "Yacht à moteur"),
    description: l("Italian lines, a flybridge and effortless coastal cruising.", "Líneas italianas, flybridge y navegación costera sin esfuerzo.", "Lignes italiennes, flybridge et navigation côtière tout en douceur."),
    images: [image("azimut_2", 1974, 1317), image("azimut_3", 468, 573, 640), image("azimut_4", 910, 1137), image("azimut_5", 902, 1127), image("azimut_6", 935, 1168), image("azimut_7", 716, 894), image("azimut_8", 908, 1134), image("azimut_9", 935, 1168), image("azimut_main", 819, 1025)],
    capacity: "10",
    length: "12.30 m",
    configuration: l("Flybridge", "Flybridge", "Flybridge"),
    prices: fleetPrices["azimut-39-fly"],
    includes: [
      l("Captain", "Capitán", "Capitaine"),
      l("Champagne (2 bottles)", "Champán (2 botellas)", "Champagne (2 bouteilles)"),
      l("White wine (2 bottles)", "Vino blanco (2 botellas)", "Vin blanc (2 bouteilles)"),
      l("Drinks (limited)", "Bebidas (cantidad limitada)", "Boissons (quantité limitée)"),
      l("Paddle surf", "Paddle surf", "Paddle"),
      l("Insurance", "Seguro", "Assurance"),
    ],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "rinker-296-captiva",
    name: "Rinker 296 Captiva",
    type: l("Sport cruiser", "Lancha deportiva", "Bateau sportif"),
    description: l("An agile open cruiser for an easy escape along the Marbella coast.", "Una lancha ágil para una escapada sencilla por la costa de Marbella.", "Un bateau agile pour une escapade facile le long de la côte de Marbella."),
    images: [image("rinker_main", 346, 461, 640), image("rinker", 346, 461, 640)], capacity: "10", power: "Sport cruiser", length: "9.4 m",
    prices: fleetPrices["rinker-296-captiva"],
    hourlyRate: hourlyRates["rinker-296-captiva"],
    includes: [l("Captain", "Capitán", "Capitaine"), l("Welcome drink", "Bebida de bienvenida", "Boisson de bienvenue"), l("Stereo", "Equipo de música", "Système audio"), l("Fuel", "Combustible", "Carburant"), l("VAT", "IVA", "TVA")],
    experiences: ["sunset", "celebrations", "family"],
  },
  {
    slug: "sea-ray-sundancer-540",
    name: "Sea Ray Sundancer 540",
    type: l("Luxury yacht", "Yate de lujo", "Yacht de luxe"),
    description: l("Generous decks and refined interiors for milestone occasions on the Mediterranean.", "Cubiertas generosas e interiores refinados para grandes ocasiones en el Mediterráneo.", "De vastes ponts et des intérieurs raffinés pour les grandes occasions en Méditerranée."),
    images: [image("searay_3", 792, 739, 792), image("searay_main", 768, 1371, 768), image("searay_2", 1373, 768), image("searay_4", 3152, 1799), image("searay_interior", 3200, 1799)], capacity: "12 + crew", power: "Caterpillar 800 HP", length: "16.7 m", beam: "4.8 m", cabins: 2,
    prices: fleetPrices["sea-ray-sundancer-540"],
    priceOnRequest: true,
    includes: [l("Captain & crew", "Capitán y tripulación", "Capitaine et équipage"), l("Fruit board and snacks", "Tabla de fruta y aperitivos", "Fruits et amuse-bouches"), l("Cava, wine, beer and soft drinks", "Cava, vino, cerveza y refrescos", "Cava, vin, bière et boissons sans alcool"), l("SUP and snorkel", "SUP y snorkel", "SUP et masque/tuba"), l("Towels and sound system", "Toallas y equipo de sonido", "Serviettes et système audio")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
];

export const WHATSAPP_NUMBER = "34600746712";
export const SITE_URL = "https://sea-dreams-maker.lovable.app";
export const getBoat = (slug?: string) => boats.find((boat) => boat.slug === slug);
export const money = (value: number, lang: Lang) => new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
