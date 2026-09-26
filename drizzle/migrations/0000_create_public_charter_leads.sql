CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  language text NOT NULL CHECK (language IN ('en', 'es', 'fr')),
  source text NOT NULL DEFAULT 'website' CHECK (char_length(source) <= 80),
  boat_slug text NOT NULL CHECK (char_length(boat_slug) <= 100),
  requested_date date NOT NULL,
  duration text NOT NULL CHECK (char_length(duration) <= 80),
  guests integer NOT NULL CHECK (guests BETWEEN 1 AND 24),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 40),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1000)
);
GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking request"
ON public.booking_requests FOR INSERT TO anon, authenticated
WITH CHECK (
  language IN ('en', 'es', 'fr')
  AND guests BETWEEN 1 AND 24
  AND char_length(name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 254
  AND char_length(phone) BETWEEN 5 AND 40
);

CREATE TABLE public.chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  session_id text NOT NULL CHECK (char_length(session_id) BETWEEN 8 AND 120),
  language text NOT NULL CHECK (language IN ('en', 'es', 'fr')),
  name text CHECK (name IS NULL OR char_length(name) <= 120),
  contact text CHECK (contact IS NULL OR char_length(contact) <= 254),
  boat_interest text CHECK (boat_interest IS NULL OR char_length(boat_interest) <= 120),
  requested_date text CHECK (requested_date IS NULL OR char_length(requested_date) <= 80),
  summary text CHECK (summary IS NULL OR char_length(summary) <= 1000)
);
GRANT INSERT ON public.chat_leads TO anon, authenticated;
GRANT ALL ON public.chat_leads TO service_role;
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a chat lead"
ON public.chat_leads FOR INSERT TO anon, authenticated
WITH CHECK (
  language IN ('en', 'es', 'fr')
  AND char_length(session_id) BETWEEN 8 AND 120
  AND (name IS NOT NULL OR contact IS NOT NULL OR boat_interest IS NOT NULL OR requested_date IS NOT NULL)
);