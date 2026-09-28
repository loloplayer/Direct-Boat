import { activityPrices, fleetPrices, type Lang, type Localized, type PriceOption } from "./fleet";

export type { Lang, Localized, PriceOption } from "./fleet";

const l = (en: string, es: string, fr: string): Localized => ({ en, es, fr });

export interface SiteImage {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

export interface SiteVideo {
  src: string;
  poster: SiteImage;
}

const image = (name: string, width: number, height: number, large = Math.min(width, 1200)): SiteImage => ({
  src: `/media/${name}-${large === 1080 ? 1200 : large}.webp`,
  srcSet: width > 640 ? `/media/${name}-640.webp 640w, /media/${name}-${large}.webp ${large}w` : undefined,
  width,
  height,
});

const hi = (name: string, width: number, height: number): SiteImage => ({
  src: `/media/${name}-1200.webp`,
  srcSet: `/media/${name}-640.webp 640w, /media/${name}-1200.webp 1200w, /media/${name}-2000.webp 2000w`,
  width,
  height,
});

export const siteImages = {
  hero: { src: "/videos/hero-catamaran-la-concha-poster.webp", width: 1080, height: 1920 },
  about: hi("catamaran-la-concha", 1500, 2000),
  cta: hi("catamaran-cover", 2400, 1800),
  gallery: [image("gallery_dolphins", 640, 480, 640), image("gallery3", 1440, 1920), image("gallery4", 1440, 1920), image("gallery5", 1080, 1920)],
  experiences: [image("gallery4", 1440, 1920), image("gallery3", 1440, 1920), hi("catamaran-group-bow", 2400, 1800), image("azimut_4", 910, 1137)],
  activities: {
    "jet-ski": hi("water-activities-real", 2400, 1800),
    parasailing: image("activity-parasailing", 1536, 1024),
    towables: image("activity-towables", 1536, 1024),
    watersports: image("activity-watersports", 1536, 1024),
    eco: image("activity-eco", 1536, 1024),
  },
};

export const siteVideos = {
  hero: { src: "/videos/hero-catamaran-la-concha.mp4", poster: { src: "/videos/hero-catamaran-la-concha-poster.webp", width: 1080, height: 1920 } },
  dolphins: { src: "/videos/dolphins-marbella.mp4", poster: { src: "/videos/dolphins-marbella-poster.webp", width: 1080, height: 1920 } },
  onboardCatamaran: { src: "/videos/onboard-catamaran.mp4", poster: { src: "/videos/onboard-catamaran-poster.webp", width: 1080, height: 1920 } },
} satisfies Record<string, SiteVideo>;

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
  featuredVideo?: SiteVideo;
  location: ServiceLocation;
  capacity: Localized;
  maxGuests: number;
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
    images: [hi("catamaran-cover", 2400, 1800), hi("catamaran-aerial-beach", 2400, 1800), hi("catamaran-la-concha", 1500, 2000), hi("catamaran-group-bow", 2400, 1800), hi("catamaran-clouds", 1500, 2000), hi("catamaran-side", 2400, 1800), hi("catamaran-salon-view", 1500, 2000), hi("catamaran-interior", 1125, 2000)],
    featuredVideo: siteVideos.onboardCatamaran,
    location: locations["puerto-banus"],
    capacity: l("10 guests + 2 crew", "10 personas + 2 de tripulación", "10 invités + 2 membres d'équipage"),
    maxGuests: 10,
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
    images: [hi("azimut-cover", 2400, 1800), hi("azimut-portrait", 1500, 2000), image("azimut_2", 1974, 1317), image("azimut_4", 910, 1137), image("azimut_5", 902, 1127), image("azimut_6", 935, 1168), image("azimut_8", 908, 1134), image("azimut_9", 935, 1168)],
    location: locations["puerto-banus"],
    capacity: l("10 guests", "10 personas", "10 invités"),
    maxGuests: 10,
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
    slug: "princess-v48-wow",
    name: "Princess V48 · WOW",
    type: l("Sports yacht", "Yate deportivo", "Yacht sport"),
    description: l("A sleek Princess V48 sports yacht for up to 14 guests, departing from Puerto Banús.", "Un elegante yate deportivo Princess V48 para hasta 14 personas, con salida desde Puerto Banús.", "Un élégant yacht sport Princess V48 pour 14 invités maximum, au départ de Puerto Banús."),
    images: [hi("princess-v48-1", 2016, 1134), hi("princess-v48-2", 2016, 1134), hi("princess-v48-3", 1134, 2016)],
    location: locations["puerto-banus"],
    capacity: l("14 guests", "14 personas", "14 invités"),
    maxGuests: 14,
    length: "14.9 m",
    prices: fleetPrices["princess-v48-wow"],
    includes: [l("VAT included (21%)", "IVA incluido (21%)", "TVA incluse (21 %)")],
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "saxdor-200-sport",
    name: "Saxdor 200 Sport",
    type: l("Modern open boat", "Barco abierto moderno", "Bateau open moderne"),
    description: l("A nimble modern open boat with T-top for an easy coastal escape from central Marbella.", "Un barco abierto moderno y ágil con T-top para recorrer la costa desde Marbella centro.", "Un bateau open moderne et agile avec T-top pour longer la côte depuis le centre de Marbella."),
    images: [image("saxdor-200-sport", 1500, 1125)], location: locations["marbella-centre"], capacity: l("6 guests", "6 personas", "6 invités"), maxGuests: 6, prices: fleetPrices["saxdor-200-sport"],
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

export const WHATSAPP_NUMBER = "34664575058";
export const SITE_URL = "https://banuscharters.com";
export const getBoat = (slug?: string) => boats.find((boat) => boat.slug === slug);
export const money = (value: number, lang: Lang) => new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
