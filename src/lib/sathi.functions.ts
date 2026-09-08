/**
 * Virasat Sathi — grounded heritage answering.
 *
 * Retrieval-augmented: matching rows are pulled from the heritage dataset,
 * then the AI is asked to answer strictly from those rows and cite them.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  message: z.string().min(1).max(2000),
  language: z.string().default("English"),
  selectedState: z.string().nullable().optional(),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(4000) }))
    .max(12)
    .optional(),
});

export type SathiSource = { table: string; label: string; detail: string; source: string | null };
export type SathiAnswer = { answer: string; sources: SathiSource[] };

type Row = Record<string, unknown>;

const STOP = new Set([
  "about","tell","me","the","a","an","of","in","on","for","what","which","who","how","is","are","and",
  "to","my","i","can","you","please","give","some","more","its","it","there","do","does","with","from",
  "heritage","india","indian","information","know","want","find","show","list","near","best","famous",
]);

function keywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
    .slice(0, 6);
}

const str = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const list = (v: unknown) => (Array.isArray(v) ? v.map(String).join(", ") : str(v));

type TableSpec = {
  table: string;
  labelCol: string;
  stateCol: string;
  cols: string[];
  searchCols: string[];
};

const SPECS: TableSpec[] = [
  {
    table: "monuments",
    labelCol: "name",
    stateCol: "state_ut",
    cols: ["name", "city_district", "state_ut", "approx_period", "architecture_style", "historical_context", "cultural_value", "story_hook", "source"],
    searchCols: ["name", "city_district", "architecture_style", "historical_context", "cultural_value", "story_hook"],
  },
  {
    table: "crafts",
    labelCol: "name",
    stateCol: "state_region",
    cols: ["name", "state_region", "material", "technique", "community_context", "product_examples", "cultural_significance", "challenges", "gi_recognition", "source"],
    searchCols: ["name", "material", "technique", "community_context", "cultural_significance"],
  },
  {
    table: "festivals",
    labelCol: "name",
    stateCol: "state_region",
    cols: ["name", "state_region", "season", "community_context", "key_practices", "foods", "music_dance", "why_it_matters", "visitor_experience", "source"],
    searchCols: ["name", "community_context", "season", "why_it_matters", "visitor_experience"],
  },
  {
    table: "dances_music",
    labelCol: "name",
    stateCol: "state_region",
    cols: ["name", "type", "state_region", "performance_context", "key_features", "instruments_costume", "cultural_meaning", "unesco_status", "source"],
    searchCols: ["name", "type", "performance_context", "key_features", "cultural_meaning"],
  },
  {
    table: "oral_vault",
    labelCol: "tradition",
    stateCol: "state_region",
    cols: ["tradition", "state_region", "language", "genre", "core_theme", "summary", "transmission_method", "audio_guidelines", "sensitivity_note", "source"],
    searchCols: ["tradition", "language", "genre", "core_theme", "summary"],
  },
  {
    table: "cultural_trails",
    labelCol: "name",
    stateCol: "state_region",
    cols: ["name", "state_region", "theme", "stops", "ideal_duration", "best_season", "highlights", "travel_notes", "source"],
    searchCols: ["name", "theme", "highlights", "travel_notes"],
  },
  {
    table: "guru_shishya",
    labelCol: "tradition",
    stateCol: "state_region",
    cols: ["tradition", "state_region", "art_craft", "guru_role", "shishya_path", "skills_passed_down", "safeguarding_need", "source"],
    searchCols: ["tradition", "art_craft", "guru_role", "shishya_path"],
  },
  {
    table: "unesco_ich",
    labelCol: "element",
    stateCol: "state_region",
    cols: ["element", "year", "state_region", "category", "description", "inscription_note", "source"],
    searchCols: ["element", "category", "description"],
  },
  {
    table: "states_uts",
    labelCol: "state_ut",
    stateCol: "state_ut",
    cols: ["state_ut", "capital", "region", "major_languages", "signature_heritage", "major_festivals", "signature_crafts", "signature_performing_arts", "cuisine_highlights", "heritage_tourism_anchors", "source"],
    searchCols: ["state_ut", "capital", "signature_heritage"],
  },
];

function rowDetail(spec: TableSpec, row: Row): string {
  return spec.cols
    .filter((c) => c !== "source")
    .map((c) => `${c.replace(/_/g, " ")}: ${list(row[c])}`)
    .filter((l) => !l.endsWith(": "))
    .join(" | ");
}

export const askSathi = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<SathiAnswer> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const terms = keywords(data.message);
    const state = data.selectedState?.trim() || null;
    const sources: SathiSource[] = [];

    await Promise.all(
      SPECS.map(async (spec) => {
        try {
          let q = supabaseAdmin.from(spec.table).select(spec.cols.join(",")).limit(4);
          if (terms.length) {
            q = q.or(
              terms
                .flatMap((t) => spec.searchCols.map((c) => `${c}.ilike.%${t}%`))
                .join(","),
            );
          } else if (state) {
            q = q.ilike(spec.stateCol, `%${state}%`);
          } else {
            return;
          }
          const { data: rows } = await q;
          for (const r of (rows ?? []) as unknown as Row[]) {
            sources.push({
              table: spec.table,
              label: str(r[spec.labelCol]) || spec.table,
              detail: rowDetail(spec, r),
              source: str(r["source"]) || null,
            });
          }
        } catch {
          /* a table with no match simply contributes nothing */
        }
      }),
    );

    // When the question names no keyword match, fall back to the selected state.
    if (!sources.length && state) {
      const { data: rows } = await supabaseAdmin
        .from("states_uts")
        .select(SPECS[SPECS.length - 1]!.cols.join(","))
        .ilike("state_ut", `%${state}%`)
        .limit(1);
      for (const r of (rows ?? []) as unknown as Row[]) {
        sources.push({
          table: "states_uts",
          label: str(r["state_ut"]),
          detail: rowDetail(SPECS[SPECS.length - 1]!, r),
          source: str(r["source"]) || null,
        });
      }
    }

    const top = sources.slice(0, 12);

    if (!apiKey) {
      return { answer: "", sources: top };
    }

    const context = top.length
      ? top.map((s, i) => `[${i + 1}] (${s.table}) ${s.label} — ${s.detail}`).join("\n")
      : "No matching records were found in the verified heritage dataset.";

    const system = [
      "You are Virasat Sathi, the heritage assistant of Virasat AI, an Indian cultural heritage platform.",
      `Answer entirely in ${data.language}.`,
      state ? `The user is currently exploring ${state}; prefer it when the question is unspecific.` : "",
      "Use the VERIFIED RECORDS below as your primary source. You may add widely-known factual context about Indian heritage, but never invent records, artisans, prices or dates.",
      "Be concise: 3-6 short sentences or a compact bullet list. Warm, clear, student-friendly.",
      "If the question is vague (e.g. 'tell about monument'), ask one short clarifying question and suggest two examples from the records.",
      "The platform has modules: Time Portal (monument stories), Oral Vault (record oral histories), Trail Quest (heritage trails), Craft Connect (artisan marketplace), Guru-Shishya (masterclasses), States Atlas (all states & UTs). Point users to the right module when helpful.",
      "Do not mention that you were given records or context; just answer.",
      "",
      "VERIFIED RECORDS:",
      context,
    ]
      .filter(Boolean)
      .join("\n");

    const input = [
      { role: "system", content: system },
      ...(data.history ?? []).slice(-8).map((t) => ({ role: t.role, content: t.text })),
      { role: "user", content: data.message },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        reasoning: { effort: "low" },
        input,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`AI_${res.status}: ${detail.slice(0, 300)}`);
    }

    const json = (await res.json()) as {
      output_text?: string;
      output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }>;
    };

    const answer =
      json.output_text ??
      (json.output ?? [])
        .flatMap((o) => o.content ?? [])
        .filter((c) => c.type === "output_text")
        .map((c) => c.text ?? "")
        .join("\n")
        .trim();

    return { answer, sources: top };
  });
