import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingActions from "./FloatingActions";
import CookieBanner from "./CookieBanner";

export default function PageShell({ children }: { children: ReactNode }) { return <div className="page-shell min-h-screen overflow-x-clip bg-background"><SiteHeader /><main>{children}</main><SiteFooter /><FloatingActions /><CookieBanner /></div>; }