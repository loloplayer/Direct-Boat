import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

const HomePage = lazy(() => import("@/pages/HomePage"));
const FleetPage = lazy(() => import("@/pages/FleetPage"));
const BoatDetailPage = lazy(() => import("@/pages/BoatDetailPage"));
const ExperiencesPage = lazy(() => import("@/pages/ExperiencesPage"));
const ActivitiesPage = lazy(() => import("@/pages/ActivitiesPage"));
const AboutPage = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.ContactPage })));
const FaqPage = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.FaqPage })));
const LegalPage = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.LegalPage })));
const NotFound = lazy(() => import("@/pages/NotFound"));

const LocalizedRoutes = () => { const { lang } = useParams(); if (!lang || !["en", "es", "fr"].includes(lang)) return <Navigate to="/en" replace />; return <LanguageProvider><Suspense fallback={<div className="min-h-screen bg-background" />}><Routes><Route index element={<HomePage />} /><Route path="fleet" element={<FleetPage />} /><Route path="fleet/:slug" element={<BoatDetailPage />} /><Route path="experiences" element={<ExperiencesPage />} /><Route path="activities" element={<ActivitiesPage />} /><Route path="faq" element={<FaqPage />} /><Route path="about" element={<AboutPage />} /><Route path="contact" element={<ContactPage />} /><Route path="legal" element={<LegalPage kind="legal" />} /><Route path="privacy" element={<LegalPage kind="privacy" />} /><Route path="cookies" element={<LegalPage kind="cookies" />} /><Route path="terms" element={<LegalPage kind="terms" />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></LanguageProvider>; };

export default function App() { return <HelmetProvider><TooltipProvider><Toaster /><BrowserRouter><Routes><Route path="/" element={<Navigate to="/en" replace />} /><Route path="/:lang/*" element={<LocalizedRoutes />} /><Route path="*" element={<Navigate to="/en" replace />} /></Routes></BrowserRouter></TooltipProvider></HelmetProvider>; }