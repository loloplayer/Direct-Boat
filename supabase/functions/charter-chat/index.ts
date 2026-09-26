import { createOpenAI } from "npm:@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "npm:ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "../_shared/run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const fleet = `
Authoritative fleet and pricing:
- Catamarán Bali 4.0 (2020), at Puerto Banús, max 12 guests plus crew, 12.50m long, 7.00m beam, 2x40 HP Volvo, 4 cabins, 4 electric WC. Private: 2h €750; 3h €1000; 4h €1150; 6h €1750; 8h €2250. Includes limited water and soft drinks, 1 bottle of rosé wine, limited beer, 2 bottles of cava, limited chips, towels, paddle surf, snorkel, Bluetooth music, captain & crew, and fuel.
- Azimut 39 Fly, at Puerto Banús, max 10 guests, 12.30m, flybridge. 1h €450; 2h €650; 3h €850; 4h €1100; 6h €1550; 8h €1850. Includes captain, 2 bottles of champagne, 2 bottles of white wine, limited drinks, paddle surf and insurance.
- Rinker 296 Captiva, at Puerto Banús, max 10 guests, 9.4m. €250 per hour for 1–8 hours, VAT included. Multiply €250 by the requested number of hours. Includes captain, welcome drink, stereo, fuel and VAT.
- Sea Ray Sundancer 540, at Puerto Banús, max 12 guests plus crew, 16.7m. €1000 per hour for 1–8 hours, VAT included. Multiply €1000 by the requested number of hours. Includes captain & crew, fruit and snacks, cava, wine, beer, soft drinks, SUP, snorkel, towels and sound system.
- Cruisers Yachts 39, at Puerto Deportivo de Marbella (Marbella town centre marina), max 12 guests. 1h €400; 2h €600; 3h €800; 4h €1000; 6h €1500; 8h €1800. Includes skipper, drinks and snacks.
- Saxdor 200 Sport, at Puerto Deportivo de Marbella (Marbella town centre marina), max 6 guests. 1h €280; 2h €400; 3h €550; 4h €650; 6h €900; 8h €1200. Includes skipper, drinks and snacks.
Water activities — ALL at The Point beach, Marbella centre, 15 min from Puerto Banús:
- Jet ski circuit: 20m €70, 30m €95, 45m €140, 1h €170. Jet ski tour: 1h €170 per jet ski, minimum 2 jet skis. Spark/Spark Trixx: 20m €80, 30m €105, 45m €150, 1h €180. Super Jet: 20m €70, 30m €95, 45m €140, 1h €170.
- Parasailing: 1 person €80, 2 €120, 3 €160. Towables (Crazy Sofa, Banana, Airstream, Crazy Bull, Flyfish Extreme, Crazy Octopus): 15m €25 per person. Watersports (Flyboard, water ski, wakeboard, knee board): 15m €75 per person. Eco activities (SUP, pedal boat, kayak, SUP Yoga): €35 per hour; SUP Yoga minimum 2 people.
Experiences: sunset cruises, birthdays/bachelor/bachelorette parties, family days, corporate events.
All listed prices include VAT.
Policies: the meeting point is the exact location listed for each boat or activity; a deposit confirms and the balance is paid on board; if the captain cancels for weather/safety, free rescheduling or a full deposit refund; children are welcome within capacity and captain guidance; food/drink policy varies by boat.
`;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: cors });
  if (request.method !== "POST") return Response.json({ message: "Method not allowed" }, { status: 405, headers: cors });
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return Response.json({ message: "AI service is not configured." }, { status: 401, headers: cors });
  try {
    const body = await request.json() as { messages?: UIMessage[]; language?: "en" | "es" | "fr" };
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 40) return Response.json({ message: "Please send a valid conversation." }, { status: 400, headers: cors });
    const lang = body.language === "es" || body.language === "fr" ? body.language : "en";
    const run = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
    const provider = createOpenAI({ baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" }, fetch: run.fetch });
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: `You are the Banús Charters concierge. Reply only in ${lang === "es" ? "Spanish" : lang === "fr" ? "French" : "English"}. Be concise, warm and expert. Recommend only from the authoritative fleet and activities below based on group size, budget and occasion. Always state the exact location whenever recommending. Never invent or estimate prices, inclusions or availability. Availability and bookings must always be confirmed by the Banús Charters team on WhatsApp. Banús Charters is a booking intermediary; charters are operated and insured by licensed boat companies. When useful, ask one focused question. Never claim a booking is confirmed.\n${fleet}`,
      messages: await convertToModelMessages(body.messages),
      abortSignal: request.signal,
      providerOptions: { openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] } },
    });
    const response = result.toUIMessageStreamResponse({ originalMessages: body.messages, sendReasoning: true, onError: (error) => error instanceof Error ? error.message : "The concierge could not respond." });
    return withLovableAiGatewayRunIdHeader(response, run, cors);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The concierge could not respond.";
    return Response.json({ message }, { status: 400, headers: cors });
  }
});