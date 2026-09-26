# Update Bali and Azimut fleet data

## Scope
- Update the central prices for Catamaran Bali 4.0 and Azimut 39 Fly with the supplied VAT-inclusive amounts; leave Rinker 296 and Sea Ray 540 unchanged.
- Update Bali to 12 guests plus crew, 12.50 m length, 7.00 m beam, 2×40 HP Volvo, 4 cabins, and 4 electric toilets.
- Replace both boats’ included-item lists exactly as supplied, translated for English, Spanish, and French. Mark limited drinks/quantities clearly.
- Remove the Bali per-person ticket option and its unused shared-ticket data.

## Customer-facing behavior
- Add a localized “VAT included” note to every boat’s duration price table.
- Keep each boat card’s “from” price derived from its first central price entry.
- Keep booking duration choices derived from the same central price entries, so Bali and Azimut immediately show the new durations and amounts.
- Add the Bali electric-toilet specification to its specification grid.

## Structured data and assistant
- Keep each boat’s JSON-LD offers generated from the central duration prices and identify VAT as included in each offer description.
- Update the charter assistant’s authoritative fleet knowledge with the new Bali and Azimut prices, specifications, capacities, inclusions, and VAT status; remove the shared-ticket information.
- Do not add any boat-owner company name, phone number, email, or website.

## Verification and release
- Search for stale Bali/Azimut prices, the removed ticket option, and excluded owner contact details.
- Check English, Spanish, and French boat pages, price tables, “from” prices, booking choices, and JSON-LD in the running site.
- Validate the assistant endpoint, confirm the project builds cleanly, then publish the updated site.

## Technical details
- Editable prices remain exclusively in `src/data/fleet.ts`; vessel specifications and inclusions remain in `src/data/siteData.ts`.
- Add only the minimum localized label needed for electric toilets and VAT-inclusive pricing.
- Redeploy the existing charter assistant function after updating its server-side knowledge.
