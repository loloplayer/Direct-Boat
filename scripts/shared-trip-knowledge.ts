import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { sharedCatamaranTrip as trip } from "../src/data/siteData";

export async function writeSharedTripKnowledge(root: string) {
  const knowledge = `Shared catamaran trip (per-ticket, not a private charter): ${trip.boatName}, departing ${trip.location.name.en}. ${trip.durationHours}-hour shared trip with other guests, max ${trip.maxGuests} guests total. Low-season price: EUR ${trip.price} per person, VAT included. Includes ${trip.includes.map((item) => item.en).join(", ")}. ${trip.meetingPoint.en}. ${trip.payment.en}. Sunset departures available on request. ${trip.bring.en} Guests may bring their own food and drinks. Departure times on request, confirmed by Banús Charters on WhatsApp +34 664 57 50 58 depending on availability. Suggest for couples, small groups and budget requests; never confuse the ticket price with private charter prices. Do not guarantee availability. Never guarantee dolphin sightings.`;
  await writeFile(resolve(root, "supabase/functions/charter-chat/shared-trip.generated.ts"), `// Generated from siteData and fleet prices; do not edit.\nexport const sharedTripKnowledge = ${JSON.stringify(knowledge)};\n`);
}