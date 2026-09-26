import { createContext, useContext, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Lang } from "@/data/siteData";
import { getCopy } from "@/data/content";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  copy: ReturnType<typeof getCopy>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const segment = location.pathname.split("/")[1];
  const lang: Lang = segment === "es" || segment === "fr" ? segment : "en";
  const setLang = (next: Lang) => {
    const parts = location.pathname.split("/");
    parts[1] = next;
    navigate(`${parts.join("/")}${location.search}${location.hash}`);
  };
  return <LanguageContext.Provider value={{ lang, setLang, copy: getCopy(lang) }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};