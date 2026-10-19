# Four-language search expansion

## Deliverables
- Add natural German (Sie-form) throughout existing pages, navigation, boat/activity labels, WhatsApp messages and the concierge.
- Add six useful search-intent pages in English, Spanish, French and German, with localized URLs, existing real photos, centralized prices and footer links.
- Add complete business, boat offers and breadcrumb structured data; retain existing FAQ schema and include requested landing-page FAQs.
- Generate route-specific HTML during every production build so each public page contains its own metadata and readable content without JavaScript.
- Expand the sitemap to all four languages with correct cross-language alternatives.

## Boundaries and assumptions
- Preserve the current design, fleet, prices, WhatsApp booking and partner referral flow. Leave all reels/social assets untouched.
- Dolphin sightings are never guaranteed; “15 minutes” is approximate, not a promise. Weather and season guidance will be qualified.
- Use page-specific modification dates only when a significant content change is known; omit unverified dates rather than stamp every URL with the build date.
- No social profiles will be invented: include only existing verified links.
- Search rankings cannot be guaranteed. These changes reach the public domain after publishing; publication has not been explicitly requested in this message.

## Technical approach
- Keep localized fleet facts in `siteData.ts` and editable prices in `fleet.ts`; introduce a shared localized landing-page catalog and route registry.
- Use the existing React/Helmet layout and language-prefixed routing, extended to German and localized landing slugs.
- Add a bounded Vite production prerender step that emits static route HTML plus multilingual sitemap from the same route registry, without a persistent server or framework migration.
- Verify generated HTML, all public routes, German WhatsApp messages, language switching and desktop/mobile layout; deploy the concierge language update.