Project code rule: Keep vessel specifications, imagery and booking context in src/data/siteData.ts, with every editable price centralized in src/data/fleet.ts, to prevent cross-page drift.
Project architecture rule: Public routes are language-prefixed (/en, /es, /fr); the route language is the source of truth for navigation and copy.
Project security rule: Public lead forms may insert validated rows but never select lead data; AI credentials and prompts stay in an Edge Function.
- Location rule: Every vessel and water activity carries a centralized exact service location used consistently by UI, booking messages, structured data, and AI recommendations.
Project design-system rule: Use only the semantic Banús Charters tokens and the 2px/4px/12px radius scale, with one shared shadow, so every surface stays on-brand.
Project fleet-capacity rule: Store both localized capacity display copy and a numeric maxGuests value per vessel, so filters never parse translated labels.
