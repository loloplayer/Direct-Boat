import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route, useParams } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { TooltipProvider } from "./components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import FleetPage from "./pages/FleetPage";
import BoatDetailPage from "./pages/BoatDetailPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import { AboutPage, ContactPage, FaqPage, LegalPage } from "./pages/InfoPages";
import TripLandingPage from "./pages/TripLandingPage";

const LocalizedPages = () => {
 const { lang } = useParams();
 if (!lang) throw new Error("Prerender requires a language");
 return <LanguageProvider><Routes><Route index element={<HomePage/>}/><Route path="fleet" element={<FleetPage/>}/><Route path="fleet/:slug" element={<BoatDetailPage/>}/><Route path="experiences" element={<ExperiencesPage/>}/><Route path="activities" element={<ActivitiesPage/>}/><Route path="faq" element={<FaqPage/>}/><Route path="about" element={<AboutPage/>}/><Route path="contact" element={<ContactPage/>}/><Route path="legal" element={<LegalPage kind="legal"/>}/><Route path="privacy" element={<LegalPage kind="privacy"/>}/><Route path="cookies" element={<LegalPage kind="cookies"/>}/><Route path="terms" element={<LegalPage kind="terms"/>}/><Route path=":tripSlug" element={<TripLandingPage/>}/></Routes></LanguageProvider>;
};
// The production output remains a static site; this function runs only at build time.
export function renderRoute(url: string) {
 HelmetProvider.canUseDOM = false;
 const context: { helmet?: HelmetServerState } = {};
 const body = renderToString(<HelmetProvider context={context}><TooltipProvider><StaticRouter location={url}><Routes><Route path="/:lang/*" element={<LocalizedPages/>}/></Routes></StaticRouter></TooltipProvider></HelmetProvider>);
 const helmet = context.helmet;
 if (!helmet || !body.includes("<h1")) throw new Error(`Missing main content for ${url}`);
 const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map((tag) => tag.toString()).join("\n");
 if (!head.includes(`https://banuscharters.com${url}`)) throw new Error(`Missing canonical for ${url}`);
 return { body, head, htmlAttributes: helmet.htmlAttributes?.toString() ?? "" };
}
