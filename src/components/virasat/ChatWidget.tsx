import { useEffect, useRef, useState } from "react";
import { Bot, Mic, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askSathi, type SathiSource } from "@/lib/sathi.functions";
import { GREETINGS, generateResponse, type ChatLang } from "@/services/chatbot";

const CHAT_LANGS = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"] as const;

type TopicKey = "taj" | "artisans" | "record" | "monument" | "trail" | "guru" | "greet";

const REPLIES: Record<ChatLang, Record<TopicKey, string>> = {
  English: {
    taj: "The Taj Mahal (1632–1653) was commissioned by Shah Jahan for Mumtaz Mahal. Its Makrana marble changes hue through the day — pale pink at dawn, gold by moonlight. Open the Time Portal tab for the full narrated story.",
    artisans: "Head to Craft Connect — six verified artisans across UP, Gujarat, MP, Kerala, Odisha and Assam, each piece sealed on the heritage ledger. Filter by state to find makers near you.",
    record: "Open the Oral Vault tab, press the red record button, and speak your family's story. The waveform animates as you talk; press stop and it is saved to the vault index.",
    trail: "Trail Quest takes you through six heritage sites — Fatehpur Sikri to Majuli. Answer each riddle correctly to earn points; 2,300 points complete the trail.",
    guru: "In Guru-Shishya you can book live masterclasses — Rogan Art, Dhokra casting, Chikankari and more — taught directly by the last practising masters. Fees go straight to the guru.",
    greet: "Namaste! I am Virasat Sathi, your heritage companion. Ask me about monuments, artisans, oral histories or trails.",
  },
  Hindi: {
    taj: "ताज महल (1632–1653) का निर्माण शाहजहाँ ने मुमताज़ महल की स्मृति में करवाया था। इसका मकराना संगमरमर दिनभर रंग बदलता है। पूरी कहानी टाइम पोर्टल टैब में सुनें।",
    artisans: "क्राफ्ट कनेक्ट टैब में छह राज्यों के सत्यापित कारीगर मिलेंगे — प्रत्येक वस्तु हेरिटेज लेजर पर दर्ज है। राज्य चुनकर अपने नज़दीकी कारीगर खोजें।",
    record: "ओरल वॉल्ट टैब खोलें, लाल रिकॉर्ड बटन दबाएँ और अपने परिवार की कहानी सुनाएँ। रुकते ही रिकॉर्डिंग वॉल्ट में सहेज ली जाएगी।",
    trail: "ट्रेल क्वेस्ट में छह धरोहर स्थलों की पहेलियाँ हैं। सही उत्तर पर अंक मिलते हैं; 2,300 अंकों पर यात्रा पूरी होती है।",
    guru: "गुरु-शिष्य टैब में रोगन आर्ट, ढोकरा, चिकनकारी जैसी लुप्तप्राय कलाओं की लाइव मास्टरक्लास बुक करें — शुल्क सीधे गुरु को जाता है।",
    greet: "नमस्ते! मैं विरासत साथी हूँ। स्मारकों, कारीगरों, मौखिक कथाओं या ट्रेल के बारे में पूछिए।",
  },
  Bengali: {
    taj: "তাজ মহল (১৬৩২–১৬৫৩) শাহজাহান মুমতাজ মহলের স্মরণে নির্মাণ করেন। মাকরানা মার্বেল দিনের আলোয় রঙ বদলায়। পূর্ণ গল্প শুনতে টাইম পোর্টাল ট্যাব খুলুন।",
    artisans: "ক্রাফ্ট কানেক্ট ট্যাবে ছয় রাজ্যের যাচাইকৃত কারিগর রয়েছেন। রাজ্য বেছে আপনার কাছের শিল্পী খুঁজুন।",
    record: "ওরাল ভল্ট ট্যাবে লাল রেকর্ড বোতাম চেপে পারিবারিক গল্প বলুন — থামালেই তা সংরক্ষিত হবে।",
    trail: "ট্রেইল কোয়েস্টে ছয়টি ঐতিহ্য স্থানের ধাঁধা আছে। ২,৩০০ পয়েন্টে ট্রেইল সম্পূর্ণ হয়।",
    guru: "গুরু-শিষ্য ট্যাবে রোগন আর্ট, ঢোকরা, চিকনকারির লাইভ মাস্টারক্লাস বুক করুন।",
    greet: "নমস্কার! আমি বিরসত সাথী। স্মৃতিসৌধ, কারিগর বা ট্রেইল নিয়ে জিজ্ঞাসা করুন।",
  },
  Tamil: {
    taj: "தாஜ் மஹால் (1632–1653) ஷாஜகான் மும்தாஜ் நினைவாகக் கட்டினார். மக்ரானா பளிங்கு நாள் முழுவதும் நிறம் மாறும். முழுக் கதைக்கு டைம் போர்டல் தாவலைத் திறக்கவும்.",
    artisans: "கிராஃப்ட் கனெக்ட் தாவலில் ஆறு மாநிலங்களின் சரிபார்க்கப்பட்ட கைவினைஞர்கள் உள்ளனர். மாநிலம் தேர்ந்து அருகிலுள்ள கலைஞரைக் கண்டறியவும்.",
    record: "ஓரல் வால்ட் தாவலில் சிவப்பு பதிவு பட்டனை அழுத்தி உங்கள் குடும்பக் கதையைச் சொல்லுங்கள்.",
    trail: "ட்ரெயில் க்வெஸ்ட்டில் ஆறு பாரம்பரியத் தளங்களின் விடுகதைகள் உள்ளன; 2,300 புள்ளிகளில் பயணம் நிறைவடையும்.",
    guru: "குரு-சிஷ்ய தாவலில் ரோகன் கலை, தோக்ரா, சிகன்காரி நேரடி வகுப்புகளை முன்பதிவு செய்யலாம்.",
    greet: "வணக்கம்! நான் விராசத் சாத்தி. நினைவுச்சின்னங்கள், கைவினைஞர்கள் பற்றிக் கேளுங்கள்.",
  },
  Telugu: {
    taj: "తాజ్ మహల్ (1632–1653)ను షాజహాన్ ముంతాజ్ జ్ఞాపకార్థం నిర్మించారు. మక్రానా పాలరాయి రోజంతా రంగు మారుతుంది. పూర్తి కథ కోసం టైమ్ పోర్టల్ ట్యాబ్ తెరవండి.",
    artisans: "క్రాఫ్ట్ కనెక్ట్ ట్యాబ్‌లో ఆరు రాష్ట్రాల ధృవీకరించబడిన చేతివృత్తులదారులు ఉన్నారు.",
    record: "ఓరల్ వాల్ట్ ట్యాబ్ తెరిచి ఎర్రటి రికార్డ్ బటన్ నొక్కి మీ కుటుంబ కథ చెప్పండి.",
    trail: "ట్రైల్ క్వెస్ట్‌లో ఆరు వారసత్వ ప్రదేశాల ప్రశ్నలు ఉన్నాయి; 2,300 పాయింట్లతో యాత్ర పూర్తవుతుంది.",
    guru: "గురు-శిష్య ట్యాబ్‌లో రోగన్ ఆర్ట్, ధోక్రా, చికన్‌కారీ ప్రత్యక్ష తరగతులను బుక్ చేయండి.",
    greet: "నమస్తే! నేను విరాసత్ సాథి. స్మారకాలు, చేతివృత్తులు గురించి అడగండి.",
  },
  Marathi: {
    taj: "ताज महल (१६३२–१६५३) शाहजहानने मुमताज महलच्या स्मृतीसाठी बांधला. मकराणा संगमरवर दिवसभर रंग बदलतो. संपूर्ण कथेसाठी टाइम पोर्टल टॅब उघडा.",
    artisans: "क्राफ्ट कनेक्ट टॅबमध्ये सहा राज्यांचे प्रमाणित कारागीर आहेत. राज्य निवडून जवळचा कारागीर शोधा.",
    record: "ओरल व्हॉल्ट टॅब उघडा, लाल रेकॉर्ड बटण दाबा आणि कौटुंबिक कथा सांगा.",
    trail: "ट्रेल क्वेस्टमध्ये सहा वारसा स्थळांची कोडी आहेत; २,३०० गुणांवर ट्रेल पूर्ण होते.",
    guru: "गुरु-शिष्य टॅबमध्ये रोगन आर्ट, ढोकरा, चिकनकारीच्या थेट मास्टरक्लासची नोंदणी करा.",
    greet: "नमस्कार! मी विरासत साथी. स्मारके, कारागीर किंवा ट्रेलबद्दल विचारा.",
  },
  Gujarati: {
    taj: "તાજ મહેલ (1632–1653) શાહજહાંએ મુમતાઝ મહેલની યાદમાં બંધાવ્યો હતો. મકરાણાનું સંગમરમર દિવસભર રંગ બદલે છે. આખી વાર્તા માટે ટાઇમ પોર્ટલ ટૅબ ખોલો.",
    artisans: "ક્રાફ્ટ કનેક્ટ ટૅબમાં છ રાજ્યોના ચકાસેલા કારીગરો છે. રાજ્ય પસંદ કરી નજીકના કારીગર શોધો.",
    record: "ઓરલ વોલ્ટ ટૅબ ખોલીને લાલ રેકોર્ડ બટન દબાવો અને પારિવારિક વાર્તા બોલો.",
    trail: "ટ્રેલ ક્વેસ્ટમાં છ વારસા સ્થળોની કોયડાઓ છે; 2,300 પોઈન્ટ પર યાત્રા પૂરી થાય.",
    guru: "ગુરુ-શિષ્ય ટૅબમાં રોગન આર્ટ, ઢોકરા, ચિકનકારીના લાઇવ માસ્ટરક્લાસ બુક કરો.",
    greet: "નમસ્તે! હું વિરાસત સાથી છું. સ્મારકો, કારીગરો અથવા ટ્રેલ વિશે પૂછો.",
  },
};

