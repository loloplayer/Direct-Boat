import sundancer_640 from "../assets/fleet/sundancer-640.webp.asset.json";
import sundancer_1200 from "../assets/fleet/sundancer-1200.webp.asset.json";
import sundancer_2000 from "../assets/fleet/sundancer-2000.webp.asset.json";
import sea_ray_260_640 from "../assets/fleet/sea-ray-260-640.webp.asset.json";
import sea_ray_260_1200 from "../assets/fleet/sea-ray-260-1200.webp.asset.json";
import sea_ray_260_2000 from "../assets/fleet/sea-ray-260-2000.webp.asset.json";
import { activityPrices, fleetPrices, type Lang, type Localized, type PriceOption } from "./fleet";

export type { Lang, Localized, PriceOption } from "./fleet";

import { germanLabels } from "./german";

const l = (en: string, es: string, fr: string): Localized => {
  const de = germanLabels[en];
  if (de === undefined) throw new Error(`Missing German fleet translation: ${en}`);
  return { en, es, fr, de };
};

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

const newFleetImages: Record<string, SiteImage> = {
  "sundancer": { src: sundancer_1200.url, srcSet: `${sundancer_640.url} 640w, ${sundancer_1200.url} 1200w, ${sundancer_2000.url} 2000w`, width: 2400, height: 1599 },
  "sea-ray-260": { src: sea_ray_260_1200.url, srcSet: `${sea_ray_260_640.url} 640w, ${sea_ray_260_1200.url} 1200w, ${sea_ray_260_2000.url} 2000w`, width: 1620, height: 2160 },
};

export const siteImages = {
  hero: { src: "/videos/hero-banus-v2-poster.webp", width: 1080, height: 1920 },
  about: hi("catamaran-la-concha", 1500, 2000),
  cta: hi("catamaran-cover", 2400, 1800),
  gallery: [image("gallery_dolphins", 640, 480, 640), image("gallery3", 1440, 1920), image("gallery4", 1440, 1920), image("gallery5", 1080, 1920, 1200)],
  experiences: [image("gallery4", 1440, 1920), image("gallery3", 1440, 1920), hi("catamaran-group-bow", 2400, 1800), image("azimut_4", 910, 1137, 1200)],
  activities: {
    parasailing: image("activity-parasailing", 1536, 1024),
    towables: image("activity-towables", 1536, 1024),
    watersports: image("activity-watersports", 1536, 1024),
    eco: image("activity-eco", 1536, 1024),
  },
};

export const instagramImages: SiteImage[] = [
  image("gallery_dolphins", 640, 480, 640),
  hi("catamaran-sunset", 1500, 2000),
  hi("catamaran-group-bow", 2400, 1800),
  hi("princess-v48-1", 2016, 1134),
  hi("catamaran-drone-swim", 1500, 2000),
  hi("azimut-cover", 2400, 1800),
];

export const siteVideos = {
  hero: { src: "/videos/hero-banus-v2.mp4", poster: { src: "/videos/hero-banus-v2-poster.webp", width: 1080, height: 1920 } },
  dolphins: { src: "/videos/dolphins-marbella.mp4", poster: { src: "/videos/dolphins-marbella-poster.webp", width: 1080, height: 1920 } },
  onboardCatamaran: { src: "/videos/onboard-catamaran.mp4", poster: { src: "/videos/onboard-catamaran-poster.webp", width: 1080, height: 1920 } },
} satisfies Record<string, SiteVideo>;

export type LocationId = "puerto-banus" | "the-point";
export interface ServiceLocation { id: LocationId; name: Localized; shortName: Localized; address: Localized; latitude: number; longitude: number }
export const locations: Record<LocationId, ServiceLocation> = {
  "puerto-banus": { id: "puerto-banus", name: l("Puerto Banús", "Puerto Banús", "Puerto Banús"), shortName: l("Puerto Banús", "Puerto Banús", "Puerto Banús"), address: l("Puerto Banús, Marbella", "Puerto Banús, Marbella", "Puerto Banús, Marbella"), latitude: 36.483611, longitude: -4.950556 },
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
  category?: "catamaran" | "yacht" | "motorboat";
  affordable?: boolean;
}

