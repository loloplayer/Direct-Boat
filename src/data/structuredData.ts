import { locations, SITE_URL, type Lang } from "./siteData";
import { getCopy } from "./content";
export const businessSchema = (lang: Lang) => ({
 "@context": "https://schema.org", "@type": ["TravelAgency", "LocalBusiness"], "@id": `${SITE_URL}/#business`,
 name: "Banús Charters", url: `${SITE_URL}/${lang}`, telephone: "+34 664 57 50 58", description: getCopy(lang).aboutText,
 address: { "@type": "PostalAddress", streetAddress: "Puerto Banús", postalCode: "29660", addressLocality: "Marbella", addressRegion: "Málaga", addressCountry: "ES" },
 geo: { "@type": "GeoCoordinates", latitude: locations["puerto-banus"].latitude, longitude: locations["puerto-banus"].longitude },
 areaServed: { "@type": "City", name: "Marbella" }, priceRange: "€€€",
});