const CHIPS: { key: TopicKey; label: Partial<Record<ChatLang, string>> & { English: string } }[] = [
  { key: "taj", label: { English: "Tell me about Taj Mahal", Hindi: "ताज महल के बारे में बताइए", Bengali: "তাজ মহল সম্পর্কে বলুন", Tamil: "தாஜ் மஹால் பற்றிச் சொல்லுங்கள்", Telugu: "తాజ్ మహల్ గురించి చెప్పండి", Marathi: "ताज महलाबद्दल सांगा", Gujarati: "તાજ મહેલ વિશે કહો" } },
  { key: "artisans", label: { English: "Find local artisans", Hindi: "स्थानीय कारीगर खोजें", Bengali: "স্থানীয় কারিগর খুঁজুন", Tamil: "உள்ளூர் கைவினைஞர்கள்", Telugu: "స్థానిక చేతివృత్తులదారులు", Marathi: "स्थानिक कारागीर शोधा", Gujarati: "સ્થાનિક કારીગરો શોધો" } },
  { key: "record", label: { English: "How to record a story?", Hindi: "कहानी कैसे रिकॉर्ड करें?", Bengali: "গল্প কীভাবে রেকর্ড করব?", Tamil: "கதையை எப்படி பதிவு செய்வது?", Telugu: "కథను ఎలా రికార్డ్ చేయాలి?", Marathi: "कथा कशी रेकॉर्ड करावी?", Gujarati: "વાર્તા કેવી રીતે રેકોર્ડ કરવી?" } },
];

