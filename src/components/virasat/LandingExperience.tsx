import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeritageHologram } from "./HeritageHologram";

export function LandingExperience({ onEnter }: { onEnter: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="hologram-landing relative isolate flex min-h-[100svh] overflow-hidden bg-background">
      <div className="hologram-grid pointer-events-none absolute inset-0" />
      <div className="hologram-vignette pointer-events-none absolute inset-0" />
      <div className="hologram-scanlines pointer-events-none absolute inset-0 z-20" />

      <div className="absolute left-5 top-5 z-30 flex items-baseline gap-3 sm:left-8 sm:top-7">
        <span className="font-display text-2xl italic text-lamp-soft">Virasat</span>
        <span className="font-mono text-[9px] tracking-[0.32em] text-holo-cyan">A.I. · ARCHIVE</span>
      </div>

      <div className="pointer-events-none absolute right-5 top-6 z-30 hidden items-center gap-2 font-mono text-[9px] tracking-[0.22em] text-muted-foreground sm:flex">
        <span className="holo-status-dot h-1.5 w-1.5 rounded-full bg-holo-cyan" />
        CULTURAL MEMORY ONLINE
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-5 pb-7 pt-20 sm:pb-10 sm:pt-24">
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
          <div className="absolute inset-x-[12%] top-[8%] h-[76%] rounded-full bg-holo-cyan/5 blur-3xl" />
          <div className="absolute left-1/2 top-[48%] h-44 w-44 -translate-x-1/2 rounded-full bg-lamp/10 blur-3xl sm:h-72 sm:w-72" />
          <div className="h-[48vh] min-h-[330px] w-full max-w-4xl sm:h-[58vh] sm:min-h-[440px]">
            {mounted ? <HeritageHologram /> : <div className="h-full w-full animate-breathe lamp-glow" />}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[8%] text-center sm:bottom-[4%]">
            <p className="font-mono text-[9px] tracking-[0.34em] text-holo-cyan sm:text-[10px]">
              MEMORY · CRAFT · STORY · PLACE
            </p>
            <h1 className="mt-3 font-display text-4xl italic leading-none text-lamp-soft sm:text-6xl lg:text-7xl">
              India, remembered alive.
            </h1>
          </div>
        </div>

        <div className="relative z-30 mt-3 flex flex-col items-center sm:mt-5">
          <p className="mb-5 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Step inside a living archive of monuments, oral histories, trails, master artisans and
            traditions from across India.
          </p>
          <Button
            size="lg"
            onClick={onEnter}
            className="h-12 rounded-md border border-lamp/40 px-8 font-mono text-xs tracking-[0.18em] shadow-hologram transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hologram-strong"
          >
            <Sparkles />
            GET STARTED
            <ArrowDown />
          </Button>
          <p className="mt-4 font-mono text-[8px] tracking-[0.28em] text-muted-foreground">
            36 STATES &amp; UNION TERRITORIES · ONE LIVING MEMORY
          </p>
        </div>
      </div>
    </section>
  );
}