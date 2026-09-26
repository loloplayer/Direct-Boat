import { activityPrices, fleetPrices, hourlyRates, type Lang, type Localized, type PriceOption } from "./fleet";

export type { Lang, Localized, PriceOption } from "./fleet";

const l = (en: string, es: string, fr: string): Localized => ({ en, es, fr });

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
  activities: {
    "jet-ski": image("jetski1", 1200, 800),
    parasailing: image("activity-parasailing", 1536, 1024),
    towables: image("activity-towables", 1536, 1024),
    watersports: image("activity-watersports", 1536, 1024),
    eco: image("activity-eco", 1536, 1024),
  },
};

export type LocationId = "puerto-banus" | "marbella-centre" | "the-point";
export interface ServiceLocation { id: LocationId; name: Localized; shortName: Localized; address: Localized; latitude: number; longitude: number }
export const locations: Record<LocationId, ServiceLocation> = {
  "puerto-banus": { id: "puerto-banus", name: l("Puerto Banús", "Puerto Banús", "Puerto Banús"), shortName: l("Puerto Banús", "Puerto Banús", "Puerto Banús"), address: l("Puerto Banús, Marbella", "Puerto Banús, Marbella", "Puerto Banús, Marbella"), latitude: 36.487, longitude: -4.953 },
  "marbella-centre": { id: "marbella-centre", name: l("Puerto Deportivo de Marbella", "Puerto Deportivo de Marbella", "Puerto Deportivo de Marbella"), shortName: l("Marbella Centre", "Marbella Centro", "Centre de Marbella"), address: l("Marbella town centre marina", "Puerto deportivo del centro de Marbella", "Port de plaisance du centre de Marbella"), latitude: 36.507, longitude: -4.886 },
  "the-point": { id: "the-point", name: l("The Point beach, Marbella", "The Point beach, Marbella", "The Point beach, Marbella"), shortName: l("The Point beach", "The Point beach", "The Point beach"), address: l("Marbella centre, 15 min from Puerto Banús", "Marbella centro, a 15 min de Puerto Banús", "Centre de Marbella, à 15 min de Puerto Banús"), latitude: 36.507, longitude: -4.878 },
};

