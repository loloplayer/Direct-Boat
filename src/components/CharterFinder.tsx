import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Search, Users, WalletCards, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const labels = {
  en: { guests: "Guests", budget: "Budget", duration: "Duration", departure: "Departure", find: "Find my boat", any: "Any", up500: "Up to €500", b1: "€500–1,000", b2: "€1,000–2,000", over2: "€2,000+", banus: "Puerto Banús", centre: "Marbella centre", open: "Find your boat" },
  es: { guests: "Personas", budget: "Presupuesto", duration: "Duración", departure: "Salida", find: "Encuentra mi barco", any: "Cualquiera", up500: "Hasta €500", b1: "€500–1.000", b2: "€1.000–2.000", over2: "€2.000+", banus: "Puerto Banús", centre: "Marbella centro", open: "Encuentra tu barco" },
  fr: { guests: "Personnes", budget: "Budget", duration: "Durée", departure: "Départ", find: "Trouver mon bateau", any: "Tous", up500: "Jusqu’à 500 €", b1: "500–1 000 €", b2: "1 000–2 000 €", over2: "2 000 €+", banus: "Puerto Banús", centre: "Centre de Marbella", open: "Trouvez votre bateau" },
} as const;

export default function CharterFinder() {
  const { lang } = useLanguage();
  const t = labels[lang];
  const navigate = useNavigate();
  const [guests, setGuests] = useState(2);
  const [budget, setBudget] = useState("any");
  const [duration, setDuration] = useState("2");
  const [departure, setDeparture] = useState("any");
  const submit = () => navigate(`/${lang}/fleet?guests=${guests}&budget=${budget}&duration=${duration}&departure=${departure}`);
  return <div className="hero-finder" aria-label={t.open}>
    <div className="finder-field min-w-[180px]"><Users /><span><small>{t.guests}</small><span className="flex items-center gap-3"><Button type="button" variant="ghost" size="icon-sm" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Decrease guests"><Minus /></Button><strong>{guests}</strong><Button type="button" variant="ghost" size="icon-sm" onClick={() => setGuests(Math.min(12, guests + 1))} aria-label="Increase guests"><Plus /></Button></span></span></div>
    <label className="finder-field"><WalletCards /><span><small>{t.budget}</small><select value={budget} onChange={(event) => setBudget(event.target.value)}><option value="any">{t.any}</option><option value="0-500">{t.up500}</option><option value="500-1000">{t.b1}</option><option value="1000-2000">{t.b2}</option><option value="2000+">{t.over2}</option></select></span></label>
    <label className="finder-field"><Clock3 /><span><small>{t.duration}</small><select value={duration} onChange={(event) => setDuration(event.target.value)}>{[1,2,3,4,6,8].map((hour) => <option key={hour} value={hour}>{hour} h</option>)}</select></span></label>
    <label className="finder-field"><MapPin /><span><small>{t.departure}</small><select value={departure} onChange={(event) => setDeparture(event.target.value)}><option value="any">{t.any}</option><option value="puerto-banus">{t.banus}</option><option value="marbella-centre">{t.centre}</option></select></span></label>
    <Button type="button" size="lg" className="finder-submit" onClick={submit}><Search />{t.find}</Button>
  </div>;
}
