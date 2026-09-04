import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { useStatesUts } from "@/services/hooks";
import { imagesForState } from "@/data/stateImages";
import { distinct } from "@/services/heritage";
import type { StateUT } from "@/types/database";

function ChipList({ label, items }: { label: string; items: string[] | null }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{label.toUpperCase()}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <span key={i} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatesAtlas() {
  const { data: states = [], isLoading, isError } = useStatesUts();
  const [region, setRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<StateUT | null>(null);

  const regions = useMemo(() => distinct(states, (s) => s.region), [states]);
  const filtered = useMemo(
    () =>
      states.filter((s) => {
        if (region !== "All" && s.region !== region) return false;
        if (!search.trim()) return true;
        const t = search.trim().toLowerCase();
        return (
          s.state_ut?.toLowerCase().includes(t) ||
          s.capital?.toLowerCase().includes(t) ||
          s.signature_heritage?.toLowerCase().includes(t)
        );
      }),
    [states, region, search],
  );

  return (
    <div className="animate-rise py-12">
      <p className="eyebrow">(f) States Atlas</p>
      <h1 className="mt-5 font-display text-4xl italic leading-[1.05] text-balance sm:text-5xl">
        Twenty-eight states,
        <br />
        one living map.
      </h1>
      <p className="mt-5 max-w-[46ch] text-pretty text-muted-foreground">
        Every state and union territory from the archive — its languages, festivals, crafts,
        performing arts and cuisine, drawn live from the heritage dataset.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a state, capital or heritage…"
            className="w-72 rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-lamp"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...regions].map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                r === region
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-lamp/50 hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl border border-border bg-card" />
          ))}
        </div>
      )}
      {isError && (
        <p className="mt-10 text-sm text-muted-foreground">
          Could not load the states archive. Please try again in a moment.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">ATLAS · INDIA</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] text-muted-foreground">
              {String(filtered.length).padStart(2, "0")} states & UTs
            </span>
          </div>

          <div className="mt-6 grid gap-5 pb-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-lamp/40"
              >
                {imagesForState(s.state_ut)[0] && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={imagesForState(s.state_ut)[0]}
                      alt={`${s.state_ut} heritage`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-lamp">
                    {(s.region ?? "INDIA").toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {s.capital}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg italic text-balance">{s.state_ut}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-pretty text-muted-foreground">
                  {s.signature_heritage}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(s.major_festivals ?? []).slice(0, 2).map((f) => (
                    <span key={f} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                      {f}
                    </span>
                  ))}
                  {(s.signature_crafts ?? []).slice(0, 1).map((c) => (
                    <span key={c} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                      {c}
                    </span>
                  ))}
                </div>
                <button onClick={() => setOpen(s)} className="mt-4 self-start text-sm text-lamp hover:text-lamp-soft">
                  Open profile →
                </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-sm text-muted-foreground">No states match that search.</p>
          )}
        </>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-lamp/30 bg-popover p-7 shadow-lamp animate-rise"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{open.region}</p>
                <h3 className="mt-3 font-display text-2xl italic text-lamp-soft">{open.state_ut}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
                  CAPITAL · {(open.capital ?? "—").toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{open.signature_heritage}</p>

            <div className="mt-6 space-y-5">
              <ChipList label="Languages" items={open.major_languages} />
              <ChipList label="Major festivals" items={open.major_festivals} />
              <ChipList label="Signature crafts" items={open.signature_crafts} />
              <ChipList label="Performing arts" items={open.signature_performing_arts} />
              <ChipList label="Cuisine highlights" items={open.cuisine_highlights} />
              <ChipList label="Heritage tourism anchors" items={open.heritage_tourism_anchors} />
            </div>

            <button
              onClick={() => setOpen(null)}
              className="mt-7 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
