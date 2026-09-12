import React, { useState } from "react";
import { Play, Pause, Volume2, Globe, Landmark, ShieldCheck } from "lucide-react";
import { MONUMENTS, STATES, Language } from "../../data/virasat";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80";

export const TimePortal: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>("Uttar Pradesh");
  const [selectedLang, setSelectedLang] = useState<Language>("English");
  const [isPlaying, setIsPlaying] = useState(false);

  // Find monument matching the active state, fallback to first entry
  const currentMonument = MONUMENTS.find((m) => m.state === selectedState) || MONUMENTS[0];

  // Dynamic narration text based on selected language
  const storyText = currentMonument.stories[selectedLang] || currentMonument.stories.English;

  return (
    <section id="time-portal" className="w-full bg-slate-50 text-slate-900 py-16 px-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Government Portal Header */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-6">
              {/* State Filter Buttons */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Select State Archive
                </label>
                <div className="flex flex-wrap gap-2">
                  {STATES.map((st) => (
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

              {/* Language Selector Dropdown */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Narration Language
                </label>
                <div className="relative">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value as Language)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md py-2.5 px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="English">English</option>
                    <option value="हिन्दी">हिन्दी (Hindi)</option>
                    <option value="ગુજરાતી">ગુજરાતી (Gujarati)</option>
                    <option value="മലയാളം">മലയാളം (Malayalam)</option>
                    <option value="ଓଡ଼ିଆ">ଓଡ଼ିଆ (Odia)</option>
                    <option value="অসমীয়া">অসমীয়া (Assamese)</option>
                  </select>
                  <Globe className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Monument Text Metadata */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded border border-amber-300 uppercase">
                  {currentMonument.era}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  DURATION: {currentMonument.duration}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {currentMonument.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {storyText}
              </p>
            </div>
          </div>

          {/* Monument Image Card */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[380px] rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-slate-950 flex flex-col justify-between p-4 group">
              
              {/* Main Image with Graceful Error Fallback */}
              <img
                key={currentMonument.id}
                src={currentMonument.image}
                alt={currentMonument.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-slate-900/90 backdrop-blur-md text-amber-400 font-mono text-xs font-bold px-3 py-1.5 rounded-md border border-slate-700 shadow">
                  📍 {currentMonument.place}, {currentMonument.state}
                </span>
              </div>

              {/* Bottom Media Bar */}
              <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-lg flex items-center justify-between text-white">
                <div className="space-y-0.5">
                  <div className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" /> NARRATION MODE: {selectedLang.toUpperCase()}
                  </div>
                  <div className="text-sm font-semibold truncate max-w-xs sm:max-w-md">
                    {currentMonument.name}
                  </div>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-3 rounded-full font-bold shadow-md transition-all flex items-center justify-center shrink-0"
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