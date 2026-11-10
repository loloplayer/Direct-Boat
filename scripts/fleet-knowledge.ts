import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { boats, waterActivities } from "../src/data/siteData";

export const fleetKnowledge = [
  "Authoritative fleet and pricing:",
  "Private charter booking: Banús Charters WhatsApp +34 600 63 71 18 (https://wa.me/34600637118).",
  ...boats.map(boat => `${boat.name}: ${boat.type.en}, ${boat.length ?? "length not specified"}, max ${boat.maxGuests} guests${boat.slug === "catamaran-bali-4" ? " plus 2 crew" : ""}. Departure: ${boat.location.name.en}, ${boat.location.address.en}. Private prices: ${boat.prices.map(p => `${p.label.en} EUR ${p.price}`).join("; ")}. Includes ${boat.includes.map(i => i.en).join(", ")}.`),
  ...waterActivities.map(activity => `${activity.title.en}: ${activity.description.en} Location: ${activity.location.name.en}, ${activity.location.address.en}. Prices: ${activity.prices.map(p => `${p.label.en} EUR ${p.price}`).join("; ")}. Booking: ${activity.booking === "company" ? "Banús Charters WhatsApp +34 600 63 71 18" : "directly with The Point WhatsApp +34 622 26 49 91, mentioning Banús Charters"}.`),
  "Suggest Sea Ray 260 for small budgets and groups up to 8, Sea Ray Sundancer 540 for groups up to 12. All prices include VAT. Never guarantee availability.",
].join("\n");

export async function writeFleetKnowledge(root: string) {
  await writeFile(resolve(root, "supabase/functions/charter-chat/fleet.generated.ts"), `// Generated from central siteData and fleet prices; do not edit.\nexport const fleetKnowledge = ${JSON.stringify(fleetKnowledge)};\n`);
}