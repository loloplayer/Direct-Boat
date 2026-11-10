import { describe, expect, it } from "vitest";
import { boats, WHATSAPP_NUMBER } from "../data/siteData";
import { businessSchema } from "../data/structuredData";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { boatBookingMessage, boatBookingUrl } from "../lib/boatBooking";
import { fleetKnowledge } from "../../scripts/fleet-knowledge";

describe("Business phone", () => {
  it("uses the new WhatsApp number", () => {
    expect(WHATSAPP_NUMBER).toBe("34600637118");
  });
  it.each(["en", "es", "fr", "de"] as const)("keeps booking messages intact at the new destination in %s", lang => {
    const message = "Booking date: 2026-11-20 · 2 guests";
    const url = new URL(getWhatsAppUrl(lang, message));
    expect(url.origin + url.pathname).toBe("https://wa.me/34600637118");
    expect(url.searchParams.get("text")).toBe(message);
    for (const boat of boats) {
      const option = boat.prices[0];
      if (!option) throw new Error("Missing boat price");
      const booking = new URL(boatBookingUrl(lang, boat, option, 2, "2026-11-20", "11:00"));
      expect(booking.pathname).toBe("/34600637118");
      expect(booking.searchParams.get("text")).toBe(boatBookingMessage(lang, boat, option, 2, "2026-11-20", "11:00"));
    }
  });
  it.each(["en", "es", "fr", "de"] as const)("uses the new displayed telephone in %s structured data", lang => {
    expect(businessSchema(lang).telephone).toBe("+34 600 63 71 18");
  });
  it("generates the new business handoff while preserving The Point", () => {
    expect(fleetKnowledge).toContain("Banús Charters WhatsApp +34 600 63 71 18 (https://wa.me/34600637118)");
    expect(fleetKnowledge).toContain("The Point WhatsApp +34 622 26 49 91");
  });
});