Project code rule: Keep vessel specifications, imagery and booking context in src/data/siteData.ts, with every editable price centralized in src/data/fleet.ts, to prevent cross-page drift.
Project architecture rule: Public routes are language-prefixed (/en, /es, /fr); the route language is the source of truth for navigation and copy.
Project security rule: Public lead forms may insert validated rows but never select lead data; AI credentials and prompts stay in an Edge Function.
- Location rule: Every vessel and water activity carries a centralized exact service location used consistently by UI, booking messages, structured data, and AI recommendations.
