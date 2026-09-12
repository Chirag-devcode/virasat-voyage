import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TimePortal } from "@/components/virasat/TimePortal";
import { OralVault } from "@/components/virasat/OralVault";
import { TrailQuest } from "@/components/virasat/TrailQuest";
import { CraftConnect } from "@/components/virasat/CraftConnect";
import { GuruShishya } from "@/components/virasat/GuruShishya";
import { ChatWidget } from "@/components/virasat/ChatWidget";
import { StatesAtlas } from "@/components/virasat/StatesAtlas";
import { LandingExperience } from "@/components/virasat/LandingExperience";
import { Footer } from "@/components/virasat/Footer";

const TITLE = "Virasat AI — Living Archive of Indian Heritage";
const DESC =
  "Explore monument stories, record oral histories, follow gamified heritage trails and buy blockchain-verified crafts from six Indian states.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TABS = [
  { id: "time", num: "01", label: "Time Portal" },
  { id: "vault", num: "02", label: "Audio Visual Vault" },
  { id: "trail", num: "03", label: "Trail Quest" },
  { id: "craft", num: "04", label: "Craft Connect" },
  { id: "guru", num: "05", label: "Guru-Shishya" },
  { id: "atlas", num: "06", label: "States Atlas" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Index() {
  const [tab, setTab] = useState<TabId>("time");
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <LandingExperience onEnter={() => setEntered(true)} />;
  }

  return (
    <div id="explore" className="min-h-screen bg-background animate-dashboard-enter">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl italic leading-none text-lamp-soft">Virasat</span>
              <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground">
                A.I. — HERITAGE
              </span>
            </div>
            <span className="hidden font-mono text-[10px] tracking-[0.25em] text-muted-foreground sm:block">
              06 STATES · ARCHIVE 2026
            </span>
          </div>

          <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Modules">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
                className={`relative shrink-0 border-b-2 px-3.5 py-3 text-sm transition-colors ${
                  tab === t.id
                    ? "border-lamp text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`mr-1.5 font-mono text-[10px] ${tab === t.id ? "text-lamp" : ""}`}>
                  {t.num}
                </span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        {tab === "time" && <TimePortal />}
        {tab === "vault" && <OralVault />}
        {tab === "trail" && <TrailQuest />}
        {tab === "craft" && <CraftConnect />}
        {tab === "guru" && <GuruShishya />}
        {tab === "atlas" && <StatesAtlas />}
      </main>

      
      <Footer />

      <ChatWidget />
    </div>
  );
}
