export type Lang = "en" | "es" | "fr";
export type Localized = Record<Lang, string>;

export interface PriceOption {
  label: Localized;
  price: number;
}

const label = (en: string, es: string, fr: string): Localized => ({ en, es, fr });

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
  "rinker-296-captiva": Array.from({ length: 8 }, (_, index) => {
    const hours = index + 1;
    return { label: label(`${hours} ${hours === 1 ? "hour" : "hours"}`, `${hours} ${hours === 1 ? "hora" : "horas"}`, `${hours} ${hours === 1 ? "heure" : "heures"}`), price: 250 * hours };
  }),
  "sea-ray-sundancer-540": Array.from({ length: 8 }, (_, index) => {
    const hours = index + 1;
    return { label: label(`${hours} ${hours === 1 ? "hour" : "hours"}`, `${hours} ${hours === 1 ? "hora" : "horas"}`, `${hours} ${hours === 1 ? "heure" : "heures"}`), price: 1000 * hours };
  }),
  "cruisers-yachts-39": [
    { label: label("1 hour", "1 hora", "1 heure"), price: 400 },
    { label: label("2 hours", "2 horas", "2 heures"), price: 600 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 800 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1000 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 1500 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 1800 },
  ],
  "saxdor-200-sport": [
    { label: label("1 hour", "1 hora", "1 heure"), price: 280 },
    { label: label("2 hours", "2 horas", "2 heures"), price: 400 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 550 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 650 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 900 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 1200 },
  ],
};

export const hourlyRates: Record<string, number> = {
  "rinker-296-captiva": 250,
  "sea-ray-sundancer-540": 1000,
};

export const activityPrices: Record<string, PriceOption[]> = {
  "jet-ski": [
    { label: label("Jet ski circuit · 20 min", "Jet ski en circuito · 20 min", "Jet ski sur circuit · 20 min"), price: 70 },
    { label: label("Jet ski circuit · 30 min", "Jet ski en circuito · 30 min", "Jet ski sur circuit · 30 min"), price: 95 },
    { label: label("Jet ski circuit · 45 min", "Jet ski en circuito · 45 min", "Jet ski sur circuit · 45 min"), price: 140 },
    { label: label("Jet ski circuit · 1 hour", "Jet ski en circuito · 1 hora", "Jet ski sur circuit · 1 heure"), price: 170 },
    { label: label("Jet ski tour · 1 hour · minimum 2 jet skis", "Ruta en jet ski · 1 hora · mínimo 2 jet skis", "Randonnée jet ski · 1 heure · minimum 2 jet skis"), price: 170 },
    { label: label("Spark / Spark Trixx · 20 min", "Spark / Spark Trixx · 20 min", "Spark / Spark Trixx · 20 min"), price: 80 },
    { label: label("Spark / Spark Trixx · 30 min", "Spark / Spark Trixx · 30 min", "Spark / Spark Trixx · 30 min"), price: 105 },
    { label: label("Spark / Spark Trixx · 45 min", "Spark / Spark Trixx · 45 min", "Spark / Spark Trixx · 45 min"), price: 150 },
    { label: label("Spark / Spark Trixx · 1 hour", "Spark / Spark Trixx · 1 hora", "Spark / Spark Trixx · 1 heure"), price: 180 },
    { label: label("Super Jet · 20 min", "Super Jet · 20 min", "Super Jet · 20 min"), price: 70 },
    { label: label("Super Jet · 30 min", "Super Jet · 30 min", "Super Jet · 30 min"), price: 95 },
    { label: label("Super Jet · 45 min", "Super Jet · 45 min", "Super Jet · 45 min"), price: 140 },
    { label: label("Super Jet · 1 hour", "Super Jet · 1 hora", "Super Jet · 1 heure"), price: 170 },
  ],
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

