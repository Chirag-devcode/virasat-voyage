import { supabase } from "@/integrations/supabase/client";
import type {
  ContentCard,
  Craft,
  CulturalTrail,
  DanceMusic,
  DidYouKnow,
  Festival,
  GuruShishyaProfile,
  HeritageMaster,
  Monument,
  OralStory,
  StateUT,
  UnescoIch,
} from "@/types/database";

/** Options shared by every list query. */
export interface QueryOptions {
  /** Match a state / region (case-insensitive contains). */
  state?: string;
  /** Match a category-like column exactly. */
  category?: string;
  /** Match a language (array or text column). */
  language?: string;
  /** Free-text search across the table's searchable columns. */
  search?: string;
  limit?: number;
}

type Spec = {
  table: string;
  stateCol: string;
  categoryCol?: string;
  languageCol?: string;
  languageIsArray?: boolean;
  searchCols: string[];
  orderBy: string;
};

const SPECS = {
  heritage_master: {
    table: "heritage_master",
    stateCol: "state_ut",
    categoryCol: "category",
    languageCol: "languages",
    languageIsArray: true,
    searchCols: ["name", "short_description", "cultural_significance", "subcategory"],
    orderBy: "code",
  },
  states_uts: {
    table: "states_uts",
    stateCol: "state_ut",
    categoryCol: "region",
    searchCols: ["state_ut", "capital", "signature_heritage"],
    orderBy: "state_ut",
  },
  monuments: {
    table: "monuments",
    stateCol: "state_ut",
    categoryCol: "architecture_style",
    searchCols: ["name", "city_district", "historical_context", "story_hook"],
    orderBy: "code",
  },
  festivals: {
    table: "festivals",
    stateCol: "state_region",
    categoryCol: "season",
    searchCols: ["name", "community_context", "why_it_matters", "visitor_experience"],
    orderBy: "code",
  },
  crafts: {
    table: "crafts",
    stateCol: "state_region",
    categoryCol: "material",
    searchCols: ["name", "technique", "cultural_significance", "community_context"],
    orderBy: "code",
  },
  dances_music: {
    table: "dances_music",
    stateCol: "state_region",
    categoryCol: "type",
    searchCols: ["name", "key_features", "cultural_meaning", "performance_context"],
    orderBy: "code",
  },
  oral_vault: {
    table: "oral_vault",
    stateCol: "state_region",
    categoryCol: "genre",
    languageCol: "language",
    searchCols: ["tradition", "summary", "core_theme", "genre"],
    orderBy: "code",
  },
  cultural_trails: {
    table: "cultural_trails",
    stateCol: "state_region",
    categoryCol: "theme",
    searchCols: ["name", "theme", "highlights", "travel_notes"],
    orderBy: "code",
  },
  guru_shishya: {
    table: "guru_shishya",
    stateCol: "state_region",
    categoryCol: "art_craft",
    searchCols: ["tradition", "art_craft", "guru_role", "shishya_path"],
    orderBy: "code",
  },
  unesco_ich: {
    table: "unesco_ich",
    stateCol: "state_region",
    categoryCol: "category",
    searchCols: ["element", "description", "inscription_note"],
    orderBy: "year",
  },
  content_cards: {
    table: "content_cards",
    stateCol: "state_region",
    categoryCol: "module",
    searchCols: ["title", "subtitle", "body_copy"],
    orderBy: "priority",
  },
  did_you_know: {
    table: "did_you_know",
    stateCol: "topic",
    categoryCol: "topic",
    searchCols: ["topic", "fact"],
    orderBy: "code",
  },
} satisfies Record<string, Spec>;

export type HeritageTable = keyof typeof SPECS;

const sel = (s: string): string => s;

async function fetchTable<T>(key: HeritageTable, opts: QueryOptions = {}): Promise<T[]> {
  const spec: Spec = SPECS[key];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q: any = (supabase.from as any)(spec.table).select(sel("*")).order(spec.orderBy, {
    ascending: true,
    nullsFirst: false,
  });

  if (opts.state && opts.state !== "All") q = q.ilike(spec.stateCol, `%${opts.state}%`);
  if (opts.category && opts.category !== "All" && spec.categoryCol) {
    q = q.ilike(spec.categoryCol, `%${opts.category}%`);
  }
  if (opts.language && opts.language !== "All" && spec.languageCol) {
    q = spec.languageIsArray
      ? q.contains(spec.languageCol, [opts.language])
      : q.ilike(spec.languageCol, `%${opts.language}%`);
  }
  if (opts.search?.trim()) {
    const term = opts.search.trim().replace(/[,%()]/g, " ");
    q = q.or(spec.searchCols.map((c) => `${c}.ilike.%${term}%`).join(","));
  }
  if (opts.limit) q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as T[];
}

export const getHeritage = (o?: QueryOptions) => fetchTable<HeritageMaster>("heritage_master", o);
export const getStates = (o?: QueryOptions) => fetchTable<StateUT>("states_uts", o);
export const getMonuments = (o?: QueryOptions) => fetchTable<Monument>("monuments", o);
export const getFestivals = (o?: QueryOptions) => fetchTable<Festival>("festivals", o);
export const getCrafts = (o?: QueryOptions) => fetchTable<Craft>("crafts", o);
export const getDancesMusic = (o?: QueryOptions) => fetchTable<DanceMusic>("dances_music", o);
export const getOralStories = (o?: QueryOptions) => fetchTable<OralStory>("oral_vault", o);
export const getCulturalTrails = (o?: QueryOptions) => fetchTable<CulturalTrail>("cultural_trails", o);
export const getGuruShishya = (o?: QueryOptions) => fetchTable<GuruShishyaProfile>("guru_shishya", o);
export const getUnescoIch = (o?: QueryOptions) => fetchTable<UnescoIch>("unesco_ich", o);
export const getContentCards = (o?: QueryOptions) => fetchTable<ContentCard>("content_cards", o);
export const getDidYouKnow = (o?: QueryOptions) => fetchTable<DidYouKnow>("did_you_know", o);

/** Distinct, sorted values of a column across rows — handy for filter chips. */
export function distinct<T>(rows: T[], pick: (row: T) => string | null | undefined): string[] {
  const set = new Set<string>();
  for (const r of rows) {
    const v = pick(r);
    if (v) v.split(/[;,/]/).forEach((p) => p.trim() && set.add(p.trim()));
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
