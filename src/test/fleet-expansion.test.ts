import { describe, expect, it } from "vitest";
import { boats, getBoat, waterActivities, privateCharterIncludes } from "../data/siteData";
import * as catalog from "../data/siteData";
import * as prices from "../data/fleet";
import { fleetPrices, activityPrices } from "../data/fleet";
import { publicRoutes, generateSitemap } from "../data/routes";
import { boatBookingUrl } from "../lib/boatBooking";
import { fleetKnowledge } from "../../scripts/fleet-knowledge";

describe("November fleet rules", () => {
  it("sets the Sundancer rates, capacity, length and exact departure", () => {
    const boat = getBoat("sea-ray-sundancer-540");
    expect(boat?.prices.map(p => p.price)).toEqual([1000,1800,2300,2800]);
    expect(boat?.maxGuests).toBe(12);
    expect(boat?.length).toBe("16 m");
    expect(boat?.location.address.en).toBe("Pontoon 5, Puerto Banús, Marbella");
  });
  it("sets the affordable Sea Ray rates and eight-guest limit", () => {
    const boat = getBoat("sea-ray-260");
    expect(boat?.prices.map(p => p.price)).toEqual([250,370,450,550]);
    expect(boat?.maxGuests).toBe(8);
    expect(boat?.affordable).toBe(true);
    expect(Math.min(...boats.flatMap(b => b.prices.map(p => p.price)))).toBe(250);
  });
  it("preserves all existing private boat prices", () => {
    expect(fleetPrices["catamaran-bali-4"].map(p => p.price)).toEqual([750,1000,1150,1750,2250]);
    expect(fleetPrices["azimut-39-fly"].map(p => p.price)).toEqual([450,650,850,1100,1550,1850]);
    expect(fleetPrices["princess-v48-wow"].map(p => p.price)).toEqual([1200,1500,1900,2250,2500,2750,2950]);
  });
  it("removes the non-private catamaran product and rate from the catalog", () => {
    expect(catalog).not.toHaveProperty("sharedCatamaranTrip");
    expect(prices).not.toHaveProperty("sharedTripPrice");
    expect(boats.map(boat => boat.slug)).toEqual(["catamaran-bali-4", "azimut-39-fly", "princess-v48-wow", "sea-ray-sundancer-540", "sea-ray-260"]);
    expect(publicRoutes.some(route => /shared|ticket|compartid|partag|geteilt/i.test(route))).toBe(false);
  });
  it("shares the requested included services across all private boats", () => {
    expect(privateCharterIncludes.map(i => i.en)).toEqual(["Skipper and crew", "Fuel", "Water", "Soft drinks and two bottles of cava", "Snacks and crisps", "Towels", "Paddle board", "Snorkelling gear", "Bluetooth music"]);
    for (const boat of boats) expect(boat.includes).toEqual(privateCharterIncludes);
  });
  it("removes Jet Ski products, prices, routes and assistant offers", () => {
    expect(waterActivities.map(a => a.id)).toEqual(["parasailing", "towables", "watersports", "eco"]);
    expect(Object.keys(activityPrices)).toEqual(["parasailing", "towables", "watersports", "eco"]);
    expect(publicRoutes.some(route => /jet.?ski/i.test(route))).toBe(false);
    expect(generateSitemap()).not.toMatch(/jet.?ski/i);
    expect(fleetKnowledge).not.toMatch(/jet.?ski|EUR 200 per hour/i);
  });
  it.each(["en", "es", "fr", "de"] as const)("registers and books additions in %s", lang => {
    for (const slug of ["sea-ray-sundancer-540", "sea-ray-260"]) {
      expect(publicRoutes).toContain(`/${lang}/fleet/${slug}`);
      const boat = getBoat(slug);
      if (!boat) throw new Error("Boat missing");
      expect(boatBookingUrl(lang,boat,boat.prices[0],2)).toMatch(/^https:\/\/wa.me\/34600637118\?text=/);
    }
  });
  it("generates assistant facts from central data", () => {
    expect(fleetKnowledge).toContain("Sea Ray Sundancer 540");
    expect(fleetKnowledge).toContain("1 hour EUR 250");
    expect(fleetKnowledge).not.toContain("bottles of champagne");
  });
});