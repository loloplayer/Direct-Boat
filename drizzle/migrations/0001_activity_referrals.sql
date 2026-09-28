CREATE TABLE public.activity_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ref_code text NOT NULL UNIQUE,
  activity text,
  lang text,
  page text,
  referrer text,
  user_agent text
);
GRANT INSERT ON public.activity_referrals TO anon, authenticated;
GRANT ALL ON public.activity_referrals TO service_role;
ALTER TABLE public.activity_referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a referral" ON public.activity_referrals FOR INSERT TO anon, authenticated
WITH CHECK (char_length(ref_code) BETWEEN 4 AND 12 AND char_length(coalesce(activity,'')) <= 200 AND char_length(coalesce(page,'')) <= 300 AND char_length(coalesce(referrer,'')) <= 1000 AND char_length(coalesce(user_agent,'')) <= 500 AND coalesce(lang,'en') IN ('en','es','fr'));