export interface Boat {
  slug: string;
  name: string;
  type: Localized;
  description: Localized;
  images: SiteImage[];
  location: ServiceLocation;
  capacity: string;
  power?: string;
  length?: string;
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
    location: locations["puerto-banus"],
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
    location: locations["puerto-banus"],
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
    location: locations["puerto-banus"],
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
    images: [image("searay_3", 792, 739, 1200), image("searay_main", 768, 1371, 1200), image("searay_2", 1373, 768), image("searay_4", 3152, 1799), image("searay_interior", 3200, 1799)], capacity: "12 + crew", power: "Caterpillar 800 HP", length: "16.7 m", beam: "4.8 m", cabins: 2,
    location: locations["puerto-banus"],
    prices: fleetPrices["sea-ray-sundancer-540"],
    hourlyRate: hourlyRates["sea-ray-sundancer-540"],
    includes: [l("Captain & crew", "Capitán y tripulación", "Capitaine et équipage"), l("Fruit board and snacks", "Tabla de fruta y aperitivos", "Fruits et amuse-bouches"), l("Cava, wine, beer and soft drinks", "Cava, vino, cerveza y refrescos", "Cava, vin, bière et boissons sans alcool"), l("SUP and snorkel", "SUP y snorkel", "SUP et masque/tuba"), l("Towels and sound system", "Toallas y equipo de sonido", "Serviettes et système audio")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "cruisers-yachts-39",
    name: "Cruisers Yachts 39",
    type: l("Sport cruiser yacht", "Yate deportivo", "Yacht sport cruiser"),
    description: l("A refined sport cruiser for sociable days departing from Marbella's town centre marina.", "Un yate deportivo elegante para disfrutar en grupo desde el puerto del centro de Marbella.", "Un yacht sportif raffiné pour des journées conviviales au départ du port du centre de Marbella."),
    images: [image("cruisers-yachts-39", 1536, 1024)], location: locations["marbella-centre"], capacity: "12", prices: fleetPrices["cruisers-yachts-39"],
    includes: [l("Skipper", "Patrón", "Skipper"), l("Drinks", "Bebidas", "Boissons"), l("Snacks", "Aperitivos", "Snacks")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "saxdor-200-sport",
    name: "Saxdor 200 Sport",
    type: l("Modern open boat", "Barco abierto moderno", "Bateau open moderne"),
    description: l("A nimble modern open boat with T-top for an easy coastal escape from central Marbella.", "Un barco abierto moderno y ágil con T-top para recorrer la costa desde Marbella centro.", "Un bateau open moderne et agile avec T-top pour longer la côte depuis le centre de Marbella."),
    images: [image("saxdor-200-sport", 1536, 1024)], location: locations["marbella-centre"], capacity: "6", prices: fleetPrices["saxdor-200-sport"],
    includes: [l("Skipper", "Patrón", "Skipper"), l("Drinks", "Bebidas", "Boissons"), l("Snacks", "Aperitivos", "Snacks")],
    experiences: ["sunset", "family"],
  },
];

export interface WaterActivity { id: string; title: Localized; description: Localized; image: SiteImage; prices: PriceOption[]; location: ServiceLocation }
export const waterActivities: WaterActivity[] = [
  { id: "jet-ski", title: l("Jet Ski", "Jet Ski", "Jet Ski"), description: l("Choose a circuit session, a guided tour, Spark or Super Jet experience.", "Elige una sesión en circuito, una ruta guiada o una experiencia Spark o Super Jet.", "Choisissez une session sur circuit, une randonnée guidée ou une expérience Spark ou Super Jet."), image: siteImages.activities["jet-ski"], prices: activityPrices["jet-ski"], location: locations["the-point"] },
  { id: "parasailing", title: l("Parasailing", "Parasailing", "Parachute ascensionnel"), description: l("Rise above the Mediterranean solo or together for panoramic views of Marbella.", "Sobrevuela el Mediterráneo solo o acompañado y contempla Marbella desde el aire.", "Prenez de la hauteur seul ou à plusieurs pour admirer Marbella depuis la mer."), image: siteImages.activities.parasailing, prices: activityPrices.parasailing, location: locations["the-point"] },
  { id: "towables", title: l("Towables", "Arrastrables", "Bouées tractées"), description: l("Fast, fun 15-minute rides with six inflatable styles to choose from.", "Diversión a toda velocidad durante 15 minutos con seis hinchables para elegir.", "Quinze minutes de sensations avec six bouées différentes au choix."), image: siteImages.activities.towables, prices: activityPrices.towables, location: locations["the-point"] },
  { id: "watersports", title: l("Watersports", "Deportes acuáticos", "Sports nautiques"), description: l("Try flyboard, water ski, wakeboard or knee board with expert guidance.", "Prueba flyboard, esquí acuático, wakeboard o kneeboard con asistencia experta.", "Essayez le flyboard, le ski nautique, le wakeboard ou le kneeboard avec un encadrement expert."), image: siteImages.activities.watersports, prices: activityPrices.watersports, location: locations["the-point"] },
  { id: "eco", title: l("Eco activities", "Actividades eco", "Activités éco"), description: l("Explore the calm water by SUP, pedal boat, kayak or a shared SUP Yoga session.", "Explora el mar en SUP, hidropedal, kayak o con una sesión compartida de SUP Yoga.", "Explorez une mer calme en SUP, pédalo, kayak ou lors d'une séance de SUP Yoga."), image: siteImages.activities.eco, prices: activityPrices.eco, location: locations["the-point"] },
];

export const WHATSAPP_NUMBER = "34600746712";
export const SITE_URL = "https://sea-dreams-maker.lovable.app";
export const getBoat = (slug?: string) => boats.find((boat) => boat.slug === slug);
export const money = (value: number, lang: Lang) => new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
