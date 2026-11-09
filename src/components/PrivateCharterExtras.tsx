import { Link } from "react-router-dom";
import { jetSkiAddon, money } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function PrivateCharterExtras() {
  const { lang, copy } = useLanguage();
  return <div className="mt-7 border-t border-border pt-6">
    <p className="text-sm font-medium">{jetSkiAddon.text[lang]}: {money(jetSkiAddon.price, lang)} {copy.perHour}</p>
    <p className="mt-2 text-xs text-muted-foreground">{copy.vatIncluded}</p>
    <Button asChild variant="outline" size="sm" className="mt-4"><Link to={`/${lang}/activities/jet-ski`}>{ { en: "Jet Ski ride", es: "Paseo en Jet Ski", fr: "Sortie en Jet Ski", de: "Jet Ski Fahrt" }[lang]}<ArrowRight /></Link></Button>
  </div>;
}