import { createServer, type Plugin } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { publicRoutes, generateSitemap } from "../src/data/routes";
const MAX_PRERENDER_PAGES = 200;
export async function writeStaticPages(output: string, template: string, root: string) {
 if (publicRoutes.length > MAX_PRERENDER_PAGES) throw new Error("Prerender route cap exceeded");
 const renderer = await createServer({ configFile: false, root, plugins: [react()], resolve: { alias: { "@": resolve(root, "src") } }, server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
 try {
  const { renderRoute } = await renderer.ssrLoadModule("/src/prerender.tsx");
  // Route metadata owns the head; retain only shared charset/viewport/fonts/favicon/assets.
  const clean = template.replace(/<title[\s\S]*?<\/title>/g, "").replace(/<meta\b[^>]*(?:name="(?:description|author|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, "").replace(/<script\b[^>]*type="application\/ld\+json"[\s\S]*?<\/script>/g, "");
  let englishHome = "";
  for (const url of publicRoutes) {
   const rendered = renderRoute(url);
   const html = clean.replace(/<html[^>]*>/, `<html ${rendered.htmlAttributes}>`).replace("</head>", `${rendered.head}</head>`).replace('<div id="root"></div>', `<div id="root">${rendered.body}</div>`);
   if (!html.includes("<h1") || !html.includes(`href="https://banuscharters.com${url}"`)) throw new Error(`Incomplete static HTML: ${url}`);
   const target = resolve(output, `.${url}`, "index.html");
   await mkdir(dirname(target), { recursive: true });
   await writeFile(target, html);
   if (url === "/en") englishHome = html;
  }
  await writeFile(resolve(output, "index.html"), englishHome);
  await writeFile(resolve(output, "sitemap.xml"), generateSitemap());
  console.log(`Prerendered ${publicRoutes.length} routes with title, metadata and main content.`);
 } finally { await renderer.close(); }
}
export function prerenderPlugin(): Plugin {
 let output = "dist"; let root = "";
 return {
  name: "charter-static-pages", apply: "build", enforce: "post",
  configResolved(config) { root = config.root; output = resolve(root, config.build.outDir); },
  async closeBundle() { await writeStaticPages(output, await readFile(resolve(output,"index.html"),"utf8"), root); },
 };
}
