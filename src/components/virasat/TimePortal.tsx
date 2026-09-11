import { useState, useMemo } from "react";
import heroMonument from "@/assets/hero-monument.jpg";
import { LANGUAGES, MONUMENTS, STATES, type Language, type StateName } from "@/data/virasat";
import { imagesForState } from "@/data/stateImages";

export function TimePortal({ onStateChange }: { onStateChange?: (s: StateName) => void }) {
  const [state, setState] = useState<StateName>("Uttar Pradesh");
  const [language, setLanguage] = useState<Language>("English");
  const [openId, setOpenId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const monuments = useMemo(() => MONUMENTS.filter((m) => m.state === state), [state]);
  const featured = monuments[0];
  const heroImage = imagesForState(state)[0] ?? heroMonument;
  const storyFor = (m: typeof MONUMENTS[number]) => m.stories[language] ?? m.stories.English;

  const selectState = (s: StateName) => {
    setState(s);
    setPlayingId(null);
    setOpenId(null);
    onStateChange?.(s);
  };

  return (
    <div className="animate-rise">
      <div className="relative">
        <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-lamp-glow blur-3xl opacity-20" />
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Title, Subtitle, States, Language */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-3">
              (A) TIME PORTAL
            </p>
            <h2 className="font-display text-4xl lg:text-5xl italic leading-tight text-white mb-4">
              Stone keeps a record of the light.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-8">
              Interactive monument stories, narrated in the languages the stones first heard. Choose a state, choose a tongue, and step through.
            </p>

            {/* State selection buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {STATES.map((st) => (
                <button
                  key={st}
                  onClick={() => selectState(st)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    st === state
                      ? "bg-amber-500 text-black font-semibold"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Language Selection */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400">LANGUAGE</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-black/80 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} className="bg-neutral-900 text-white">
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column: Hero Image with Gradient Overlay */}
          <div className="lg:col-span-7">
            <div className="relative h-[480px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                key={state}
                src={heroImage}
                alt={featured ? `${featured.name}, ${featured.place}` : `${state} heritage`}
                className="h-full w-full object-cover"
              />
              {featured && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl italic text-amber-200">{featured.name}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-amber-400/80 mt-1">
                        {featured.place} · {featured.era} · {featured.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => setPlayingId(playingId === featured.id ? null : featured.id)}
                      className="shrink-0 rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-400 transition-colors"
                    >
                      {playingId === featured.id ? "Pause" : "Play"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-gray-200 line-clamp-3">
                    {storyFor(featured)}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TimePortal;