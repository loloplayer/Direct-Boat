import { createOpenAI } from "npm:@ai-sdk/openai";
import { fleetKnowledge } from "./fleet.generated.ts";
import { sharedTripKnowledge } from "./shared-trip.generated.ts";
import { convertToModelMessages, streamText, type UIMessage } from "npm:ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "../_shared/run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const fleet = `
${fleetKnowledge}
Experiences: sunset cruises, birthdays/bachelor/bachelorette parties, family days, corporate events.
${sharedTripKnowledge}
All listed prices include VAT.
Policies: the meeting point is the exact location listed for each boat or activity; a deposit confirms and the balance is paid on board; if the captain cancels for weather/safety, free rescheduling or a full deposit refund; children are welcome within capacity and captain guidance; food/drink policy varies by boat.
`;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: cors });
  if (request.method !== "POST") return Response.json({ message: "Method not allowed" }, { status: 405, headers: cors });
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return Response.json({ message: "AI service is not configured." }, { status: 401, headers: cors });
  try {
    const body = await request.json() as { messages?: UIMessage[]; language?: "en" | "es" | "fr" | "de" };
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 40) return Response.json({ message: "Please send a valid conversation." }, { status: 400, headers: cors });
    const lang = body.language === "es" || body.language === "fr" || body.language === "de" ? body.language : "en";
    const run = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
    const provider = createOpenAI({ baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" }, fetch: run.fetch });
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: `You are the Banús Charters concierge. Always reply in the same language the guest used in their most recent message (for example: Spanish → Spanish, English → English, French → French, German → German, Italian → Italian, Dutch → Dutch). If the language of the message is unclear (e.g. only a number, emoji or a boat name), reply in ${lang === "de" ? "German (natural, polite Sie-form)" : lang === "es" ? "Spanish" : lang === "fr" ? "French" : "English"}. Be concise, warm and expert. Recommend only from the authoritative fleet and activities below based on group size, budget and occasion. Always state the exact location whenever recommending. Never invent or estimate prices, inclusions or availability. All private boats depart from Puerto Banús, with the exact meeting point stated in their data; availability and bookings are confirmed by Banús Charters on WhatsApp at +34 664 57 50 58. Water activities at The Point beach, Marbella centre, must be booked directly with The Point on WhatsApp +34 622 26 49 91, mentioning Banús Charters. Banús Charters is a booking intermediary; charters are operated and insured by licensed boat companies. When useful, ask one focused question. Never claim a booking is confirmed. In German, always use the polite Sie-form.\n${fleet}`,
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