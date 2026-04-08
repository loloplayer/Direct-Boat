

## Plan: Actualizar contacto de todas las embarcaciones

Cambio directo en dos archivos para establecer el mismo email y WhatsApp en todas las embarcaciones.

### Cambios

**1. `src/components/FleetSection.tsx`** — Actualizar el array `fleet` (línea ~18):
- Todas las embarcaciones: `whatsapp: "34667266164"`, `email: "marbellaoceanboats@gmail.com"`

**2. `src/components/BookingSection.tsx`** — Actualizar el array `vessels`:
- Mismo cambio: `whatsapp: "34667266164"`, `email: "marbellaoceanboats@gmail.com"` en cada embarcación

**3. `src/components/CTASection.tsx`** — Actualizar la constante `WHATSAPP_NUMBER`:
- Cambiar a `"34667266164"`

Cuando quieras asignar un número diferente a cada barco, solo tendrás que editar estos mismos campos individualmente.

