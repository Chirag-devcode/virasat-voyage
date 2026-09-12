import React, { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  Check,
  X,
  Clock,
  Calendar,
  Users,
  Package,
  CreditCard,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  MapPin,
  AlertCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { MASTERCLASSES, STATES, type Masterclass, type StateName } from "@/data/virasat";

type Step = "details" | "payment" | "processing" | "done";

export function GuruShishya() {
  const [filter, setFilter] = useState<StateName | "All">("All");
  const [booking, setBooking] = useState<Masterclass | null>(null);
  const [step, setStep] = useState<Step>("details");
  const [upi, setUpi] = useState("");
  const [error, setError] = useState("");

  const list = useMemo(() => {
    return filter === "All"
      ? MASTERCLASSES
      : MASTERCLASSES.filter((m) => m.state === filter);
  }, [filter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") {
        setBooking(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

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

  const handleQuickUpiSelect = (suffix: string) => {
    const base = upi.includes("@") ? upi.split("@")[0] : upi || "student";
    setUpi(`${base}${suffix}`);
    setError("");
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
      {/* Header Section */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">(e) Guru-Shishya Parampara</p>
          <h1 className="mt-4 font-display text-4xl italic text-balance">
            Learn from the Last Masters
          </h1>
          <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
            Vanishing artforms taught live and recorded by the master artisans who still practice them.
            100% of enrollment fees transfer directly to the guru's bank via UPI.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
          <p className="font-display text-2xl italic text-lamp-soft">{MASTERCLASSES.length}</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-muted-foreground">
            ACTIVE GURUS
          </p>
        </div>
      </div>

      {/* Filter Pills */}
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

      {/* Masterclass Cards Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <article
            key={m.id}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-lamp/40"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  <MapPin className="size-3 text-lamp shrink-0" />
                  {m.place} · {m.state}
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase ${
                    m.mode === "Live"
                      ? "border-lamp/50 bg-lamp/15 text-lamp"
                      : "border-border bg-surface text-muted-foreground"
                  }`}
                >
                  {m.mode}
                </span>
              </div>

              <h2 className="mt-3 font-display text-xl italic text-foreground leading-snug">
                {m.artform}
              </h2>
              <p className="mt-1 text-xs font-medium text-lamp-soft">Guru {m.artisan}</p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{m.blurb}</p>

              <div className="mt-5 space-y-2 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-muted-foreground/70 shrink-0" />
                  <span>{m.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-muted-foreground/70 shrink-0" />
                  <span>{m.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-3.5 text-muted-foreground/70 shrink-0" />
                  <span className="text-lamp font-semibold">{m.seats} seats remaining</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Fee</span>
                <span className="font-display text-xl italic text-lamp-soft">
                  ₹{m.fee.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={() => openBooking(m)}
                className="rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90 flex items-center gap-1.5"
              >
                Book Masterclass <ChevronRight className="size-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Booking Dialog Modal */}
      {booking && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-5 backdrop-blur-sm animate-rise"
          role="dialog"
          aria-modal="true"
          aria-label={`Booking ${booking.artform}`}
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-lamp/30 bg-popover p-7 shadow-lamp space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Step 1: Course & Kit Details */}
            {step === "details" && (
              <>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-lamp/50 bg-lamp/10 text-lamp">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <p className="eyebrow">Masterclass Registration</p>
                      <h3 className="mt-0.5 font-display text-xl italic text-lamp-soft">
                        {booking.artform}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Guru {booking.artisan} · {booking.place}, {booking.state}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    aria-label="Close dialog"
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-lamp/50 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Curriculum */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
                    <BookOpen className="size-3.5 text-lamp" /> CURRICULUM HIGHLIGHTS
                  </h4>
                  <ol className="mt-3 space-y-2.5">
                    {booking.curriculum.map((c, i) => (
                      <li key={c} className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full border border-lamp/40 bg-lamp/10 font-mono text-[10px] font-bold text-lamp">
                          {i + 1}
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Material Kit */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
                    <Package className="size-3.5 text-lamp" /> ARTISAN MATERIAL KIT · SHIPPED DIRECT
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {booking.kit.map((k) => (
                      <li
                        key={k}
                        className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <Check className="size-3.5 text-lamp shrink-0" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fee Summary Banner */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3.5">
                  <span className="text-xs text-muted-foreground font-mono">
                    {booking.duration} · {booking.mode}
                  </span>
                  <span className="font-display text-xl italic text-lamp-soft">
                    ₹{booking.fee.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    Proceed to UPI Checkout
                  </button>
                  <button
                    onClick={close}
                    className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Step 2: UPI Checkout */}
            {step === "payment" && (
              <>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <button
                    onClick={() => setStep("details")}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    DIRECT ARTISAN TRANSFER
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl italic text-foreground">
                    Pay ₹{booking.fee.toLocaleString("en-IN")}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                    100% of proceeds go directly to Guru {booking.artisan}. Virasat charges zero commission.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
                  <label
                    htmlFor="upi-id"
                    className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase block"
                  >
                    ENTER YOUR VPA / UPI ID
                  </label>
                  <input
                    id="upi-id"
                    type="text"
                    value={upi}
                    onChange={(e) => {
                      setUpi(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="e.g. username@okhdfcbank"
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-lamp/60 focus:outline-none transition-colors font-mono"
                  />

                  {error && (
                    <div className="flex items-center gap-1.5 text-xs text-destructive pt-1">
                      <AlertCircle className="size-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-2">
                      Quick Add Provider Handles:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["@okhdfcbank", "@okicici", "@oksbi", "@ybl"].map((hint) => (
                        <button
                          key={hint}
                          type="button"
                          onClick={() => handleQuickUpiSelect(hint)}
                          className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:border-lamp/50 hover:text-foreground transition-colors"
                        >
                          {hint}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 rounded-xl border border-border bg-surface p-4 text-xs font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Masterclass Tuition</span>
                    <span className="text-foreground">₹{booking.fee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Artisan Material Kit</span>
                    <span className="text-emerald-500 font-semibold">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform Convenience Fee</span>
                    <span className="text-emerald-500 font-semibold">₹0 (WAIVED)</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-bold text-sm">
                    <span className="text-foreground font-sans">Total Amount</span>
                    <span className="text-lamp-soft font-display italic text-lg">
                      ₹{booking.fee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={pay}
                    className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="size-4" /> Pay Now via UPI
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Payment Processing */}
            {step === "processing" && (
              <div className="grid place-items-center py-12 text-center space-y-4">
                <div className="relative grid size-16 place-items-center">
                  <div className="absolute inset-0 rounded-full border-2 border-lamp/20" />
                  <div className="size-16 animate-spin rounded-full border-2 border-lamp border-t-transparent" />
                </div>
                <div>
                  <h3 className="font-display text-xl italic text-foreground">
                    Contacting Your Payment Provider…
                  </h3>
                  <p className="mt-1 font-mono text-xs text-lamp">UPI ID: {upi}</p>
                </div>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Please approve the UPI mandate request in your banking app to complete enrollment.
                </p>
              </div>
            )}

            {/* Step 4: Seat Confirmed */}
            {step === "done" && (
              <div className="text-center space-y-5 py-2">
                <div className="mx-auto grid size-16 place-items-center rounded-full border border-lamp/50 bg-lamp/10 text-lamp">
                  <Check className="size-8" />
                </div>

                <div>
                  <p className="eyebrow">Enrollment Confirmed</p>
                  <h3 className="mt-1 font-display text-2xl italic text-lamp-soft">Seat Reserved!</h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Payment of <strong className="text-foreground">₹{booking.fee.toLocaleString("en-IN")}</strong>{" "}
                  has been transferred directly to <strong className="text-foreground">Guru {booking.artisan}</strong>.
                  Your physical material kit will ship in 3 business days, and class access credentials have been sent.
                </p>

                <div className="rounded-xl border border-border bg-surface p-3.5 font-mono text-[10px] text-muted-foreground space-y-1">
                  <p className="tracking-wider">TRANSACTION REFERENCE</p>
                  <p className="text-lamp font-bold tracking-widest">
                    REF · UPI-{booking.id.toUpperCase()}-2026
                  </p>
                </div>

                <button
                  onClick={close}
                  className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="size-4" /> Return to Masterclasses
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GuruShishya;