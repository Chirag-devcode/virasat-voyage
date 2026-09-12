import React, { useState } from "react";
import {
  MapPin,
  Search,
  Building2,
  Sparkles,
  BookOpen,
  Palette,
  Compass,
  ChevronRight,
  Award,
  Globe,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface Monument {
  name: string;
  period: string;
  type: string;
}

interface Craft {
  name: string;
  tag: string;
}

interface StateHeritage {
  id: string;
  name: string;
  code: string;
  capital: string;
  region: "North" | "South" | "East" | "West" | "Central" | "North-East";
  image: string;
  description: string;
  stats: {
    unescoSites: number;
    giTags: number;
    monuments: number;
    craftGuilds: number;
  };
  famousMonuments: Monument[];
  traditionalCrafts: Craft[];
  culturalHighlights: string[];
}

const STATES_DATA: StateHeritage[] = [
  {
    id: "up",
    name: "Uttar Pradesh",
    code: "UP",
    capital: "Lucknow",
    region: "North",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    description:
      "The historical heartland of India's classical architecture, ancient riverfront cities, and regal handloom traditions.",
    stats: { unescoSites: 3, giTags: 34, monuments: 742, craftGuilds: 120 },
    famousMonuments: [
      { name: "Fatehpur Sikri", period: "1571 CE", type: "Imperial Mughal Citadel" },
      { name: "Taj Mahal", period: "1632 CE", type: "Mughal Architecture" },
      { name: "Sarnath Dhamek Stupa", period: "249 BCE", type: "Buddhist Heritage" },
    ],
    traditionalCrafts: [
      { name: "Chikan Embroidery", tag: "GI Tagged" },
      { name: "Banarasi Brocade Silk", tag: "GI Tagged" },
      { name: "Moradabad Brassware", tag: "Handicraft" },
    ],
    culturalHighlights: ["Kathak Dance Tradition", "Varanasi Ganga Aarti", "Awadhi Culinary Legacy"],
  },
  {
    id: "gj",
    name: "Gujarat",
    code: "GJ",
    capital: "Gandhinagar",
    region: "West",
    image: "https://images.unsplash.com/photo-1609947017136-9efa23bba2ed?auto=format&fit=crop&w=800&q=80",
    description:
      "Cradle of subterranean stepwells, intricate double-ikat weaving, and Harappan maritime trade settlements.",
    stats: { unescoSites: 4, giTags: 17, monuments: 512, craftGuilds: 95 },
    famousMonuments: [
      { name: "Rani ki Vav", period: "1063 CE", type: "Maru-Gurjara Stepwell" },
      { name: "Sun Temple, Modhera", period: "1026 CE", type: "Solanki Dynastic Style" },
      { name: "Dholavira", period: "2500 BCE", type: "Harappan Metropolis" },
    ],
    traditionalCrafts: [
      { name: "Patan Double Ikat Patola", tag: "GI Tagged" },
      { name: "Kutch Rogan Painting", tag: "Rare Craft" },
      { name: "Tangaliya Shawl Weaving", tag: "GI Tagged" },
    ],
    culturalHighlights: ["Garba & Raas Folk Arts", "Rann Craft Guilds", "Sankheda Lacquered Woodwork"],
  },
  {
    id: "mp",
    name: "Madhya Pradesh",
    code: "MP",
    capital: "Bhopal",
    region: "Central",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
    description:
      "Center of Chandela temple craftsmanship, prehistoric rock shelters, and historic hand-blocked textiles.",
    stats: { unescoSites: 3, giTags: 12, monuments: 860, craftGuilds: 88 },
    famousMonuments: [
      { name: "Khajuraho Group", period: "950 CE", type: "Nagara Architecture" },
      { name: "Sanchi Stupa", period: "3rd Century BCE", type: "Mauryan Heritage" },
      { name: "Bhimbetka Shelters", period: "10,000 BCE", type: "Paleolithic Rock Art" },
    ],
    traditionalCrafts: [
      { name: "Chanderi Weaving", tag: "GI Tagged" },
      { name: "Maheshwari Saree", tag: "GI Tagged" },
      { name: "Bagh Hand Block Print", tag: "Heritage Print" },
    ],
    culturalHighlights: ["Gond Tribal Painting", "Malwa Folk Traditions", "Tansen Music Heritage"],
  },
  {
    id: "od",
    name: "Odisha",
    code: "OD",
    capital: "Bhubaneswar",
    region: "East",
    image: "https://images.unsplash.com/photo-1608889825103-705188729586?auto=format&fit=crop&w=800&q=80",
    description:
      "Land of Kalinga architectural marvels, palm-leaf manuscripts, and ancient silk ikat weaving guilds.",
    stats: { unescoSites: 1, giTags: 19, monuments: 630, craftGuilds: 110 },
    famousMonuments: [
      { name: "Konark Sun Temple", period: "1250 CE", type: "Kalinga Stone Chariot" },
      { name: "Jagannath Temple, Puri", period: "1161 CE", type: "Kalinga Sacred Temple" },
      { name: "Udayagiri Caves", period: "2nd Century BCE", type: "Rock-cut Chambers" },
    ],
    traditionalCrafts: [
      { name: "Pattachitra Scroll Painting", tag: "GI Tagged" },
      { name: "Sambalpuri Bandha Ikat", tag: "GI Tagged" },
      { name: "Cuttack Silver Filigree", tag: "Craft Craft" },
    ],
    culturalHighlights: ["Odissi Classical Dance", "Chhau Masked Dance", "Ratha Yatra Chariot Festival"],
  },
  {
    id: "kl",
    name: "Kerala",
    code: "KL",
    capital: "Thiruvananthapuram",
    region: "South",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    description:
      "Maritime spice route hub known for wooden temple architecture, classical performance, and natural dyes.",
    stats: { unescoSites: 2, giTags: 31, monuments: 380, craftGuilds: 75 },
    famousMonuments: [
      { name: "Vadakkunnathan Temple", period: "10th Century CE", type: "Keralite Wood Architecture" },
      { name: "Bekal Fort", period: "1650 CE", type: "Coastal Citadel" },
      { name: "Padmanabhapuram Palace", period: "1601 CE", type: "Traditional Wooden Palace" },
    ],
    traditionalCrafts: [
      { name: "Kasavu Handloom Saree", tag: "GI Tagged" },
      { name: "Aranmula Kannadi Mirror", tag: "GI Tagged Metal Metalwork" },
      { name: "Nettur Petti Wooden Chest", tag: "Heritage Woodwork" },
    ],
    culturalHighlights: ["Kathakali Dance Drama", "Koodiyattam Sanskrit Theatre", "Theyyam Ritual Arts"],
  },
  {
    id: "as",
    name: "Assam",
    code: "AS",
    capital: "Dispur",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80",
    description:
      "Gateway to Brahmaputra riverine cultures, sacred neo-Vaishnavite Monasteries (Satras), and golden silk weaving.",
    stats: { unescoSites: 2, giTags: 11, monuments: 290, craftGuilds: 60 },
    famousMonuments: [
      { name: "Majuli Satras", period: "15th Century CE", type: "Neo-Vaishnavite Monasteries" },
      { name: "Rang Ghar, Sivasagar", period: "1746 CE", type: "Ahom Amphitheatre" },
      { name: "Kamakhya Temple", period: "8th-17th Century CE", type: "Nilachal Architecture" },
    ],
    traditionalCrafts: [
      { name: "Muga Silk Weaving", tag: "GI Tagged Golden Silk" },
      { name: "Majuli Mask Making", tag: "Heritage Craft" },
      { name: "Assamese Jaapi & Cane Craft", tag: "GI Tagged" },
    ],
    culturalHighlights: ["Bihu Folk Festival", "Sattriya Classical Dance", "Bhakti Drama Traditions"],
  },
];

const REGIONS = ["All", "North", "South", "East", "West", "Central", "North-East"] as const;

export function StatesAtlas() {
  const [selectedStateId, setSelectedStateId] = useState<string>("up");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<typeof REGIONS[number]>("All");

  const filteredStates = STATES_DATA.filter((st) => {
    const matchesRegion = activeRegion === "All" || st.region === activeRegion;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.traditionalCrafts.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const activeState = STATES_DATA.find((s) => s.id === selectedStateId) || STATES_DATA[0];

  return (
    <section id="states-atlas" className="w-full bg-slate-50 text-slate-900 py-10 px-4 md:px-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-300 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-bold tracking-widest uppercase mb-1">
              <Compass className="w-4 h-4 text-amber-600" /> SECTION (F) · STATES HERITAGE ATLAS
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">
              Interactive Cultural & State Atlas
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Explore regional monuments, GI-tagged heritage crafts, and indigenous architectural footprints across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search state, craft or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> REGIONS:
          </span>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                activeRegion === region
                  ? "bg-slate-900 text-amber-400 border border-slate-800 shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Main Grid: Sidebar list + Detail view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: States List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-500 uppercase px-1">
              <span>Select State ({filteredStates.length})</span>
              <span>Region</span>
            </div>

            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredStates.map((st) => {
                const isSelected = st.id === activeState.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStateId(st.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-slate-900 ring-1 ring-amber-500 shadow-sm"
                        : "bg-white hover:bg-slate-100/80 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-slate-800">
                        {st.code}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900">{st.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-600" /> Capital: {st.capital}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {st.region}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? "text-amber-600" : "text-slate-400"}`} />
                    </div>
                  </button>
                );
              })}

              {filteredStates.length === 0 && (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  No state heritage matching your search criteria.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Selected State Details */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            {/* Banner Header */}
            <div className="relative h-48 md:h-56 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={activeState.image}
                alt={activeState.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {activeState.region} INDIA
                    </span>
                    <span className="text-xs text-slate-300 font-mono">CODE: {activeState.code}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">{activeState.name}</h2>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-amber-400" /> Capital City: <span className="text-white font-bold">{activeState.capital}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">{activeState.description}</p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">UNESCO Sites</div>
                <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">{activeState.stats.unescoSites}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">GI Tags</div>
                <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">{activeState.stats.giTags}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Protected Sites</div>
                <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">{activeState.stats.monuments}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Craft Guilds</div>
                <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">{activeState.stats.craftGuilds}</div>
              </div>
            </div>

            {/* Sub-sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Famous Monuments */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-600" /> Notable Heritage Sites
                </h4>
                <div className="space-y-2">
                  {activeState.famousMonuments.map((m) => (
                    <div key={m.name} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-serif font-bold text-xs text-slate-900">{m.name}</div>
                        <div className="text-[11px] text-slate-500">{m.type}</div>
                      </div>
                      <span className="font-mono text-[10px] font-semibold bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        {m.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Handicrafts */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-600" /> Master Craft Traditions
                </h4>
                <div className="space-y-2">
                  {activeState.traditionalCrafts.map((c) => (
                    <div key={c.name} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="font-serif font-bold text-xs text-slate-900">{c.name}</div>
                      <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-600" /> {c.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural Highlights Footer */}
            <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30 space-y-2">
              <div className="font-mono text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" /> Intangible Cultural Traditions
              </div>
              <div className="flex flex-wrap gap-2">
                {activeState.culturalHighlights.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-white text-slate-800 font-medium px-2.5 py-1 rounded border border-slate-200 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-amber-600" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatesAtlas;