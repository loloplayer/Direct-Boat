import { describe, expect, it } from "vitest";
import { boats, money } from "../data/siteData";
import { LANGUAGES, landingPages, localizedTripPath } from "../data/landingPages";
import { alternatePaths, generateSitemap, publicRoutes, routeModifiedAt } from "../data/routes";
import { guideSections, intentCopy } from "../data/tripContent";
import { boatBookingMessage, boatBookingUrl } from "../lib/boatBooking";
import { thePointMessage } from "../lib/referral";
import { getCopy } from "../data/content";

describe("Four-language charter rules", () => {
 it("supports exactly English, Spanish, French and German", () => {
  expect(LANGUAGES).toEqual(["en", "es", "fr", "de"]);
  expect(publicRoutes).toHaveLength(80);
  expect(new Set(publicRoutes).size).toBe(80);
 });
 it("preserves current fleet, prices and guest limits", () => {
  expect(boats.map((boat) => [boat.slug, boat.maxGuests, Math.min(...boat.prices.map((price) => price.price))])).toEqual([
   ["catamaran-bali-4",10,750],["azimut-39-fly",10,450],["princess-v48-wow",14,1200],
  ]);
  expect(boats.every((boat) => boat.location.id === "puerto-banus")).toBe(true);
 });
 it("puts German booking details and unchanged EUR price into our WhatsApp", () => {
  const boat = boats.find((item) => item.slug === "princess-v48-wow");
  if (!boat) throw new Error("Princess missing");
  const price = boat.prices.find((item) => item.price === 1900);
  if (!price) throw new Error("4-hour price missing");
  const message = boatBookingMessage("de",boat,price,8,"2026-10-25","11:00");
  expect(message).toContain("Datum: 25.10.2026");
  expect(message).toContain("Abfahrtszeit: 11:00");
  expect(message).toContain(`Dauer: 4 h (${money(1900,"de")})`);
  expect(message).toContain("Gäste: 8");
  expect(boatBookingUrl("de",boat,price,8)).toMatch(/^https:\/\/wa.me\/34664575058\?text=/);
 });
 it("keeps German activity handoff as a tracked The Point inquiry", () => {
  expect(thePointMessage("de","AB12","Flyer / general enquiry","","")).toBe("Guten Tag. Ich komme über die Website von Banús Charters (Referenz BC-AB12) und möchte Informationen zu Ihren Wasseraktivitäten.");
  expect(thePointMessage("de","AB12","Jet Ski","2","2026-10-25")).toContain("Jet Ski für 2 Personen am 2026-10-25");
 });
 it("uses translated cross-language paths rather than untranslated German slugs", () => {
  const page = landingPages.find((item) => item.id === "rental");
  if (!page) throw new Error("Rental missing");
  expect(localizedTripPath(page,"de")).toBe("/de/boot-mieten-puerto-banus");
  expect(alternatePaths("de","/de/boot-mieten-puerto-banus")?.es).toBe("/es/alquiler-barco-puerto-banus");
 });
 it("has four-language alternates and editorial lastmod dates in the sitemap", () => {
  const sitemap = generateSitemap();
  expect((sitemap.match(/<url>/g) ?? []).length).toBe(80);
  expect((sitemap.match(/hreflang="de"/g) ?? []).length).toBe(80);
  expect((sitemap.match(/hreflang="x-default"/g) ?? []).length).toBe(80);
  expect(routeModifiedAt("/de/boot-mieten-puerto-banus")).toBe("2026-10-19");
  expect(routeModifiedAt("/not-a-page")).toBeUndefined();
  expect(sitemap).not.toContain("/social/");
 });
 it("provides 400–600 useful guide words for all six intents in every language", () => {
  for (const page of landingPages) for (const lang of LANGUAGES) {
   const words = (intentCopy[page.id][lang] + " " + guideSections[lang].map((s) => s.text).join(" ")).split(/\s+/).length;
   expect(words, `${page.id}/${lang}`).toBeGreaterThanOrEqual(400);
   expect(words, `${page.id}/${lang}`).toBeLessThanOrEqual(600);
  }
 });
 it("has translated German vessel specifications and duration labels", () => {
  expect(boats[0].capacity.de).toBe("10 Gäste + 2 Crewmitglieder");
  expect(boats[0].prices[0].label.de).toBe("2 Stunden");
  expect(boats[1].prices[0].label.de).toBe("1 Stunde");
  expect(getCopy("de").fields.guests).toBe("Gäste");
  expect(boats.every((boat) => boat.includes.every((item) => typeof item.de === "string"))).toBe(true);
 });
});
