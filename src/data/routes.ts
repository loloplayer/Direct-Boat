import { boats, SITE_URL, type Lang } from "./siteData";
import { landingPages, LANGUAGES, localizedTripPath } from "./landingPages";
export const standardPaths = ["", "/fleet", "/experiences", "/activities", "/faq", "/about", "/contact", "/legal", "/privacy", "/cookies", "/terms"];
export const routeGroups = [
 ...standardPaths.map((path) => Object.fromEntries(LANGUAGES.map((lang) => [lang, `/${lang}${path}`])) as Record<Lang, string>),
 ...boats.map((boat) => Object.fromEntries(LANGUAGES.map((lang) => [lang, `/${lang}/fleet/${boat.slug}`])) as Record<Lang, string>),
 ...landingPages.map((page) => Object.fromEntries(LANGUAGES.map((lang) => [lang, localizedTripPath(page, lang)])) as Record<Lang, string>),
];
export const publicRoutes = routeGroups.flatMap((group) => LANGUAGES.map((lang) => group[lang]));
export const alternatePaths = (lang: Lang, path: string) => routeGroups.find((group) => group[lang] === path);
const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
// Existing routes were significantly translated/localized in this content release.
// These dates are editorial release records, not dynamic build dates.
export const routeModifiedAt = (path: string): string | undefined => {
 const landing = landingPages.find((page) => LANGUAGES.some((lang) => localizedTripPath(page, lang) === path));
 if (landing) return landing.updatedAt;
 if (routeGroups.some((group) => LANGUAGES.some((lang) => group[lang] === path))) return "2026-10-19";
 return undefined;
};
export const generateSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routeGroups.flatMap((group) => LANGUAGES.map((lang) => {
 const path = group[lang]; const modified = routeModifiedAt(path);
 return `  <url><loc>${xml(SITE_URL + path)}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ""}${LANGUAGES.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${xml(SITE_URL + group[alternate])}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${xml(SITE_URL + group.en)}"/></url>`;
})).join("\n")}\n</urlset>\n`;
