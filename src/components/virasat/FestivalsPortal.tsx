import React, { useState } from "react";
import { UPCOMING_FESTIVALS, INTERSTATE_COMPETITIONS, Competition } from "../../data/festivals";
import { Bell, Trophy, Calendar, MapPin, Users, Award, X, CheckCircle } from "lucide-react";

export const FestivalsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "competitions">("upcoming");
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    state: "",
    contact: "",
    membersCount: ""
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setTimeout(() => {
      setIsRegistered(false);
      setSelectedComp(null);
      setFormData({ teamName: "", captainName: "", state: "", contact: "", membersCount: "" });
    }, 2500);
  };

  return (
    <section id="festivals-portal" className="w-full bg-stone-950 text-stone-100 py-16 px-6 border-t border-stone-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-widest uppercase mb-1">
              <Bell className="w-4 h-4 animate-bounce" /> Live Cultural Tracker
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-100">Festivals & Inter-State Arenas</h2>
            <p className="text-stone-400 text-sm mt-1">
              Discover festivals occurring in the 10-day window and register your team for traditional competitive events.
            </p>
          </div>

          {/* Tab Navigation Controls */}
          <div className="flex bg-stone-900 p-1.5 rounded-lg border border-stone-800">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                activeTab === "upcoming" ? "bg-amber-500 text-stone-950 font-semibold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Calendar className="w-4 h-4" /> 10-Day Festival Radar
            </button>
            <button
              onClick={() => setActiveTab("competitions")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                activeTab === "competitions" ? "bg-amber-500 text-stone-950 font-semibold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Trophy className="w-4 h-4" /> Inter-State Competitions
            </button>
          </div>
        </div>

        {/* Tab 1: Upcoming Festivals Window */}
        {activeTab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_FESTIVALS.map((fest) => (
              <div key={fest.id} className="bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 rounded-xl p-6 flex flex-col justify-between transition space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/20">
                      {fest.dateStr}
                    </span>
                    <span className="text-stone-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-500" /> {fest.state}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-100 font-serif">{fest.name}</h3>
                  <p className="text-stone-300 text-xs leading-relaxed">{fest.description}</p>
                </div>

                <div className="bg-stone-950/70 p-3.5 rounded-lg border border-stone-800/80 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-500">Historical Origin & Fact</div>
                  <p className="text-stone-400 text-xs italic">"{fest.historicalFact}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Inter-State Competition Registration */}
        {activeTab === "competitions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERSTATE_COMPETITIONS.map((comp) => (
              <div key={comp.id} className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {comp.type}
                    </span>
                    <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Prize: {comp.prizePool}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-100">{comp.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 pt-2 border-t border-stone-800">
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-stone-500" /> {comp.location}</div>
                    <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-stone-500" /> {comp.teamSize}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedComp(comp)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition"
                >
                  Register Team Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Team Registration Modal Form */}
        {selectedComp && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg p-6 relative space-y-5">
              <button 
                onClick={() => setSelectedComp(null)}
                className="absolute right-4 top-4 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">Inter-State Official Entry</span>
                <h3 className="text-xl font-bold font-serif text-stone-100">{selectedComp.title}</h3>
              </div>

              {isRegistered ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-stone-100">Team Successfully Registered!</h4>
                  <p className="text-xs text-stone-400">Confirmation details sent to captain's contact. Prepare for championship qualification.</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Registered Team Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Konkan Govindas / Alappuzha Rowers" 
                      value={formData.teamName}
                      onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Captain Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        value={formData.captainName}
                        onChange={(e) => setFormData({...formData, captainName: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Origin State</label>
                      <input 
                        type="text" 
                        required
                        placeholder="State / Union Territory" 
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Contact Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 9876543210" 
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Total Roster Count</label>
                      <input 
                        type="number" 
                        required
                        placeholder={selectedComp.teamSize} 
                        value={formData.membersCount}
                        onChange={(e) => setFormData({...formData, membersCount: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition"
                  >
                    Submit Official Entry
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FestivalsPortal;