export const privateCharterIncludes: Localized[] = [
  { en: "Skipper and crew", es: "Patrón y tripulación", fr: "Skipper et équipage", de: "Skipper und Crew" },
  { en: "Fuel", es: "Combustible", fr: "Carburant", de: "Kraftstoff" },
  { en: "Water", es: "Agua", fr: "Eau", de: "Wasser" },
  { en: "Soft drinks and two bottles of cava", es: "Refrescos y dos botellas de cava", fr: "Boissons sans alcool et deux bouteilles de cava", de: "Softdrinks und zwei Flaschen Cava" },
  { en: "Snacks and crisps", es: "Aperitivos y patatas fritas", fr: "Snacks et chips", de: "Snacks und Chips" },
  { en: "Towels", es: "Toallas", fr: "Serviettes", de: "Handtücher" },
  { en: "Paddle board", es: "Paddle surf", fr: "Paddle", de: "Paddleboard" },
  { en: "Snorkelling gear", es: "Equipo de snorkel", fr: "Équipement de snorkeling", de: "Schnorchelausrüstung" },
  { en: "Bluetooth music", es: "Música Bluetooth", fr: "Musique Bluetooth", de: "Bluetooth-Musik" },
];
export const pontoon5Location: ServiceLocation = { ...locations["puerto-banus"],
  name: { en: "Puerto Banús · Pontoon 5", es: "Puerto Banús · Pontón 5", fr: "Puerto Banús · Ponton 5", de: "Puerto Banús · Steg 5" },
  address: { en: "Pontoon 5, Puerto Banús, Marbella", es: "Pontón 5, Puerto Banús, Marbella", fr: "Ponton 5, Puerto Banús, Marbella", de: "Steg 5, Puerto Banús, Marbella" },
};

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
    images: [hi("catamaran-cover", 2400, 1800), hi("catamaran-drone-swim", 1500, 2000), hi("catamaran-group-bow", 2400, 1800), hi("catamaran-sailing", 1500, 2000), hi("catamaran-interior", 1125, 2000), hi("catamaran-salon-view", 1500, 2000), hi("catamaran-food", 1500, 2000), hi("catamaran-dj", 1500, 2000), hi("catamaran-sunset", 1500, 2000), hi("catamaran-la-concha", 1500, 2000)],
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
    includes: privateCharterIncludes,
    experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "azimut-39-fly",
    name: "Azimut 39 Fly",
    type: l("Motor yacht", "Yate a motor", "Yacht à moteur"),
    description: l("Italian lines, a flybridge and effortless coastal cruising.", "Líneas italianas, flybridge y navegación costera sin esfuerzo.", "Lignes italiennes, flybridge et navigation côtière tout en douceur."),
    images: [image("azimut_2", 1974, 1317), image("azimut_5", 902, 1127, 1200), image("azimut_9", 935, 1168, 1200), hi("azimut-cover", 2400, 1800), image("azimut-aerial", 632, 791, 632), image("azimut_4", 910, 1137, 1200), image("azimut_6", 935, 1168, 1200), image("azimut_8", 908, 1134, 1200)],
    location: locations["puerto-banus"],
    capacity: l("10 guests", "10 personas", "10 invités"),
    maxGuests: 10,
    length: "12.30 m",
    configuration: l("Flybridge", "Flybridge", "Flybridge"),
    prices: fleetPrices["azimut-39-fly"],
    includes: privateCharterIncludes,
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
    includes: privateCharterIncludes,
    experiences: ["sunset", "celebrations", "family", "corporate"],

  },
  {
    slug: "sea-ray-sundancer-540", name: "Sea Ray Sundancer 540", category: "yacht",
    type: { en: "Motor yacht", es: "Yate a motor", fr: "Yacht à moteur", de: "Motoryacht" },
    description: { en: "A 16-metre motor yacht for up to 12 guests, with private charters from 2 to 8 hours departing Puerto Banús, Pontoon 5.", es: "Un yate a motor de 16 metros para hasta 12 personas, con charters privados de 2 a 8 horas desde Puerto Banús, Pontón 5.", fr: "Un yacht à moteur de 16 mètres pour 12 invités maximum, en charter privé de 2 à 8 heures au départ de Puerto Banús, ponton 5.", de: "Eine 16 Meter lange Motoryacht für bis zu 12 Gäste. Private Charterfahrten von 2 bis 8 Stunden ab Puerto Banús, Steg 5." },
    images: [newFleetImages.sundancer], location: pontoon5Location,
    capacity: { en: "12 guests", es: "12 personas", fr: "12 invités", de: "12 Gäste" }, maxGuests: 12, length: "16 m",
    prices: fleetPrices["sea-ray-sundancer-540"], includes: privateCharterIncludes, experiences: ["sunset", "celebrations", "family", "corporate"],
  },
  {
    slug: "sea-ray-260", name: "Sea Ray 260", category: "motorboat", affordable: true,
    type: { en: "Motorboat", es: "Lancha a motor", fr: "Bateau à moteur", de: "Motorboot" },
    description: { en: "Our most affordable private boat for up to 8 guests. Enjoy 1 to 4 hours from Puerto Banús, with skipper and fuel included.", es: "Nuestro barco privado más económico, para hasta 8 personas. Disfruta de 1 a 4 horas desde Puerto Banús, con patrón y combustible incluidos.", fr: "Notre bateau privé le plus abordable, pour 8 invités maximum. Profitez de 1 à 4 heures au départ de Puerto Banús, skipper et carburant inclus.", de: "Unser günstigstes Privatboot für bis zu 8 Gäste. Genießen Sie 1 bis 4 Stunden ab Puerto Banús, inklusive Skipper und Kraftstoff." },
    images: [newFleetImages["sea-ray-260"]], location: locations["puerto-banus"],
    capacity: { en: "8 guests", es: "8 personas", fr: "8 invités", de: "8 Gäste" }, maxGuests: 8,
    prices: fleetPrices["sea-ray-260"], includes: privateCharterIncludes, experiences: ["sunset", "celebrations", "family"],
  },
];

