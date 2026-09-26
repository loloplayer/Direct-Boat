export type Lang = "en" | "es" | "fr";
export type Localized = Record<Lang, string>;

export interface PriceOption {
  label: Localized;
  price: number;
}

const label = (en: string, es: string, fr: string): Localized => ({ en, es, fr });

export const fleetPrices: Record<string, PriceOption[]> = {
  "catamaran-bali-4": [
    { label: label("2 hours", "2 horas", "2 heures"), price: 709 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 945 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1087 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 1654 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 2127 },
  ],
  "azimut-39-fly": [
    { label: label("1 hour", "1 hora", "1 heure"), price: 423 },
    { label: label("2 hours", "2 horas", "2 heures"), price: 603 },
    { label: label("3 hours", "3 horas", "3 heures"), price: 783 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 963 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 1413 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 1683 },
  ],
  "rinker-296-captiva": [225, 360, 540, 720, 855, 990, 1125, 1260].map((price, index) => {
    const hours = index + 1;
    return { label: label(`${hours} ${hours === 1 ? "hour" : "hours"}`, `${hours} ${hours === 1 ? "hora" : "horas"}`, `${hours} ${hours === 1 ? "heure" : "heures"}`), price };
  }),
  "sea-ray-sundancer-540": [
    { label: label("2 hours", "2 horas", "2 heures"), price: 900 },
    { label: label("4 hours", "4 horas", "4 heures"), price: 1620 },
    { label: label("6 hours", "6 horas", "6 heures"), price: 2070 },
    { label: label("8 hours", "8 horas", "8 heures"), price: 2520 },
  ],
};

export const sharedCatamaranPrice = {
  price: 76.5,
  times: ["10:00", "13:00", "16:00"],
  duration: label("2 hours per person", "2 horas por persona", "2 heures par personne"),
};