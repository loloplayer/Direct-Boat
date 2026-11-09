import PageShell from "@/components/PageShell";
import Seo from "@/components/Seo";
import BoatGallery from "@/components/BoatGallery";
import { ActivityCard } from "./ActivitiesPage";
import { jetSkiRide, SITE_URL } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { activityOffers } from "@/lib/activityBooking";
import PrivateCharterExtras from "@/components/PrivateCharterExtras";

export default function ActivityDetailPage() {
  const { lang } = useLanguage();
  const activity = jetSkiRide;
  const schema = { "@context": "https://schema.org", "@type": "Product", name: activity.title[lang], description: activity.description[lang],
    image: activity.images?.map((image) => `${SITE_URL}${image.src}`), offers: activityOffers(activity, lang),
    brand: { "@type": "Brand", name: "Banús Charters" },
    additionalProperty: [{ "@type": "PropertyValue", name: "Minimum age", value: activity.minimumAge }, { "@type": "PropertyValue", name: "People per Jet Ski", value: activity.maxPeople }],
    location: { "@type": "Place", name: activity.location.name[lang], address: activity.location.address[lang] },
  };
  return <PageShell><Seo lang={lang} path="/activities/jet-ski" title={`${activity.title[lang]} · Puerto Banús | Banús Charters`} description={activity.description[lang]} jsonLd={schema} />
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-32 md:px-10"><p className="section-kicker">Puerto Banús · Marbella</p><h1 className="font-display text-5xl md:text-7xl">{activity.title[lang]}</h1></section>
    <BoatGallery images={activity.images ?? [activity.image]} boatName={activity.title[lang]} lang={lang} />
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24"><ActivityCard activity={activity} showImage={false} /><PrivateCharterExtras /></section>
  </PageShell>;
}