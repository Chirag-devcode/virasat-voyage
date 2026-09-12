import React, { useState } from "react";
import { Compass, ShieldCheck, RotateCcw, CheckCircle2, XCircle, ArrowRight, MapPin } from "lucide-react";
import { TRAIL, type TrailStop } from "@/data/virasat";

const FIRST = TRAIL[0] as TrailStop;

export function TrailQuest() {
  const [activeId, setActiveId] = useState<string | number>(FIRST.id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);

  const active = TRAIL.find((t) => t.id === activeId) || FIRST;
  const picked = answers[active.id];
  const answered = picked !== undefined;
  const cleared = TRAIL.filter((t) => answers[t.id] === t.answer).length;
  const attempted = Object.keys(answers).length;

  const choose = (i: number) => {
    if (answered) return;
    setAnswers((a) => ({ ...a, [active.id]: i }));
    if (i === active.answer) setScore((s) => s + active.points);
  };

  const reset = () => {
    setAnswers({});
    setScore(0);
    setActiveId(FIRST.id);
  };

  const nextIndex = TRAIL.findIndex((t) => t.id === activeId) + 1;
  const nextStop = TRAIL[nextIndex];

  return (
    <section id="trail-quest" className="w-full bg-slate-50 text-slate-900 py-12 px-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-300 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-bold tracking-widest uppercase mb-1">
              <Compass className="w-4 h-4 text-amber-600" /> SECTION (C) · HERITAGE TRAIL QUEST
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">
              National Heritage Trail & Knowledge Quest
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Six heritage nodes across six states. Answer the keeper's question at each stop to evaluate cultural literacy based on Archaeological Survey of India archives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900 text-amber-400 px-4 py-2 rounded-lg font-mono text-xs font-bold border border-slate-800 shadow-sm text-center">
              <div className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Score</div>
              <div className="text-base text-amber-400">{score.toLocaleString("en-IN")} PTS</div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-300 shadow-sm text-center">
              <div className="text-[10px] text-slate-500 font-sans uppercase tracking-wider font-semibold">Cleared</div>
              <div className="text-base font-bold text-slate-900 font-mono">
                {cleared} <span className="text-xs text-slate-500 font-normal">/ {TRAIL.length}</span>
              </div>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-3 rounded-lg border border-slate-300 shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Trail
            </button>
          </div>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Interactive Map */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-slate-700 tracking-wider flex items-center gap-1.5 uppercase">
                  <MapPin className="w-4 h-4 text-amber-600" /> Cartographic Trail Map
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  {attempted} OF {TRAIL.length} STOPS ATTEMPTED
                </span>
              </div>

              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-slate-900 border border-slate-800 shadow-inner">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={TRAIL.map((t) => `${t.x},${t.y}`).join(" ")}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="0.6"
                    strokeDasharray="2 2"
                    className="opacity-70"
                  />
                </svg>

                {TRAIL.map((t, i) => {
                  const done = answers[t.id] === t.answer;
                  const isActive = t.id === activeId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveId(t.id)}
                      style={{ left: `${t.x}%`, top: `${t.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-center group z-10 focus:outline-none"
                    >
                      <span
                        className={`grid size-8 place-items-center rounded-full font-mono text-xs font-bold transition-all shadow-md ${
                          done
                            ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
                            : isActive
                              ? "bg-amber-500 text-slate-950 ring-4 ring-amber-400/30 scale-110"
                              : "bg-slate-800 text-slate-300 border border-slate-600 hover:border-amber-400"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      <span
                        className={`mt-1.5 block font-mono text-[10px] font-bold tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded backdrop-blur-md ${
                          isActive
                            ? "bg-amber-500/90 text-slate-950"
                            : "bg-slate-900/80 text-slate-300 group-hover:text-amber-300"
                        }`}
                      >
                        {t.site}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Select any node marker on the cartographic map above to view stop questions.</span>
            </div>
          </div>

          {/* Right Column: Question Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded border border-amber-300 uppercase font-mono">
                  STOP {TRAIL.findIndex((t) => t.id === activeId) + 1} · {active.state}
                </span>
                <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  +{active.points} PTS
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-slate-900">
                {active.site}
              </h2>

              <p className="text-slate-700 text-sm font-medium leading-relaxed">
                {active.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {active.options.map((opt, i) => {
                  const isAnswer = i === active.answer;
                  const isPicked = picked === i;

                  let cls = "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300";
                  if (answered) {
                    if (isAnswer) {
                      cls = "bg-emerald-50 text-emerald-950 border-emerald-500 font-bold ring-1 ring-emerald-500";
                    } else if (isPicked) {
                      cls = "bg-rose-50 text-rose-950 border-rose-500 font-bold ring-1 ring-rose-500";
                    } else {
                      cls = "bg-slate-50 text-slate-400 border-slate-200 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => choose(i)}
                      disabled={answered}
                      className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between ${cls}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {answered && isAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {answered && isPicked && !isAnswer && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fact Box & Navigation */}
            {answered && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div
                  className={`p-4 rounded-lg border text-xs leading-relaxed ${
                    picked === active.answer
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                      : "bg-rose-50 border-rose-200 text-rose-950"
                  }`}
                >
                  <p className="font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    {picked === active.answer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        CORRECT VERIFICATION (+{active.points} POINTS)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        INCORRECT RESPONSE
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-slate-800 text-xs">{active.fact}</p>
                </div>

                {nextStop ? (
                  <button
                    onClick={() => setActiveId(nextStop.id)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold py-3 rounded-lg border border-slate-800 shadow transition-all flex items-center justify-center gap-2"
                  >
                    PROCEED TO NEXT STOP: {nextStop.site.toUpperCase()} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-4 bg-slate-900 rounded-lg text-center text-amber-400 font-serif font-bold text-base border border-slate-800 shadow">
                    Trail Complete! Final Score: {score.toLocaleString("en-IN")} Points.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrailQuest;