import { ArrowDown, Sparkles, Landmark, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeritageHologram } from "./HeritageHologram";
import { Link } from '@tanstack/react-router';
import { Footer } from "./Footer";
import { FestivalsPortal } from "./FestivalsPortal";

export function LandingExperience({ onEnter }: { onEnter: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Official Government Top Header Strip */}
      <div className="w-full bg-slate-900 text-slate-100 text-[11px] py-1.5 px-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-semibold tracking-wider text-amber-500">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>भारत सरकार | GOVERNMENT OF INDIA</span>
          </div>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300 font-medium">संस्कृति मंत्रालय | MINISTRY OF CULTURE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Portal
          </span>
        </div>
      </div>

      {/* Landing Hero Section */}
      <section className="relative isolate flex min-h-[92vh] w-full flex-col overflow-hidden bg-gradient-to-b from-amber-50/40 via-slate-50 to-white border-b border-slate-200">
        
        {/* Subtle Decorative Civic Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Brand Navigation Header */}
        <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow-sm border border-slate-700">
              <Landmark className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-slate-900 tracking-tight">Virasat AI</span>
              <span className="block font-mono text-[9px] tracking-[0.25em] text-amber-600 font-semibold uppercase">National Heritage Repository</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 font-mono text-xs tracking-wide text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              CIVIC DIGITAL VAULT ONLINE
            </div>

            <Link
              to="/login"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 font-mono text-xs font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-100 hover:border-slate-400"
            >
              Portal Login →
            </Link>
          </div>
        </div>

        {/* Main Hero Content Area */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-5 pb-10 pt-8">
          
          <div className="h-[42vh] min-h-[300px] w-full max-w-4xl sm:h-[50vh] sm:min-h-[400px]">
            {mounted ? <HeritageHologram /> : <div className="h-full w-full bg-slate-200/60 rounded-xl animate-pulse" />}
          </div>

          <div className="relative z-30 mt-4 flex flex-col items-center text-center">
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-amber-700 uppercase mb-2">
              ARCHIVES · MONUMENTS · ORAL TRADITION · ARTISAN GUILDS
            </p>

            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-6xl">
              Preserving India's Living Heritage
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600 text-sm leading-relaxed sm:text-base">
              An official digital initiative dedicated to preserving tangible monuments, oral histories, artisan communities, and cultural trails across India.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                onClick={onEnter}
                className="h-12 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 px-8 font-mono text-xs tracking-wider shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                EXPLORE ARCHIVE
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>

            <p className="mt-4 font-mono text-[9px] font-semibold tracking-[0.2em] text-slate-500">
              36 STATES &amp; UNION TERRITORIES · NATIONAL DIGITAL REPOSITORY
            </p>
          </div>
        </div>
      </section>

      {/* Festivals & Inter-State Competition Radar */}
      <FestivalsPortal />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default LandingExperience;