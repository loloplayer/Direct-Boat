import { describe, expect, it } from "vitest";
import { boats, getBoat, jetSkiRide, jetSkiAddon, privateCharterIncludes, sharedCatamaranTrip } from "../data/siteData";
import { fleetPrices } from "../data/fleet";
import { publicRoutes } from "../data/routes";
import { activityBookingUrl, activityOffers } from "../lib/activityBooking";
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
  it("preserves all existing boat and shared ticket prices", () => {
    expect(fleetPrices["catamaran-bali-4"].map(p => p.price)).toEqual([750,1000,1150,1750,2250]);
    expect(fleetPrices["azimut-39-fly"].map(p => p.price)).toEqual([450,650,850,1100,1550,1850]);
    expect(fleetPrices["princess-v48-wow"].map(p => p.price)).toEqual([1200,1500,1900,2250,2500,2750,2950]);
    expect(sharedCatamaranTrip.price).toBe(50);
  });
  it("shares the requested included services across all private boats", () => {
    expect(privateCharterIncludes.map(i => i.en)).toEqual(["Skipper and crew", "Fuel", "Water", "Soft drinks and two bottles of cava", "Snacks and crisps", "Towels", "Paddle board", "Snorkelling gear", "Bluetooth music"]);
    for (const boat of boats) expect(boat.includes).toEqual(privateCharterIncludes);
  });
  it("enforces the Jet Ski age, capacity, licence and price rules", () => {
    expect(jetSkiRide.minimumAge).toBe(18);
    expect(jetSkiRide.maxPeople).toBe(2);
    expect(jetSkiRide.licenceRequired).toBe(false);
    expect(jetSkiRide.prices.map(p => p.price)).toEqual([110,180]);
    expect(jetSkiAddon.price).toBe(200);
    expect(activityOffers(jetSkiRide,"en").map(o => o.price)).toEqual([110,180]);
  });
  it.each(["en", "es", "fr", "de"] as const)("registers and books additions in %s", lang => {
    for (const slug of ["sea-ray-sundancer-540", "sea-ray-260"]) {
      expect(publicRoutes).toContain(`/${lang}/fleet/${slug}`);
      const boat = getBoat(slug);
      if (!boat) throw new Error("Boat missing");
      expect(boatBookingUrl(lang,boat,boat.prices[0],2)).toMatch(/^https:\/\/wa.me\/34664575058\?text=/);
    }
    expect(publicRoutes).toContain(`/${lang}/activities/jet-ski`);
    const url = activityBookingUrl(lang,jetSkiRide,jetSkiRide.prices[0].label[lang],"2","2026-11-20");
    expect(url).toMatch(/^https:\/\/wa.me\/34664575058\?text=/);
    expect(decodeURIComponent(url)).toContain(jetSkiRide.title[lang]);
  });
  it("generates assistant facts from central data", () => {
    expect(fleetKnowledge).toContain("Sea Ray Sundancer 540");
    expect(fleetKnowledge).toContain("1 hour EUR 250");
    expect(fleetKnowledge).toContain("EUR 200 per hour");
    expect(fleetKnowledge).toContain("minimum age 18");
    expect(fleetKnowledge).not.toContain("bottles of champagne");
  });
});