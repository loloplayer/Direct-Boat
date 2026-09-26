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
- Catamarán Bali 4.0, max 10 guests plus crew, 12.50m, 2x40 CV Volvo. Private: 2h €709; 3h €945; 4h €1087; 6h €1654; 8h €2127. Shared ticket: 2h €76.50/person at 10:00, 13:00 or 16:00. Includes captain & crew, rosé, cava, beer, soft drinks, water, paddle surf, snorkel, towels, Bluetooth music and fuel.
- Azimut 39 Fly, max 10 guests, 12.30m. 1h €423; 2h €603; 3h €783; 4h €963; 6h €1413; 8h €1683. Includes captain, champagne, white wine, selected drinks, paddle surf and insurance.
- Rinker 296 Captiva, max 10 guests, 9.4m. 1h €225; 2h €360; 3h €540; 4h €720; 5h €855; 6h €990; 7h €1125; 8h €1260. Includes captain, welcome drink, stereo, fuel and VAT.
- Sea Ray Sundancer 540, max 12 guests plus crew, 16.7m. 2h €900; 4h €1620; 6h €2070; 8h €2520. Includes captain & crew, fruit and snacks, cava, wine, beer, soft drinks, SUP, snorkel, towels and sound system.
- Jet Ski, 1–2 guests, 130 CV. 30 min €108; 1h €170. Includes safety equipment and briefing.
Experiences: sunset cruises, birthdays/bachelor/bachelorette parties, family days, corporate events and Jet Ski.
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
      system: `You are the Banús Charters concierge. Reply only in ${lang === "es" ? "Spanish" : lang === "fr" ? "French" : "English"}. Be concise, warm and expert. Recommend only from the authoritative fleet below based on group size, budget and occasion. Never invent or estimate prices, inclusions or availability. Say prices are from-prices. Availability and bookings must always be confirmed by the Banús Charters team on WhatsApp. Banús Charters is a booking intermediary; charters are operated and insured by licensed boat companies. When useful, ask one focused question. Never claim a booking is confirmed.\n${fleet}`,
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