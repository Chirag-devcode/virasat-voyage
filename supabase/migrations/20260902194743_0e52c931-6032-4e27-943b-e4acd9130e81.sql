CREATE TABLE public.heritage_master (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  name text,
  category text,
  subcategory text,
  state_ut text,
  region text,
  era_period text,
  short_description text,
  cultural_significance text,
  unesco_status text,
  languages text[],
  best_for_module text[],
  tags text[],
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.heritage_master TO anon, authenticated;
GRANT ALL ON public.heritage_master TO service_role;
ALTER TABLE public.heritage_master ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read heritage_master" ON public.heritage_master FOR SELECT USING (true);

CREATE TABLE public.states_uts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_ut text,
  capital text,
  region text,
  major_languages text[],
  signature_heritage text,
  major_festivals text[],
  signature_crafts text[],
  signature_performing_arts text[],
  cuisine_highlights text[],
  heritage_tourism_anchors text[],
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.states_uts TO anon, authenticated;
GRANT ALL ON public.states_uts TO service_role;
ALTER TABLE public.states_uts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read states_uts" ON public.states_uts FOR SELECT USING (true);

CREATE TABLE public.monuments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  name text,
  city_district text,
  state_ut text,
  approx_period text,
  architecture_style text,
  historical_context text,
  cultural_value text,
  story_hook text,
  narration_seed text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.monuments TO anon, authenticated;
GRANT ALL ON public.monuments TO service_role;
ALTER TABLE public.monuments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read monuments" ON public.monuments FOR SELECT USING (true);

CREATE TABLE public.festivals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  name text,
  state_region text,
  community_context text,
  season text,
  key_practices text[],
  foods text[],
  music_dance text[],
  why_it_matters text,
  visitor_experience text,
  sustainability_note text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.festivals TO anon, authenticated;
GRANT ALL ON public.festivals TO service_role;
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read festivals" ON public.festivals FOR SELECT USING (true);

CREATE TABLE public.crafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  name text,
  state_region text,
  material text,
  technique text,
  community_context text,
  product_examples text[],
  cultural_significance text,
  challenges text,
  how_website_helps text,
  gi_recognition text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.crafts TO anon, authenticated;
GRANT ALL ON public.crafts TO service_role;
ALTER TABLE public.crafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read crafts" ON public.crafts FOR SELECT USING (true);

CREATE TABLE public.dances_music (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  name text,
  type text,
  state_region text,
  performance_context text,
  key_features text,
  instruments_costume text,
  cultural_meaning text,
  unesco_status text,
  module text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.dances_music TO anon, authenticated;
GRANT ALL ON public.dances_music TO service_role;
ALTER TABLE public.dances_music ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read dances_music" ON public.dances_music FOR SELECT USING (true);

CREATE TABLE public.oral_vault (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  tradition text,
  state_region text,
  language text,
  genre text,
  core_theme text,
  summary text,
  transmission_method text,
  sensitivity_note text,
  audio_guidelines text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.oral_vault TO anon, authenticated;
GRANT ALL ON public.oral_vault TO service_role;
ALTER TABLE public.oral_vault ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read oral_vault" ON public.oral_vault FOR SELECT USING (true);

CREATE TABLE public.cultural_trails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  name text,
  state_region text,
  theme text,
  stops text[],
  ideal_duration text,
  best_season text,
  highlights text,
  livelihood_angle text,
  travel_notes text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cultural_trails TO anon, authenticated;
GRANT ALL ON public.cultural_trails TO service_role;
ALTER TABLE public.cultural_trails ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cultural_trails" ON public.cultural_trails FOR SELECT USING (true);

CREATE TABLE public.guru_shishya (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  tradition text,
  state_region text,
  art_craft text,
  guru_role text,
  shishya_path text,
  skills_passed_down text[],
  digital_features text,
  safeguarding_need text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.guru_shishya TO anon, authenticated;
GRANT ALL ON public.guru_shishya TO service_role;
ALTER TABLE public.guru_shishya ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read guru_shishya" ON public.guru_shishya FOR SELECT USING (true);

CREATE TABLE public.unesco_ich (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year integer,
  element text,
  state_region text,
  category text,
  description text,
  inscription_note text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.unesco_ich TO anon, authenticated;
GRANT ALL ON public.unesco_ich TO service_role;
ALTER TABLE public.unesco_ich ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read unesco_ich" ON public.unesco_ich FOR SELECT USING (true);

CREATE TABLE public.content_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  module text,
  title text,
  subtitle text,
  body_copy text,
  cta text,
  state_region text,
  category text,
  image_search_query text,
  priority integer,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.content_cards TO anon, authenticated;
GRANT ALL ON public.content_cards TO service_role;
ALTER TABLE public.content_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read content_cards" ON public.content_cards FOR SELECT USING (true);

CREATE TABLE public.did_you_know (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text,
  topic text,
  fact text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.did_you_know TO anon, authenticated;
GRANT ALL ON public.did_you_know TO service_role;
ALTER TABLE public.did_you_know ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read did_you_know" ON public.did_you_know FOR SELECT USING (true);