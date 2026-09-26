const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;
  let resolveRunId: (value: string | undefined) => void = () => {};
  let settled = false;
  const ready = new Promise<string | undefined>((resolve) => { resolveRunId = resolve; });
  const publish = (value?: string) => {
    if (!runId && value?.trim()) runId = value.trim();
    if (!settled) { settled = true; resolveRunId(runId); }
  };
  if (runId) publish(runId);
  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
      try { const response = await fetch(input, { ...init, headers }); publish(response.headers.get(LOVABLE_AIG_RUN_ID_HEADER) ?? undefined); return response; }
      catch (error) { publish(); throw error; }
    },
    getRunId: () => runId,
    waitForRunId: () => runId ? Promise.resolve(runId) : ready,
  };
}

export function getLovableAiGatewayRunId(request: Request) { return request.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || undefined; }

export async function withLovableAiGatewayRunIdHeader(response: Response, gateway: ReturnType<typeof createLovableAiGatewayRunIdFetch>, init?: HeadersInit) {
  const headers = new Headers(response.headers);
  new Headers(init).forEach((value, name) => headers.set(name, value));
  const runId = gateway.getRunId() ?? await gateway.waitForRunId();
  if (runId) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
  headers.set("Access-Control-Expose-Headers", "X-Lovable-AIG-Run-ID");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}