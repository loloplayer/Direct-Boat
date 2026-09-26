Project code rule: Keep all vessel specifications, pricing, imagery, booking logic, and assistant context in src/data/siteData.ts to prevent cross-page drift.
Project architecture rule: Public routes are language-prefixed (/en, /es, /fr); the route language is the source of truth for navigation and copy.
Project security rule: Public lead forms may insert validated rows but never select lead data; AI credentials and prompts stay in an Edge Function.
