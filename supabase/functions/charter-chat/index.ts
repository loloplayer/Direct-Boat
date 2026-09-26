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
- Catamarán Bali 4.0 (2020), max 12 guests plus crew, 12.50m long, 7.00m beam, 2x40 HP Volvo, 4 cabins, 4 electric WC. Private: 2h €750; 3h €1000; 4h €1150; 6h €1750; 8h €2250. Includes limited water and soft drinks, 1 bottle of rosé wine, limited beer, 2 bottles of cava, limited chips, towels, paddle surf, snorkel, Bluetooth music, captain & crew, and fuel.
- Azimut 39 Fly, max 10 guests, 12.30m, flybridge. 1h €450; 2h €650; 3h €850; 4h €1100; 6h €1550; 8h €1850. Includes captain, 2 bottles of champagne, 2 bottles of white wine, limited drinks, paddle surf and insurance.
- Rinker 296 Captiva, max 10 guests, 9.4m. €250 per hour for 1–8 hours, VAT included. Multiply €250 by the requested number of hours. Includes captain, welcome drink, stereo, fuel and VAT.
- Sea Ray Sundancer 540, max 12 guests plus crew, 16.7m. Price on request; never quote or estimate a price. Direct the guest to Banús Charters on WhatsApp to check availability and request a quote. Includes captain & crew, fruit and snacks, cava, wine, beer, soft drinks, SUP, snorkel, towels and sound system.
Experiences: sunset cruises, birthdays/bachelor/bachelorette parties, family days, corporate events.
All listed prices include VAT.
Policies: meet in Puerto Banús; a deposit confirms and the balance is paid on board; if the captain cancels for weather/safety, free rescheduling or a full deposit refund; children are welcome within capacity and captain guidance; food/drink policy varies by boat.
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
      system: `You are the Banús Charters concierge. Reply only in ${lang === "es" ? "Spanish" : lang === "fr" ? "French" : "English"}. Be concise, warm and expert. Recommend only from the authoritative fleet below based on group size, budget and occasion. Never invent or estimate prices, inclusions or availability. Sea Ray pricing is always on request: say so and hand off to WhatsApp. Availability and bookings must always be confirmed by the Banús Charters team on WhatsApp. Banús Charters is a booking intermediary; charters are operated and insured by licensed boat companies. When useful, ask one focused question. Never claim a booking is confirmed.\n${fleet}`,
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