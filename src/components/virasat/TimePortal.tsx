import React, { useState } from "react";
import { Play, Pause, Volume2, Globe, Landmark, ShieldCheck } from "lucide-react";
import { MONUMENTS } from "../../data/virasat";

export const TimePortal: React.FC = () => {
  // Available States including Haryana
  const states = ["Uttar Pradesh", "Haryana", "Gujarat", "Madhya Pradesh", "Kerala", "Odisha", "Assam"];
  
  const [selectedState, setSelectedState] = useState("Haryana");
  const [selectedLang, setSelectedLang] = useState("English");
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter monument based on selected state, defaulting to first available item
  const currentMonument = MONUMENTS.find((m) => m.state === selectedState) || MONUMENTS[0];

  return (
    <section id="time-portal" className="w-full bg-slate-50 text-slate-900 py-16 px-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Civic Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-300 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-bold tracking-widest uppercase mb-1">
              <Landmark className="w-4 h-4 text-amber-600" /> SECTION (A) · TIME PORTAL ARCHIVE
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Stone Keeps a Record of the Light
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Interactive audio-visual monument narratives preserved in native languages. Select a state to explore its epic history.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-md border border-slate-300 shadow-sm text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ministry of Culture Verified Record</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            
            {/* State Selection Filter */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
                Select State Archive
              </label>
              <div className="flex flex-wrap gap-2">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all ${
                      selectedState === st
                        ? "bg-slate-900 text-amber-400 border border-slate-800 shadow-sm"
                        : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                Narration Language
              </label>
              <div className="relative">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md py-2.5 px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  {currentMonument.languages?.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  )) || <option value="English">English</option>}
                </select>
                <Globe className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Monument Text Details */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="inline-block bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded border border-amber-300 uppercase">
                {currentMonument.period}
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {currentMonument.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentMonument.description}
              </p>
            </div>

          </div>

          {/* Right Display Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-slate-900 aspect-video group">
              
              {/* Monument Background Visual */}
              <img
                src={currentMonument.image}
                alt={currentMonument.name}
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Details Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-slate-900/90 backdrop-blur-md text-amber-400 font-mono text-xs font-bold px-3 py-1 rounded-md border border-slate-700">
                  {currentMonument.place}, {currentMonument.state}
                </span>
              </div>

              {/* Floating Audio Controls */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-lg flex items-center justify-between text-white">
                <div className="space-y-0.5">
                  <div className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" /> NARRATION: {selectedLang.toUpperCase()}
                  </div>
                  <div className="text-sm font-semibold truncate max-w-xs sm:max-w-md">
                    {currentMonument.name}
                  </div>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-3 rounded-full font-bold shadow-md transition flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TimePortal;