type Msg = { id: number; from: "user" | "bot"; text: string };

function matchTopic(text: string): TopicKey {
  const t = text.toLowerCase();
  if (/taj|ताज|তাজ|தாஜ்|తాజ్|તાજ/.test(t)) return "taj";
  if (/artisan|craft|कारीगर|কারিগর|கைவினை|చేతివృత్తి|कारागीर|કારીગર/.test(t)) return "artisans";
  if (/record|story|रिकॉर्ड|कहानी|রেকর্ড|গল্প|கதை|பதிவு|కథ|రికార్డ్|कथा|वार्ता|વાર્તા/.test(t)) return "record";
  if (/trail|quest|ट्रेल|ট্রেইল|ட்ரெயில்|ట్రైల్|ટ્રેલ/.test(t)) return "trail";
  if (/guru|masterclass|गुरु|গুরু|குரு|గురు|ગુરુ/.test(t)) return "guru";
  return "greet";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<ChatLang>("English");
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 1, from: "bot", text: REPLIES.English.greet }]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [typing, setTyping] = useState(false);
  const idRef = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const changeLang = (l: ChatLang) => {
    setLang(l);
    setMsgs((prev) => [
      ...prev,
      { id: idRef.current++, from: "bot", text: REPLIES[l].greet },
    ]);
  };

  const respond = (text: string) => {
    setMsgs((prev) => [...prev, { id: idRef.current++, from: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((prev) => [
        ...prev,
        { id: idRef.current++, from: "bot", text: REPLIES[lang][matchTopic(text)] },
      ]);
      setTyping(false);
    }, 700);
  };

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    respond(text);
  };

  const voice = () => {
    if (recording || typing) return;
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      const chip = CHIPS[Math.floor(Math.random() * CHIPS.length)];
      respond(chip?.label[lang] ?? chip?.label.English ?? CHIPS[0]!.label.English);
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
                onChange={(e) => changeLang(e.target.value as ChatLang)}
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
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm text-foreground"
                  }`}
                >
                  {m.text}
                </p>
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
                onClick={() => !typing && respond(c.label[lang] ?? c.label.English)}
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
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Virasat Sathi chat"
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full border border-lamp/50 bg-lamp/15 text-lamp shadow-lamp backdrop-blur-sm transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
    </>
  );
}
