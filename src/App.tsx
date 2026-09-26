import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "@/pages/HomePage";
import FleetPage from "@/pages/FleetPage";
import BoatDetailPage from "@/pages/BoatDetailPage";
import ExperiencesPage from "@/pages/ExperiencesPage";
import { AboutPage, ContactPage, FaqPage, LegalPage } from "@/pages/InfoPages";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();
const LocalizedRoutes = () => { const { lang } = useParams(); if (!lang || !["en", "es", "fr"].includes(lang)) return <Navigate to="/en" replace />; return <LanguageProvider><Routes><Route index element={<HomePage />} /><Route path="fleet" element={<FleetPage />} /><Route path="fleet/:slug" element={<BoatDetailPage />} /><Route path="experiences" element={<ExperiencesPage />} /><Route path="faq" element={<FaqPage />} /><Route path="about" element={<AboutPage />} /><Route path="contact" element={<ContactPage />} /><Route path="legal" element={<LegalPage kind="legal" />} /><Route path="privacy" element={<LegalPage kind="privacy" />} /><Route path="cookies" element={<LegalPage kind="cookies" />} /><Route path="terms" element={<LegalPage kind="terms" />} /><Route path="*" element={<NotFound />} /></Routes></LanguageProvider>; };

export default function App() { return <HelmetProvider><QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner /><BrowserRouter><Routes><Route path="/" element={<Navigate to="/en" replace />} /><Route path="/:lang/*" element={<LocalizedRoutes />} /><Route path="*" element={<Navigate to="/en" replace />} /></Routes></BrowserRouter></TooltipProvider></QueryClientProvider></HelmetProvider>; }