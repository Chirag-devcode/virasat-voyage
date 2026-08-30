import { useMemo, useState } from "react";
import heroMonument from "@/assets/hero-monument.jpg";
import { LANGUAGES, MONUMENTS, STATES, type Language, type StateName } from "@/data/virasat";

export function TimePortal() {
  const [state, setState] = useState<StateName>("Uttar Pradesh");
  const [language, setLanguage] = useState<Language>("English");
  const [openId, setOpenId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const monuments = useMemo(() => MONUMENTS.filter((m) => m.state === state), [state]);
  const featured = monuments[0];
  const rest = monuments.slice(1);
  const open = MONUMENTS.find((m) => m.id === openId) ?? null;

  const storyFor = (m: typeof MONUMENTS[number]) => m.stories[language] ?? m.stories.English;

  return (
    <div className="animate-rise">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full lamp-glow blur-3xl animate-breathe" />
        <div className="relative grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <p className="eyebrow">(a) Time Portal</p>
            <h1 className="mt-5 font-display text-4xl italic leading-[1.05] text-balance sm:text-5xl">
              Stone keeps a record
              <br />
              of the light.
            </h1>
            <p className="mt-5 max-w-[46ch] text-pretty text-muted-foreground">
              Interactive monument stories, narrated in the languages the stones first heard.
              Choose a state, choose a tongue, and step through.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {STATES.map((s) => (
                <button
                  key={s}
                  onClick={() => setState(s)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    s === state
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-lamp/50 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="tp-lang" className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                LANGUAGE
              </label>
              <select
                id="tp-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-lamp"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroMonument}
              alt="Carved sandstone temple facade lit by a single lamp at dusk"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full rounded-xl object-cover"
            />
            {featured && (
              <div className="absolute inset-x-4 -bottom-6 rounded-xl border border-border bg-popover/95 p-5 backdrop-blur-sm shadow-lamp">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl italic leading-none text-lamp-soft">{featured.name}</p>
                    <p className="mt-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                      {featured.place.toUpperCase()} · {featured.era} · {featured.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => setPlayingId(playingId === featured.id ? null : featured.id)}
                    className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                  >
                    {playingId === featured.id ? "Pause" : "Play"}
                  </button>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {storyFor(featured)}
                </p>
                {playingId === featured.id && (
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/3 animate-pulse rounded-full bg-lamp" />
                  </div>
                )}
                <button
                  onClick={() => setOpenId(featured.id)}
                  className="mt-3 text-sm text-lamp hover:text-lamp-soft"
                >
                  Read the full story →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">ARCHIVE · {state.toUpperCase()}</span>
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[11px] text-muted-foreground">
          {String(monuments.length).padStart(2, "0")} entries
        </span>
      </div>

      <div className="mt-6 grid gap-5 pb-4 sm:grid-cols-2 lg:grid-cols-3">
        {(rest.length ? rest : monuments).map((m) => (
          <article
            key={m.id}
            className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-lamp/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-lamp">{m.place.toUpperCase()}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{m.duration}</span>
            </div>
            <h3 className="mt-3 font-display text-lg italic text-balance">{m.name}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-pretty text-muted-foreground">{storyFor(m)}</p>
            <button
              onClick={() => setOpenId(m.id)}
              className="mt-4 self-start text-sm text-lamp hover:text-lamp-soft"
            >
              Open story →
            </button>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-lamp/30 bg-popover p-7 shadow-lamp animate-rise"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow">{open.state}</p>
            <h3 className="mt-3 font-display text-2xl italic text-lamp-soft">{open.name}</h3>
            <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
              {open.place.toUpperCase()} · {open.era} · {open.duration} · {language}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{storyFor(open)}</p>
            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setPlayingId(playingId === open.id ? null : open.id)}
                className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                {playingId === open.id ? "Pause narration" : "Play narration"}
              </button>
              <button
                onClick={() => setOpenId(null)}
                className="rounded-lg border border-border px-4 py-3 text-sm text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
