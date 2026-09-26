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
  "sea-ray-sundancer-540": [],
};

export const hourlyRates: Record<string, number> = { "rinker-296-captiva": 250 };