export interface WaterActivity { id: string; title: Localized; description: Localized; image: SiteImage; prices: PriceOption[]; location: ServiceLocation; slug?: string; booking?: "company" | "the-point"; images?: SiteImage[]; maxPeople?: number; minimumAge?: number; licenceRequired?: boolean }
export const waterActivities: WaterActivity[] = [
  { id: "parasailing", title: l("Parasailing", "Parasailing", "Parachute ascensionnel"), description: l("Rise above the Mediterranean solo or together for panoramic views of Marbella.", "Sobrevuela el Mediterráneo solo o acompañado y contempla Marbella desde el aire.", "Prenez de la hauteur seul ou à plusieurs pour admirer Marbella depuis la mer."), image: siteImages.activities.parasailing, prices: activityPrices.parasailing, location: locations["the-point"] },
  { id: "towables", title: l("Towables", "Arrastrables", "Bouées tractées"), description: l("Fast, fun 15-minute rides with six inflatable styles to choose from.", "Diversión a toda velocidad durante 15 minutos con seis hinchables para elegir.", "Quinze minutes de sensations avec six bouées différentes au choix."), image: siteImages.activities.towables, prices: activityPrices.towables, location: locations["the-point"] },
  { id: "watersports", title: l("Watersports", "Deportes acuáticos", "Sports nautiques"), description: l("Try flyboard, water ski, wakeboard or knee board with expert guidance.", "Prueba flyboard, esquí acuático, wakeboard o kneeboard con asistencia experta.", "Essayez le flyboard, le ski nautique, le wakeboard ou le kneeboard avec un encadrement expert."), image: siteImages.activities.watersports, prices: activityPrices.watersports, location: locations["the-point"] },
  { id: "eco", title: l("Eco activities", "Actividades eco", "Activités éco"), description: l("Explore the calm water by SUP, pedal boat, kayak or a shared SUP Yoga session.", "Explora el mar en SUP, hidropedal, kayak o con una sesión compartida de SUP Yoga.", "Explorez une mer calme en SUP, pédalo, kayak ou lors d'une séance de SUP Yoga."), image: siteImages.activities.eco, prices: activityPrices.eco, location: locations["the-point"] },
];

export const WHATSAPP_NUMBER = "34600637118";
export const SITE_URL = "https://banuscharters.com";
export const getBoat = (slug?: string) => boats.find((boat) => boat.slug === slug);
export const money = (value: number, lang: Lang) => new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
