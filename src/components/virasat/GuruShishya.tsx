import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { MASTERCLASSES, STATES, type Masterclass, type StateName } from "@/data/virasat";

type Step = "details" | "payment" | "processing" | "done";

export function GuruShishya() {
  const [filter, setFilter] = useState<StateName | "All">("All");
  const [booking, setBooking] = useState<Masterclass | null>(null);
  const [step, setStep] = useState<Step>("details");
  const [upi, setUpi] = useState("");
  const [error, setError] = useState("");

  const list = filter === "All" ? MASTERCLASSES : MASTERCLASSES.filter((m) => m.state === filter);

  const openBooking = (m: Masterclass) => {
    setBooking(m);
    setStep("details");
    setUpi("");
    setError("");
  };

  const close = () => {
    if (step === "processing") return;
    setBooking(null);
  };

  const pay = () => {
    if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim())) {
      setError("Enter a valid UPI ID (e.g. name@okhdfcbank)");
      return;
    }
    setError("");
    setStep("processing");
    setTimeout(() => setStep("done"), 2200);
  };

  return (
    <div className="animate-rise py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">(e) Guru-Shishya</p>
          <h1 className="mt-4 flex items-center gap-3 font-display text-4xl italic text-balance">
            <GraduationCap className="size-8 text-lamp" aria-hidden />
            Learn from the last masters
          </h1>
          <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
            Vanishing artforms taught live and recorded by the artisans who still practise them.
            Fees go straight to the guru's UPI.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
          <p className="font-display text-2xl italic text-lamp-soft">{MASTERCLASSES.length}</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-muted-foreground">GURUS</p>
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
        {list.map((m) => (
          <article
            key={m.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-lamp/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  {m.place.toUpperCase()} · {m.state.toUpperCase()}
                </p>
                <h3 className="mt-1.5 font-display text-lg italic text-balance">{m.artform}</h3>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-widest ${
                  m.mode === "Live"
                    ? "border-lamp/50 text-lamp"
                    : "border-border text-muted-foreground"
                }`}
              >
                {m.mode.toUpperCase()}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Guru {m.artisan}</p>
            <p className="mt-2 text-sm text-muted-foreground">{m.blurb}</p>
            <div className="mt-4 space-y-1.5 border-t border-border pt-4 font-mono text-[10px] tracking-widest text-muted-foreground">
              <p>{m.duration}</p>
              <p>{m.schedule}</p>
              <p>{m.seats} seats left</p>
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <span className="font-display text-xl italic text-lamp-soft">
                ₹{m.fee.toLocaleString("en-IN")}
              </span>
              <button
                onClick={() => openBooking(m)}
                className="rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book Masterclass
              </button>
            </div>
          </article>
        ))}
      </div>

      {booking && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-lamp/30 bg-popover p-7 shadow-lamp animate-rise"
            onClick={(e) => e.stopPropagation()}
          >
            {step === "details" && (
              <>
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-xl border border-lamp/50 bg-lamp/10 text-lamp">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <p className="eyebrow">Masterclass booking</p>
                    <h3 className="mt-1 font-display text-xl italic text-lamp-soft">{booking.artform}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Guru {booking.artisan} · {booking.place}, {booking.state}
                    </p>
                  </div>
                </div>

                <h4 className="mt-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                  CURRICULUM
                </h4>
                <ol className="mt-3 space-y-2">
                  {booking.curriculum.map((c, i) => (
                    <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-lamp/40 font-mono text-[9px] text-lamp">
                        {i + 1}
                      </span>
                      {c}
                    </li>
                  ))}
                </ol>

                <h4 className="mt-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                  MATERIAL KIT · SHIPPED TO YOU
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {booking.kit.map((k) => (
                    <li key={k} className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                      {k}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm">
                  <span className="text-muted-foreground">
                    {booking.duration} · {booking.mode}
                  </span>
                  <span className="font-display text-lg italic text-lamp-soft">
                    ₹{booking.fee.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                  >
                    Proceed to UPI payment
                  </button>
                  <button onClick={close} className="rounded-lg border border-border px-4 py-3 text-sm">
                    Cancel
                  </button>
                </div>
              </>
            )}

            {step === "payment" && (
              <>
                <p className="eyebrow">UPI checkout</p>
                <h3 className="mt-2 font-display text-2xl italic text-balance">
                  Pay ₹{booking.fee.toLocaleString("en-IN")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paid directly to Guru {booking.artisan} — Virasat takes no cut.
                </p>

                <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                  <label htmlFor="upi-id" className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    YOUR UPI ID
                  </label>
                  <input
                    id="upi-id"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                    placeholder="yourname@upi"
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-lamp/60"
                  />
                  {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["@okhdfcbank", "@okicici", "@oksbi", "@ybl"].map((hint) => (
                      <button
                        key={hint}
                        onClick={() => setUpi(`student${hint}`)}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:border-lamp/50"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 rounded-xl border border-border bg-surface p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Masterclass fee</span>
                    <span>₹{booking.fee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material kit</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-1.5 font-medium">
                    <span>Total</span>
                    <span className="text-lamp-soft">₹{booking.fee.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={pay}
                    className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                  >
                    Pay now
                  </button>
                  <button
                    onClick={() => setStep("details")}
                    className="rounded-lg border border-border px-4 py-3 text-sm"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {step === "processing" && (
              <div className="grid place-items-center py-14 text-center">
                <div className="size-12 animate-spin rounded-full border-2 border-lamp border-t-transparent" />
                <p className="mt-5 font-display text-xl italic">Contacting your bank…</p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                  UPI · {upi}
                </p>
              </div>
            )}

            {step === "done" && (
              <div className="text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full border border-lamp/50 bg-lamp/10 text-2xl text-lamp">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl italic text-lamp-soft">Seat confirmed</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Payment of ₹{booking.fee.toLocaleString("en-IN")} received by Guru {booking.artisan}.
                  Your material kit ships in 3 days; joining link sent to your inbox.
                </p>
                <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                  REF · UPI-{booking.id.toUpperCase()}-2026
                </p>
                <button
                  onClick={close}
                  className="mt-7 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                >
                  Back to masterclasses
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
