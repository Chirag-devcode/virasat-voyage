import { useEffect, useRef, useState } from "react";
import { Bot, Mic, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askSathi, type SathiSource } from "@/lib/sathi.functions";
import { GREETINGS, generateResponse, type ChatLang } from "@/services/chatbot";

const CHAT_LANGS = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"] as const;

const CHIPS: { key: string; label: Partial<Record<ChatLang, string>> & { English: string } }[] = [
  { key: "taj", label: { English: "Tell me about Taj Mahal", Hindi: "ताज महल के बारे में बताइए", Bengali: "তাজ মহল সম্পর্কে বলুন", Tamil: "தாஜ் மஹால் பற்றிச் சொல்லுங்கள்", Telugu: "తాజ్ మహల్ గురించి చెప్పండి", Marathi: "ताज महलाबद्दल सांगा", Gujarati: "તાજ મહેલ વિશે કહો" } },
  { key: "artisans", label: { English: "Find local artisans", Hindi: "स्थानीय कारीगर खोजें", Bengali: "স্থানীয় কারিগর খুঁজুন", Tamil: "உள்ளூர் கைவினைஞர்கள்", Telugu: "స్థానిక చేతివృత్తులదారులు", Marathi: "स्थानिक कारागीर शोधा", Gujarati: "સ્થાનિક કારીગરો શોધો" } },
  { key: "record", label: { English: "How to record a story?", Hindi: "कहानी कैसे रिकॉर्ड करें?", Bengali: "গল্প কীভাবে রেকর্ড করব?", Tamil: "கதையை எப்படி பதிவு செய்வது?", Telugu: "కథను ఎలా రికార్డ్ చేయాలి?", Marathi: "कथा कशी रेकॉर्ड करावी?", Gujarati: "વાર્તા કેવી રીતે રેકોર્ડ કરવી?" } },
  { key: "monument", label: { English: "Tell about monument", Hindi: "किसी स्मारक के बारे में बताइए", Bengali: "একটি স্মৃতিসৌধ নিয়ে বলুন", Tamil: "ஒரு நினைவுச்சின்னம் பற்றி", Telugu: "ఒక స్మారకం గురించి చెప్పండి", Marathi: "एका स्मारकाबद्दल सांगा", Gujarati: "કોઈ સ્મારક વિશે કહો" } },
];

type Msg = { id: number; from: "user" | "bot"; text: string; sources?: SathiSource[] };

const SOURCE_LABEL: Record<string, string> = {
  monuments: "Monument",
  crafts: "Craft",
  festivals: "Festival",
  dances_music: "Dance & music",
  oral_vault: "Oral tradition",
  cultural_trails: "Trail",
  guru_shishya: "Guru-Shishya",
  unesco_ich: "UNESCO ICH",
  states_uts: "State profile",
};

export function ChatWidget({ selectedState }: { selectedState?: string }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<ChatLang>("English");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [typing, setTyping] = useState(false);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ask = useServerFn(askSathi);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const openChat = () => {
    if (!open) {
      idRef.current = 1;
      setMsgs([{ id: idRef.current++, from: "bot", text: GREETINGS[lang] }]);
      setInput("");
    }
    setOpen((v) => !v);
  };

  const respond = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const history = msgs.map((m) => ({
      role: m.from === "user" ? ("user" as const) : ("assistant" as const),
      text: m.text,
    }));
    setMsgs((prev) => [...prev, { id: idRef.current++, from: "user", text: trimmed }]);
    setTyping(true);

    let answer = "";
    let sources: SathiSource[] = [];
    try {
      const res = await ask({
        data: {
          message: trimmed,
          language: lang,
          selectedState: selectedState ?? null,
          history: history.slice(-8),
        },
      });
      answer = res.answer?.trim() ?? "";
      sources = res.sources ?? [];
    } catch {
      answer = "";
    }

    if (!answer) {
      // Offline / AI-unavailable fallback: local heritage knowledge engine.
      answer = await generateResponse({
        userMessage: trimmed,
        selectedState: selectedState ?? undefined,
        history,
        language: lang,
      });
    }

    setMsgs((prev) => [
      ...prev,
      { id: idRef.current++, from: "bot", text: answer, sources: sources.slice(0, 4) },
    ]);
    setTyping(false);
  };

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    void respond(text);
  };

  const voice = () => {
    if (recording || typing) return;
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      const chip = CHIPS[Math.floor(Math.random() * CHIPS.length)];
      void respond(chip?.label[lang] ?? chip?.label.English ?? CHIPS[0]!.label.English);
    }, 1800);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-lamp/30 bg-popover shadow-lamp animate-rise">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl border border-lamp/50 bg-lamp/10 text-lamp">
                <Bot className="size-4.5" />
              </div>
              <div>
                <p className="font-display text-sm italic text-lamp-soft">Virasat Sathi</p>
                <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
                  HERITAGE ASSISTANT
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as ChatLang)}
                aria-label="Chat language"
                className="rounded-lg border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-lamp/60"
              >
                {CHAT_LANGS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  <p
                    className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm text-foreground"
                    }`}
                  >
                    {m.text}
                  </p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1 px-1.5">
                      {m.sources.map((s, i) => (
                        <span
                          key={`${m.id}-${i}`}
                          title={s.source ?? undefined}
                          className="rounded-full border border-lamp/30 px-2 py-0.5 font-mono text-[9px] tracking-wider text-muted-foreground"
                        >
                          {SOURCE_LABEL[s.table] ?? s.table} · {s.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <p className="w-fit animate-pulse rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-muted-foreground">
                …
              </p>
            )}
            {recording && (
              <p className="w-fit rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 font-mono text-[10px] tracking-widest text-primary-foreground">
                ● LISTENING…
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-3">
            {CHIPS.map((c) => (
              <button
                key={c.key}
                onClick={() => void respond(c.label[lang] ?? c.label.English)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-lamp/50 hover:text-foreground"
              >
                {c.label[lang] ?? c.label.English}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "English" ? "Ask about heritage…" : "अपना प्रश्न लिखें…"}
              className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-lamp/60"
            />
            <button
              onClick={voice}
              aria-label="Voice query"
              className={`grid size-10 shrink-0 place-items-center rounded-lg border transition-colors ${
                recording
                  ? "animate-pulse border-lamp bg-lamp/15 text-lamp"
                  : "border-border text-muted-foreground hover:border-lamp/50 hover:text-foreground"
              }`}
            >
              <Mic className="size-4" />
            </button>
            <button
              onClick={send}
              aria-label="Send message"
              disabled={!input.trim() || typing}
              className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={openChat}
        aria-label="Open Virasat Sathi chat"
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full border border-lamp/50 bg-lamp/15 text-lamp shadow-lamp backdrop-blur-sm transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
    </>
  );
}
