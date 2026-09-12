import React, { useEffect, useState } from "react";
import { CRAFTS, STATES, type StateName } from "@/data/virasat";

export function CraftConnect() {
  const [filter, setFilter] = useState<StateName | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const list = filter === "All" ? CRAFTS : CRAFTS.filter((c) => c.state === filter);
  const open = CRAFTS.find((c) => c.id === openId) ?? null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="animate-rise py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">(d) Craft Connect</p>
          <h1 className="mt-4 font-display text-4xl italic text-balance">
            Maker, verified on-chain
          </h1>
          <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
            Buy direct from the hands that made it. Every piece carries a ledger entry you can
            open — tap the badge for proof of provenance.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
          <p className="font-display text-2xl italic text-lamp-soft">{cart.length}</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-muted-foreground">IN CART</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["All", ...STATES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
              filter === s
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-lamp/50 hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <article
            key={c.id}
            className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-lamp/40"
          >
            <div className="relative">
              <img
                src={c.image}
                alt={c.name}
                width={1024}
                height={768}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
              <button
                onClick={() => setOpenId(c.id)}
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-lamp/50 bg-background/85 px-3 py-1.5 font-mono text-[10px] text-lamp backdrop-blur-sm hover:bg-lamp/15"
              >
                <span className="size-1.5 rounded-full bg-lamp" />
                VERIFIED {c.hash}
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg italic text-balance">{c.name}</h3>
              <p className="mt-1.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                {c.place.toUpperCase()} · {c.state.toUpperCase()}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {c.craft} · by {c.artisan}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-xl italic text-lamp-soft">
                  ₹{c.price.toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() =>
                    setCart((prev) => (prev.includes(c.id) ? prev.filter((x) => x !== c.id) : [...prev, c.id]))
                  }
                  className={`rounded-lg px-3.5 py-2 text-xs transition-colors ${
                    cart.includes(c.id)
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-foreground hover:border-lamp/50"
                  }`}
                >
                  {cart.includes(c.id) ? "In cart ✓" : "Add to cart"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-5 backdrop-blur-sm animate-rise"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-lamp/30 bg-popover p-7 shadow-lamp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl border border-lamp/50 bg-lamp/10 text-lg text-lamp">
                ✓
              </div>
              <div>
                <p className="eyebrow">Blockchain verified</p>
                <h3 className="mt-1 font-display text-xl italic text-lamp-soft">{open.name}</h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Authenticity sealed on a public ledger. Every hand that touched this piece is
              recorded and unalterable.
            </p>

            <dl className="mt-5 space-y-2.5 rounded-xl border border-border bg-surface p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Artisan</dt>
                <dd className="text-right">{open.artisan}, {open.place}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Minted</dt>
                <dd>{open.minted}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Ledger</dt>
                <dd className="font-mono text-xs text-lamp">{open.hash}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Network</dt>
                <dd>{open.ledger}</dd>
              </div>
            </dl>

            <ol className="mt-5 space-y-2">
              {open.provenance.map((p, i) => (
                <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full border border-lamp/40 font-mono text-[9px] text-lamp">
                    {i + 1}
                  </span>
                  {p}
                </li>
              ))}
            </ol>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => {
                  setCart((prev) => (prev.includes(open.id) ? prev : [...prev, open.id]));
                  setOpenId(null);
                }}
                className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                Add to cart · ₹{open.price.toLocaleString("en-IN")}
              </button>
              <button
                onClick={() => setOpenId(null)}
                className="rounded-lg border border-border px-4 py-3 text-sm"
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

export default CraftConnect;