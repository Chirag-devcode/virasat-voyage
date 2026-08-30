import { useState } from "react";
import { TRAIL } from "@/data/virasat";

export function TrailQuest() {
  const [activeId, setActiveId] = useState(TRAIL[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);

  const active = TRAIL.find((t) => t.id === activeId)!;
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
    setActiveId(TRAIL[0].id);
  };

  const nextIndex = TRAIL.findIndex((t) => t.id === activeId) + 1;

  return (
    <div className="animate-rise py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">(c) Trail Quest</p>
          <h1 className="mt-4 font-display text-4xl italic text-balance">Follow the trail</h1>
          <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
            Six heritage nodes across six states. Answer the keeper's question at each stop to
            unlock the next.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
            <p className="font-display text-2xl italic text-lamp-soft">{score.toLocaleString("en-IN")}</p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-muted-foreground">POINTS</p>
          </div>
          <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
            <p className="font-display text-2xl italic text-lamp-soft">
              {cleared}
              <span className="text-lg text-muted-foreground">/{TRAIL.length}</span>
            </p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-muted-foreground">CLEARED</p>
          </div>
          <button
            onClick={reset}
            className="rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground hover:border-lamp/50 hover:text-foreground"
          >
            Reset trail
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">TRAIL MAP · INDIA</p>
          <div className="relative mt-4 aspect-4/3 overflow-hidden rounded-xl bg-surface">
            <div className="pointer-events-none absolute inset-0 lamp-glow opacity-40" />
            <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={TRAIL.map((t) => `${t.x},${t.y}`).join(" ")}
                fill="none"
                stroke="currentColor"
                className="text-border"
                strokeWidth="0.4"
                strokeDasharray="2 2"
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
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  <span
                    className={`grid size-7 place-items-center rounded-full font-mono text-[10px] transition-all ${
                      done
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "border-2 border-lamp bg-background text-lamp ring-4 ring-lamp/15"
                          : "border border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span
                    className={`mt-1.5 block font-mono text-[9px] tracking-wider whitespace-nowrap ${
                      isActive ? "text-lamp" : "text-muted-foreground"
                    }`}
                  >
                    {t.site}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-wider text-muted-foreground">
            {attempted} OF {TRAIL.length} STOPS ATTEMPTED
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.25em] text-lamp">
              STOP {TRAIL.findIndex((t) => t.id === activeId) + 1} · {active.state.toUpperCase()}
            </p>
            <span className="font-mono text-[10px] text-muted-foreground">+{active.points} PTS</span>
          </div>
          <h2 className="mt-3 font-display text-2xl italic text-lamp-soft">{active.site}</h2>
          <p className="mt-4 text-pretty">{active.question}</p>

          <div className="mt-5 grid gap-2">
            {active.options.map((opt, i) => {
              const isAnswer = i === active.answer;
              const isPicked = picked === i;
              const cls = !answered
                ? "border-border hover:border-lamp/50"
                : isAnswer
                  ? "border-lamp bg-lamp/10 text-foreground"
                  : isPicked
                    ? "border-destructive/60 bg-destructive/10 text-foreground"
                    : "border-border opacity-50";
              return (
                <button
                  key={opt}
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${cls}`}
                >
                  <span className="mr-2 font-mono text-[10px] text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-5 rounded-lg border border-border bg-surface p-4 animate-rise">
              <p className="font-mono text-[10px] tracking-[0.25em] text-lamp">
                {picked === active.answer ? `CORRECT · +${active.points}` : "NOT QUITE"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{active.fact}</p>
              {nextIndex < TRAIL.length && (
                <button
                  onClick={() => setActiveId(TRAIL[nextIndex].id)}
                  className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Next stop: {TRAIL[nextIndex].site} →
                </button>
              )}
              {nextIndex >= TRAIL.length && (
                <p className="mt-4 font-display text-lg italic text-lamp-soft">
                  Trail complete — {score.toLocaleString("en-IN")} points.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
