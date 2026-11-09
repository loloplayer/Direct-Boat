export type Lang = "en" | "es" | "fr" | "de";
export type Localized = Record<Lang, string>;

export interface PriceOption {
  label: Localized;
  price: number;
}

// The only editable shared-trip price; server knowledge is generated from this value.
export const sharedTripPrice = 50;

const germanPriceLabel = (en: string) => en.replace(/minimum 2 people/g, "mindestens 2 Personen").replace(/per person/g, "pro Person").replace(/Water ski/g, "Wasserski").replace(/Pedal boat/g, "Tretboot").replace(/Knee board/g, "Kneeboard").replace(/SUP \(paddle surf\)/g, "SUP (Stand-up-Paddling)").replace(/(\d+) hours/g, "$1 Stunden").replace(/1 hour/g, "1 Stunde").replace(/(\d+) people/g, "$1 Personen").replace(/1 person/g, "1 Person");
const label = (en: string, es: string, fr: string): Localized => ({ en, es, fr, de: germanPriceLabel(en) });

export const fleetPrices: Record<string, PriceOption[]> = {
  "catamaran-bali-4": [
    { label: label("2 hours", "2 horas", "2 heures"), price: 750 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 1000 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1150 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 1750 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 2250 },
  ],
  "azimut-39-fly": [
    { label: label("1 hour", "1 hora", "1 heure"), price: 450 },
    { label: label("2 hours", "2 horas", "2 heures"), price: 650 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 850 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1100 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 1550 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 1850 },
  ],
  "princess-v48-wow": [
    { label: label("2 hours", "2 horas", "2 heures"), price: 1200 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 1500 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1900 },
    { label: label("5 hours", "5 horas", "5 heures"), price: 2250 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 2500 },
    { label: label("7 hours", "7 horas", "7 heures"), price: 2750 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 2950 },
  ],
  "sea-ray-sundancer-540": [
    { label: label("2 hours", "2 horas", "2 heures"), price: 1000 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1800 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 2300 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 2800 },
  ],
  "sea-ray-260": [
    { label: label("1 hour", "1 hora", "1 heure"), price: 250 },
    { label: label("2 hours", "2 horas", "2 heures"), price: 370 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 450 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 550 },
  ],
};

export const activityPrices: Record<string, PriceOption[]> = {
  parasailing: [
    { label: label("1 person", "1 persona", "1 personne"), price: 80 },
    { label: label("2 people", "2 personas", "2 personnes"), price: 120 },
    { label: label("3 people", "3 personas", "3 personnes"), price: 160 },
  ],
  towables: ["Crazy Sofa", "Banana", "Airstream", "Crazy Bull", "Flyfish Extreme", "Crazy Octopus"].map((name) => ({ label: label(`${name} · 15 min · per person`, `${name} · 15 min · por persona`, `${name} · 15 min · par personne`), price: 25 })),
  watersports: [
    ["Flyboard", "Flyboard", "Flyboard"], ["Water ski", "Esquí acuático", "Ski nautique"], ["Wakeboard", "Wakeboard", "Wakeboard"], ["Knee board", "Kneeboard", "Kneeboard"],
  ].map(([en, es, fr]) => ({ label: label(`${en} · 15 min · per person`, `${es} · 15 min · por persona`, `${fr} · 15 min · par personne`), price: 75 })),
  eco: [
    ["SUP (paddle surf)", "SUP (paddle surf)", "SUP (paddle)"], ["Pedal boat", "Hidropedal", "Pédalo"], ["Kayak", "Kayak", "Kayak"], ["SUP Yoga · minimum 2 people", "SUP Yoga · mínimo 2 personas", "SUP Yoga · minimum 2 personnes"],
  ].map(([en, es, fr]) => ({ label: label(`${en} · 1 hour`, `${es} · 1 hora`, `${fr} · 1 heure`), price: 35 })),
};

