import type { Plugin } from "vite";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { publicRoutes, generateSitemap } from "../src/data/routes";
export function prerenderPlugin(): Plugin {
 let output = "dist";
 return {
  name: "charter-static-pages", apply: "build", enforce: "post",
  configResolved(config) { output = resolve(config.root, config.build.outDir); },
  generateBundle() {
   if (publicRoutes.length > 200) throw new Error("Prerender route cap exceeded");
   this.emitFile({ type: "asset", fileName: "prerender-routes.json", source: JSON.stringify(publicRoutes) });
   this.emitFile({ type: "asset", fileName: "sitemap.xml", source: generateSitemap() });
  },
  closeBundle() {
   const result = spawnSync("python3", ["scripts/prerender.py", output], { stdio: "inherit", timeout: 240000 });
   if (result.status !== 0) throw new Error("Public-page prerender failed; refusing incomplete SEO output.");
  },
 };
}
