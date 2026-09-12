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

  // Handle modal escape key dismiss
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
    <div className="w-full bg-slate-900 text-slate-100 py-12 px-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold tracking-widest uppercase mb-1">
              <GraduationCap className="w-4 h-4 text-amber-500" /> SECTION (E) · GURU-SHISHYA PARAMPARA
            </div>
            <h1 className="text-3xl font-serif font-bold text-white">Learn from the Last Masters</h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Vanishing artforms taught live and recorded by the master artisans who still practice them.
              100% of enrollment fees transfer directly to the guru's bank via UPI.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3 text-center shadow-sm">
            <p className="font-mono text-2xl font-bold text-amber-400">{MASTERCLASSES.length}</p>
            <p className="mt-0.5 font-mono text-[9px] tracking-widest text-slate-500 uppercase">
              ACTIVE GURUS
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {(["All", ...STATES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                filter === s
                  ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                  : "border border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Masterclass Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <article
              key={m.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-6 shadow-sm transition-all hover:border-amber-500/40 hover:bg-slate-900/60"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  {m.place} · {m.state}
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase ${
                    m.mode === "Live"
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                      : "border-slate-700 bg-slate-800/60 text-slate-400"
                  }`}
                >
                  {m.mode}
                </span>
              </div>

              <h2 className="mt-3 font-serif text-xl font-bold text-white leading-snug">{m.artform}</h2>
              <p className="mt-1 text-xs text-amber-400/90 font-medium">Guru {m.artisan}</p>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed flex-1">{m.blurb}</p>

              <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4 font-mono text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{m.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{m.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-amber-400/80 font-semibold">{m.seats} seats remaining</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Fee</span>
                  <span className="font-mono text-xl font-bold text-amber-400">
                    ₹{m.fee.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  onClick={() => openBooking(m)}
                  className="rounded-lg bg-amber-400 hover:bg-amber-300 px-4 py-2 text-xs font-bold text-slate-950 transition-all shadow-sm flex items-center gap-1.5"
                >
                  Book Masterclass <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Booking Dialog Modal */}
        {booking && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Booking ${booking.artform}`}
            onClick={close}
          >
            <div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Step 1: Course & Kit Details */}
              {step === "details" && (
                <>
                  <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold text-amber-400 tracking-wider uppercase block">
                          MASTERCLASS REGISTRATION
                        </span>
                        <h2 className="font-serif text-xl font-bold text-white">{booking.artform}</h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Guru {booking.artisan} · {booking.place}, {booking.state}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={close}
                      aria-label="Close dialog"
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Curriculum */}
                  <div>
                    <h3 className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" /> CURRICULUM HIGHLIGHTS
                    </h3>
                    <ol className="mt-3 space-y-2.5">
                      {booking.curriculum.map((c, i) => (
                        <li key={c} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                          <span className="grid size-5 shrink-0 place-items-center rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-[10px] font-bold text-amber-400">
                            {i + 1}
                          </span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Material Kit */}
                  <div>
                    <h3 className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-amber-500" /> ARTISAN MATERIAL KIT · SHIPPED DIRECT
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {booking.kit.map((k) => (
                        <li
                          key={k}
                          className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-300 flex items-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{k}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fee Summary Banner */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3.5">
                    <span className="text-xs text-slate-400 font-mono">
                      {booking.duration} · {booking.mode}
                    </span>
                    <span className="font-mono text-xl font-bold text-amber-400">
                      ₹{booking.fee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("payment")}
                      className="flex-1 rounded-lg bg-amber-400 hover:bg-amber-300 px-4 py-3 text-xs font-bold text-slate-950 transition-all shadow-sm"
                    >
                      Proceed to UPI Checkout
                    </button>
                    <button
                      onClick={close}
                      className="rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: UPI Checkout */}
              {step === "payment" && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <button
                      onClick={() => setStep("details")}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                      DIRECT ARTISAN TRANSFER
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Pay ₹{booking.fee.toLocaleString("en-IN")}
                    </h2>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      100% of proceeds go directly to Guru {booking.artisan}. Virasat charges zero commission.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                    <label
                      htmlFor="upi-id"
                      className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase block"
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
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none transition-colors font-mono"
                    />

                    {error && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">
                        Quick Add Provider Handles:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {["@okhdfcbank", "@okicici", "@oksbi", "@ybl"].map((hint) => (
                          <button
                            key={hint}
                            type="button"
                            onClick={() => handleQuickUpiSelect(hint)}
                            className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-[10px] text-slate-400 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
                          >
                            {hint}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Masterclass Tuition</span>
                      <span className="text-slate-200">₹{booking.fee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Artisan Material Kit</span>
                      <span className="text-emerald-400">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Platform Convenience Fee</span>
                      <span className="text-emerald-400">₹0 (WAIVED)</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm">
                      <span className="text-white">Total Amount</span>
                      <span className="text-amber-400">₹{booking.fee.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={pay}
                      className="flex-1 rounded-lg bg-amber-400 hover:bg-amber-300 px-4 py-3 text-xs font-bold text-slate-950 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" /> Pay Now via UPI
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Payment Processing */}
              {step === "processing" && (
                <div className="grid place-items-center py-12 text-center space-y-4">
                  <div className="relative grid size-16 place-items-center">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400/20" />
                    <div className="size-16 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">Contacting Your Payment Provider…</h3>
                    <p className="mt-1 font-mono text-xs text-amber-400">UPI ID: {upi}</p>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Please approve the UPI mandate request in your banking app to complete enrollment.
                  </p>
                </div>
              )}

              {/* Step 4: Seat Confirmed */}
              {step === "done" && (
                <div className="text-center space-y-5 py-2">
                  <div className="mx-auto grid size-16 place-items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
                      ENROLLMENT CONFIRMED
                    </span>
                    <h2 className="mt-1 font-serif text-2xl font-bold text-white">Seat Reserved!</h2>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Payment of <strong className="text-amber-400">₹{booking.fee.toLocaleString("en-IN")}</strong>{" "}
                    has been transferred directly to <strong className="text-white">Guru {booking.artisan}</strong>.
                    Your physical material kit will ship in 3 business days, and class access credentials have been sent.
                  </p>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 font-mono text-[10px] text-slate-400 space-y-1">
                    <p className="tracking-wider">TRANSACTION REFERENCE</p>
                    <p className="text-amber-400 font-bold tracking-widest">
                      REF · UPI-{booking.id.toUpperCase()}-2026
                    </p>
                  </div>

                  <button
                    onClick={close}
                    className="w-full rounded-lg bg-amber-400 hover:bg-amber-300 px-4 py-3 text-xs font-bold text-slate-950 transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" /> Return to Masterclasses
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuruShishya;