import { describe, expect, it } from "vitest";
import { sharedCatamaranTrip } from "../data/siteData";
import { sharedTripBookingUrl, sharedTripMessage, sharedTripOffer } from "../lib/sharedTrip";

describe("Shared catamaran ticket rules", () => {
  it("uses the low-season EUR 50 ticket rate in offers", () => {
    expect(sharedCatamaranTrip.price).toBe(50);
    expect(sharedTripOffer("en").price).toBe(50);
    expect(sharedTripOffer("en").priceSpecification.unitText).toBe("person");
  });
  it("is a two-hour Bali trip departing Puerto Banús", () => {
    expect(sharedCatamaranTrip.durationHours).toBe(2);
    expect(sharedCatamaranTrip.boatSlug).toBe("catamaran-bali-4");
    expect(sharedCatamaranTrip.location.id).toBe("puerto-banus");
  });
  it("limits ticket guest selections to 1 through 10", () => {
    expect(sharedCatamaranTrip.maxGuests).toBe(10);
    expect(() => sharedTripMessage("en", "", 10)).not.toThrow();
    expect(() => sharedTripMessage("en", "", 11)).toThrow();
    expect(() => sharedTripMessage("en", "", 0)).toThrow();
  });
  it("lists the six shared-trip inclusions in the exact order shown on site", () => {
    expect(sharedCatamaranTrip.includes.map((item) => item.en)).toEqual([
      "Professional skipper",
      "Welcome drinks (water & soft drinks)",
      "Swim stop (weather permitting)",
      "Paddle board & snorkel gear",
      "Music on board",
      "Dolphin spotting along the coast (sightings not guaranteed)",
    ]);
  });
  it("states the meeting point, pay-on-the-day rule and towel note in all four languages", () => {
    expect(sharedCatamaranTrip.meetingPoint.en).toBe("Meeting point: Pontoon 5, next to Michael Kors, Puerto Banús");
    expect(sharedCatamaranTrip.meetingPoint.es).toContain("Pontón 5");
    expect(sharedCatamaranTrip.meetingPoint.fr).toContain("Pontoon 5");
    expect(sharedCatamaranTrip.meetingPoint.de).toContain("Pontoon 5");
    for (const lang of ["en", "es", "fr", "de"] as const) {
      expect(sharedCatamaranTrip.payment[lang]).toMatch(/prepayment|pago anticipado|prépaiement|Vorauszahlung/);
      expect(sharedCatamaranTrip.bring[lang].length).toBeGreaterThan(10);
      expect(sharedCatamaranTrip.sunset[lang]).toMatch(/sunset|atardecer|coucher du soleil|Sonnenuntergang/i);
    }
  });
  it("routes all four ticket booking languages to Banús Charters with the actual selection", () => {
    for (const lang of ["en", "es", "fr", "de"] as const) {
      const url = new URL(sharedTripBookingUrl(lang, "2026-10-25", 3));
      expect(url.origin + url.pathname).toBe("https://wa.me/34664575058");
      expect(url.searchParams.get("text")).toBe(sharedTripMessage(lang, "2026-10-25", 3));
      expect(url.searchParams.get("text")).toContain("3");
      expect(url.searchParams.get("text")).toContain("25");
      expect(url.searchParams.get("text")).toContain("Puerto Banús");
    }
  });
});