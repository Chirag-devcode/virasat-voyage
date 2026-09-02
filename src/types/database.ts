/** Types mirroring the Virasat cultural dataset tables in the backend. */

export interface BaseRow {
  id: string;
  created_at: string;
}

export interface HeritageMaster extends BaseRow {
  code: string | null;
  name: string | null;
  category: string | null;
  subcategory: string | null;
  state_ut: string | null;
  region: string | null;
  era_period: string | null;
  short_description: string | null;
  cultural_significance: string | null;
  unesco_status: string | null;
  languages: string[] | null;
  best_for_module: string[] | null;
  tags: string[] | null;
  source: string | null;
}

export interface StateUT extends BaseRow {
  state_ut: string | null;
  capital: string | null;
  region: string | null;
  major_languages: string[] | null;
  signature_heritage: string | null;
  major_festivals: string[] | null;
  signature_crafts: string[] | null;
  signature_performing_arts: string[] | null;
  cuisine_highlights: string[] | null;
  heritage_tourism_anchors: string[] | null;
  source: string | null;
}

export interface Monument extends BaseRow {
  code: string | null;
  name: string | null;
  city_district: string | null;
  state_ut: string | null;
  approx_period: string | null;
  architecture_style: string | null;
  historical_context: string | null;
  cultural_value: string | null;
  story_hook: string | null;
  narration_seed: string | null;
  source: string | null;
}

export interface Festival extends BaseRow {
  code: string | null;
  name: string | null;
  state_region: string | null;
  community_context: string | null;
  season: string | null;
  key_practices: string[] | null;
  foods: string[] | null;
  music_dance: string[] | null;
  why_it_matters: string | null;
  visitor_experience: string | null;
  sustainability_note: string | null;
  source: string | null;
}

export interface Craft extends BaseRow {
  code: string | null;
  name: string | null;
  state_region: string | null;
  material: string | null;
  technique: string | null;
  community_context: string | null;
  product_examples: string[] | null;
  cultural_significance: string | null;
  challenges: string | null;
  how_website_helps: string | null;
  gi_recognition: string | null;
  source: string | null;
}

export interface DanceMusic extends BaseRow {
  code: string | null;
  name: string | null;
  type: string | null;
  state_region: string | null;
  performance_context: string | null;
  key_features: string | null;
  instruments_costume: string | null;
  cultural_meaning: string | null;
  unesco_status: string | null;
  module: string | null;
  source: string | null;
}

export interface OralStory extends BaseRow {
  code: string | null;
  tradition: string | null;
  state_region: string | null;
  language: string | null;
  genre: string | null;
  core_theme: string | null;
  summary: string | null;
  transmission_method: string | null;
  sensitivity_note: string | null;
  audio_guidelines: string | null;
  source: string | null;
}

export interface CulturalTrail extends BaseRow {
  code: string | null;
  name: string | null;
  state_region: string | null;
  theme: string | null;
  stops: string[] | null;
  ideal_duration: string | null;
  best_season: string | null;
  highlights: string | null;
  livelihood_angle: string | null;
  travel_notes: string | null;
  source: string | null;
}

export interface GuruShishyaProfile extends BaseRow {
  code: string | null;
  tradition: string | null;
  state_region: string | null;
  art_craft: string | null;
  guru_role: string | null;
  shishya_path: string | null;
  skills_passed_down: string[] | null;
  digital_features: string | null;
  safeguarding_need: string | null;
  source: string | null;
}

export interface UnescoIch extends BaseRow {
  year: number | null;
  element: string | null;
  state_region: string | null;
  category: string | null;
  description: string | null;
  inscription_note: string | null;
  source: string | null;
}

export interface ContentCard extends BaseRow {
  code: string | null;
  module: string | null;
  title: string | null;
  subtitle: string | null;
  body_copy: string | null;
  cta: string | null;
  state_region: string | null;
  category: string | null;
  image_search_query: string | null;
  priority: number | null;
  source: string | null;
}

export interface DidYouKnow extends BaseRow {
  code: string | null;
  topic: string | null;
  fact: string | null;
  source: string | null;
}
