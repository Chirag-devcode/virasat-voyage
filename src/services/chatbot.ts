/**
 * Virasat Sathi — heritage assistant response layer.
 *
 * `generateResponse()` is the single entry point used by the chat widget. It is
 * async on purpose: an AI backend can later replace the local knowledge engine
 * without touching the UI (see `generateLocalResponse` swap point below).
 */

import { CRAFTS, MASTERCLASSES, MONUMENTS, RECORDINGS, STATES, TRAIL } from "@/data/virasat";

export type ChatLang =
  | "English"
  | "Hindi"
  | "Bengali"
  | "Tamil"
  | "Telugu"
  | "Marathi"
  | "Gujarati";

export type ChatTurn = { role: "user" | "assistant"; text: string };

export interface ChatRequest {
  userMessage: string;
  selectedState?: string;
  history?: ChatTurn[];
  language?: ChatLang;
}

export type Intent =
  | "greeting"
  | "monument"
  | "monument_generic"
  | "artisan"
  | "craft"
  | "festival"
  | "oral_record"
  | "oral_history"
  | "trail"
  | "guru"
  | "figure"
  | "unesco"
  | "help"
  | "thanks"
  | "unknown";

/* ------------------------------------------------------------------ */
/* Knowledge base                                                      */
/* ------------------------------------------------------------------ */

type MonumentFact = {
  keys: string[];
  name: string;
  where: string;
  built: string;
  by: string;
  style: string;
  unesco: string;
  note: string;
};

const MONUMENT_FACTS: MonumentFact[] = [
  {
    keys: ["taj mahal", "taj", "ताज"],
    name: "Taj Mahal",
    where: "Agra, on the right bank of the Yamuna, Uttar Pradesh",
    built: "c. 1632–1653 CE",
    by: "Mughal emperor Shah Jahan, as a mausoleum for Mumtaz Mahal",
    style: "Mughal architecture — Persian, Timurid and Indian idioms; a perfectly symmetrical charbagh garden, a 73 m dome, four detached minarets and pietra dura inlay in Makrana marble",
    unesco: "UNESCO World Heritage Site since 1983",
    note: "The marble reads pale pink at dawn, white at noon and gold under moonlight — the reason it is called a monument built out of light as much as stone.",
  },
  {
    keys: ["fatehpur", "sikri", "panch mahal", "buland darwaza"],
    name: "Fatehpur Sikri",
    where: "near Agra, Uttar Pradesh",
    built: "1571–1585 CE",
    by: "Emperor Akbar, as his imperial capital",
    style: "Red sandstone Mughal-Rajput fusion — Panch Mahal, Diwan-i-Khas, Jama Masjid and the 54 m Buland Darwaza",
    unesco: "UNESCO World Heritage Site since 1986",
    note: "The city was abandoned within about fifteen years, most likely because its water supply failed.",
  },
  {
    keys: ["varanasi", "kashi", "ghat", "banaras"],
    name: "The Ghats of Varanasi",
    where: "Varanasi, Uttar Pradesh",
    built: "most surviving ghats 18th century CE, on a far older sacred city",
    by: "Maratha, Rajput and Bhonsle patrons",
    style: "Around 84 stone ghats stepping into the Ganga, with riverside temples and palaces",
    unesco: "not inscribed, but among the oldest continuously lived-in cities in the world",
    note: "Ganga Aarti at Dashashwamedh Ghat each evening is the living ritual heart of the city.",
  },
  {
    keys: ["rani ki vav", "stepwell", "patan"],
    name: "Rani ki Vav",
    where: "Patan, Gujarat",
    built: "c. 1063 CE",
    by: "Queen Udayamati, in memory of the Solanki king Bhimdev I",
    style: "Maru-Gurjara stepwell on seven levels with more than 500 principal sculptures, many of Vishnu's avatars",
    unesco: "UNESCO World Heritage Site since 2014",
    note: "It is an inverted temple — you descend through architecture instead of climbing it.",
  },
  {
    keys: ["dholavira", "harappan", "indus"],
    name: "Dholavira",
    where: "Khadir island, Rann of Kutch, Gujarat",
    built: "c. 3000–1500 BCE",
    by: "the Harappan (Indus Valley) civilisation",
    style: "A walled city of citadel, middle and lower town, with the world's earliest known water-harvesting reservoirs",
    unesco: "UNESCO World Heritage Site since 2021",
    note: "Its ten-sign signboard is one of the largest inscriptions of the undeciphered Indus script.",
  },
  {
    keys: ["khajuraho"],
    name: "Khajuraho Group of Monuments",
    where: "Chhatarpur district, Madhya Pradesh",
    built: "c. 950–1050 CE",
    by: "the Chandela dynasty",
    style: "Nagara-style temples in sandstone; 25 of an original 85 survive, Kandariya Mahadeva the largest",
    unesco: "UNESCO World Heritage Site since 1986",
    note: "Only a small fraction of the carving is erotic; most narrates court, war, music and daily life.",
  },
  {
    keys: ["sanchi", "stupa"],
    name: "Sanchi Stupa",
    where: "Raisen district, Madhya Pradesh",
    built: "3rd century BCE onward, gateways c. 1st century BCE",
    by: "Emperor Ashoka, expanded by the Satavahanas",
    style: "Hemispherical brick-and-stone stupa with four carved toranas narrating the Jataka tales",
    unesco: "UNESCO World Heritage Site since 1989",
    note: "The oldest stone structure in India still standing, and the Buddha appears only as symbols — a footprint, a wheel, an empty throne.",
  },
  {
    keys: ["bhimbetka"],
    name: "Bhimbetka Rock Shelters",
    where: "Raisen district, Madhya Pradesh",
    built: "paintings from c. 30,000 years ago",
    by: "prehistoric hunter-gatherer communities",
    style: "Over 700 sandstone shelters, around 400 painted with hunting, dance and battle scenes",
    unesco: "UNESCO World Heritage Site since 2003",
    note: "It holds some of the earliest traces of human life on the subcontinent.",
  },
  {
    keys: ["konark", "sun temple"],
    name: "Konark Sun Temple",
    where: "Puri district, Odisha",
    built: "c. 1250 CE",
    by: "King Narasimhadeva I of the Eastern Ganga dynasty",
    style: "Kalinga architecture conceived as Surya's chariot — 24 carved wheels and seven stone horses",
    unesco: "UNESCO World Heritage Site since 1984",
    note: "The wheels work as sundials; their spokes still tell the time of day.",
  },
  {
    keys: ["jagannath", "puri"],
    name: "Jagannath Temple, Puri",
    where: "Puri, Odisha",
    built: "12th century CE",
    by: "the Eastern Ganga king Anantavarman Chodaganga Deva",
    style: "Kalinga deul rising about 65 m, one of the Char Dham pilgrimage sites",
    unesco: "not inscribed",
    note: "Its Rath Yatra sends three enormous wooden chariots through the streets each summer.",
  },
  {
    keys: ["padmanabhaswamy", "thiruvananthapuram"],
    name: "Padmanabhaswamy Temple",
    where: "Thiruvananthapuram, Kerala",
    built: "present structure 16th–18th century CE, far older foundation",
    by: "the rulers of Travancore",
    style: "Kerala–Dravidian fusion with a seven-tier gopuram and a granite corridor of 365 carved pillars",
    unesco: "not inscribed",
    note: "Vishnu reclines here on Anantha, the serpent, viewed through three separate doors.",
  },
  {
    keys: ["majuli"],
    name: "Majuli",
    where: "Brahmaputra river, Assam",
    built: "satras founded from the 16th century CE",
    by: "the Vaishnavite reformer Srimanta Sankardeva and his disciples",
    style: "The world's largest river island, home to satra monasteries preserving Sattriya dance, mask-making and manuscript painting",
    unesco: "on India's UNESCO tentative list",
    note: "The island shrinks each year to erosion, which makes its living archive urgent.",
  },
  {
    keys: ["kamakhya"],
    name: "Kamakhya Temple",
    where: "Nilachal Hill, Guwahati, Assam",
    built: "rebuilt 1565 CE on an ancient shrine",
    by: "the Koch king Nara Narayan",
    style: "Nilachal style — a hemispherical dome on a cruciform base",
    unesco: "not inscribed",
    note: "One of the 51 Shakti Peethas; the Ambubachi Mela draws lakhs of pilgrims each June.",
  },
  {
    keys: ["qutub", "qutb minar"],
    name: "Qutub Minar",
    where: "Mehrauli, Delhi",
    built: "begun 1199 CE, completed 1368 CE",
    by: "Qutb-ud-din Aibak, continued by Iltutmish and Firoz Shah Tughlaq",
    style: "A 72.5 m fluted sandstone-and-marble victory tower with Quranic calligraphy bands",
    unesco: "UNESCO World Heritage Site since 1993",
    note: "The 4th-century iron pillar beside it has resisted rust for over 1,600 years.",
  },
  {
    keys: ["red fort", "lal qila"],
    name: "Red Fort (Lal Qila)",
    where: "Old Delhi",
    built: "1638–1648 CE",
    by: "Shah Jahan, as the palace fort of Shahjahanabad",
    style: "Red sandstone walls enclosing Diwan-i-Aam, Diwan-i-Khas, Rang Mahal and the Hayat Bakhsh garden",
    unesco: "UNESCO World Heritage Site since 2007",
    note: "The Prime Minister addresses the nation from its ramparts every Independence Day.",
  },
  {
    keys: ["hampi", "vijayanagara"],
    name: "Hampi",
    where: "Vijayanagara district, Karnataka",
    built: "14th–16th century CE",
    by: "the rulers of the Vijayanagara Empire",
    style: "A boulder-strewn capital of temples, bazaars and the Vittala temple's stone chariot and musical pillars",
    unesco: "UNESCO World Heritage Site since 1986",
    note: "Sacked in 1565, it survives as one of the largest open-air heritage landscapes in Asia.",
  },
  {
    keys: ["ajanta", "ellora"],
    name: "Ajanta and Ellora Caves",
    where: "Aurangabad district, Maharashtra",
    built: "Ajanta 2nd century BCE–6th century CE; Ellora 6th–10th century CE",
    by: "Buddhist, Hindu and Jain monastic communities under Vakataka and Rashtrakuta patronage",
    style: "Rock-cut chaityas and viharas; Ajanta for its murals, Ellora for the monolithic Kailasa temple carved top-down from one rock",
    unesco: "both UNESCO World Heritage Sites since 1983",
    note: "Ajanta's murals are the finest surviving ancient painting in India.",
  },
  {
    keys: ["amber", "amer", "hawa mahal", "jaipur"],
    name: "Amber Fort and the Jaipur monuments",
    where: "Jaipur, Rajasthan",
    built: "Amber Fort from 1592 CE; Hawa Mahal 1799 CE",
    by: "Raja Man Singh I and, later, Sawai Pratap Singh",
    style: "Rajput-Mughal fusion — Sheesh Mahal mirror work, and Hawa Mahal's 953 jharokha windows",
    unesco: "Jaipur City and the Hill Forts of Rajasthan are UNESCO World Heritage Sites",
    note: "Jantar Mantar's masonry instruments still measure time and the sky to within seconds.",
  },
  {
    keys: ["meenakshi", "madurai", "brihadeeswarar", "thanjavur", "tanjore"],
    name: "Tamil temple cities",
    where: "Madurai and Thanjavur, Tamil Nadu",
    built: "Brihadeeswarar 1010 CE; Meenakshi's present form 16th–17th century CE",
    by: "Rajaraja Chola I; the Nayak rulers of Madurai",
    style: "Dravidian — Brihadeeswarar's 66 m vimana, Meenakshi's 14 gopurams covered in thousands of painted figures",
    unesco: "Brihadeeswarar is part of the Great Living Chola Temples (UNESCO, 1987)",
    note: "Both are still fully active places of worship, not ruins.",
  },
  {
    keys: ["charminar", "golconda", "hyderabad"],
    name: "Charminar and Golconda Fort",
    where: "Hyderabad, Telangana",
    built: "Charminar 1591 CE; Golconda largely 16th century CE",
    by: "the Qutb Shahi sultans",
    style: "Indo-Islamic — Charminar's four 56 m minarets, Golconda's acoustic gateways and hill citadel",
    unesco: "on the UNESCO tentative list",
    note: "A clap at Golconda's Fateh Darwaza can be heard at the hilltop pavilion a kilometre away.",
  },
];

const FESTIVAL_BY_STATE: Record<string, string> = {
  "Uttar Pradesh": "Dev Deepawali in Varanasi (a million lamps on the ghats), Ram Navami in Ayodhya, Krishna Janmashtami in Mathura-Vrindavan and the Kumbh/Magh Mela",
  Gujarat: "Navratri garba and dandiya nights, Uttarayan (the kite festival of 14 January), Rann Utsav in Kutch and the Tarnetar fair",
  "Madhya Pradesh": "Khajuraho Dance Festival, Mahashivratri at Ujjain's Mahakaleshwar, Lokrang and the tribal Bhagoria haat",
  Kerala: "Onam with its vallam kali boat races and pookalam, Thrissur Pooram, Vishu and the Theyyam season in the north",
  Odisha: "Rath Yatra at Puri, Konark Dance Festival, Raja Parba and Bali Jatra at Cuttack",
  Assam: "Bohag/Rongali Bihu, Magh Bihu with its bhelaghar feasts, Ambubachi Mela at Kamakhya and Majuli's Raas Mahotsav",
  Rajasthan: "Pushkar Camel Fair, Desert Festival in Jaisalmer, Teej and Gangaur",
  Haryana: "Surajkund International Crafts Mela, Gita Jayanti Mahotsav at Kurukshetra, Teej and Baisakhi",
  Punjab: "Baisakhi, Hola Mohalla at Anandpur Sahib, Lohri and Maghi",
  "Tamil Nadu": "Pongal, Chithirai Thiruvizha in Madurai, Natyanjali at Chidambaram and Karthigai Deepam",
  "West Bengal": "Durga Puja (UNESCO-listed), Poush Mela at Santiniketan, Gajan and Rath Yatra",
  Maharashtra: "Ganesh Chaturthi, Gudi Padwa, Ellora Ajanta Festival and Pola",
};

const FIGURES: { keys: string[]; text: string }[] = [
  { keys: ["shah jahan"], text: "Shah Jahan (r. 1628–1658) was the fifth Mughal emperor and the dynasty's greatest builder — the Taj Mahal, the Red Fort and Shahjahanabad, and the Jama Masjid all belong to his reign." },
  { keys: ["akbar"], text: "Akbar (r. 1556–1605) expanded the Mughal empire and built Fatehpur Sikri, where his Ibadat Khana hosted debates between Hindu, Jain, Zoroastrian, Muslim and Christian thinkers." },
  { keys: ["ashoka"], text: "Ashoka (r. c. 268–232 BCE) turned from the Kalinga war to Buddhism, raised the Sanchi stupa and the pillar edicts, and gave India the Lion Capital and the Ashoka Chakra on its flag." },
  { keys: ["rajaraja", "chola"], text: "Rajaraja Chola I (r. 985–1014 CE) built the Brihadeeswarar temple at Thanjavur and made the Chola navy a power across the Bay of Bengal." },
  { keys: ["sankardeva", "srimanta"], text: "Srimanta Sankardeva (1449–1568) was the Assamese saint-reformer behind Sattriya dance, bhaona theatre and the satra monasteries of Majuli." },
  { keys: ["krishnadevaraya", "vijayanagara"], text: "Krishnadevaraya (r. 1509–1529) presided over Vijayanagara's golden age at Hampi, patronising Telugu and Kannada poetry alongside vast temple building." },
  { keys: ["rani ki vav queen", "udayamati"], text: "Queen Udayamati commissioned Rani ki Vav at Patan around 1063 CE in memory of her husband Bhimdev I — a stepwell built as a subterranean temple." },
];

/* ------------------------------------------------------------------ */
/* Localisation                                                        */
/* ------------------------------------------------------------------ */

type LeadKey = "monument" | "craft" | "festival" | "oral" | "trail" | "guru" | "figure" | "ask";

const LEAD: Record<ChatLang, Record<LeadKey, string>> = {
  English: {
    monument: "Here is what the archive holds:",
    craft: "About the crafts:",
    festival: "Festivals to know:",
    oral: "Recording an oral history:",
    trail: "Heritage trails:",
    guru: "Guru-Shishya masterclasses:",
    figure: "About that figure:",
    ask: "Which one would you like?",
  },
  Hindi: {
    monument: "अभिलेख में यह दर्ज है:",
    craft: "शिल्प के बारे में:",
    festival: "जानने योग्य त्योहार:",
    oral: "मौखिक इतिहास रिकॉर्ड करना:",
    trail: "धरोहर यात्राएँ:",
    guru: "गुरु-शिष्य मास्टरक्लास:",
    figure: "उस व्यक्तित्व के बारे में:",
    ask: "आप किसके बारे में जानना चाहेंगे?",
  },
  Bengali: {
    monument: "সংগ্রহে যা আছে:",
    craft: "কারুশিল্প সম্পর্কে:",
    festival: "যে উৎসবগুলি জানা দরকার:",
    oral: "মৌখিক ইতিহাস রেকর্ড করা:",
    trail: "ঐতিহ্য ভ্রমণপথ:",
    guru: "গুরু-শিষ্য মাস্টারক্লাস:",
    figure: "সেই ব্যক্তিত্ব সম্পর্কে:",
    ask: "আপনি কোনটি জানতে চান?",
  },
  Tamil: {
    monument: "ஆவணக் காப்பகத்தில் உள்ளது:",
    craft: "கைவினைக் கலைகள் பற்றி:",
    festival: "அறிய வேண்டிய திருவிழாக்கள்:",
    oral: "வாய்மொழி வரலாற்றைப் பதிவு செய்தல்:",
    trail: "பாரம்பரிய பயணப் பாதைகள்:",
    guru: "குரு-சிஷ்ய வகுப்புகள்:",
    figure: "அந்த ஆளுமை பற்றி:",
    ask: "எதைப் பற்றி அறிய விரும்புகிறீர்கள்?",
  },
  Telugu: {
    monument: "ఆర్కైవ్‌లో ఉన్న సమాచారం:",
    craft: "చేతివృత్తుల గురించి:",
    festival: "తెలుసుకోవలసిన పండుగలు:",
    oral: "మౌఖిక చరిత్రను రికార్డ్ చేయడం:",
    trail: "వారసత్వ యాత్రలు:",
    guru: "గురు-శిష్య మాస్టర్‌క్లాస్‌లు:",
    figure: "ఆ వ్యక్తి గురించి:",
    ask: "మీరు దేని గురించి తెలుసుకోవాలనుకుంటున్నారు?",
  },
  Marathi: {
    monument: "अभिलेखात हे नोंदलेले आहे:",
    craft: "हस्तकलेविषयी:",
    festival: "जाणून घ्यावेत असे सण:",
    oral: "मौखिक इतिहास रेकॉर्ड करणे:",
    trail: "वारसा मार्ग:",
    guru: "गुरु-शिष्य मास्टरक्लास:",
    figure: "त्या व्यक्तिमत्त्वाविषयी:",
    ask: "तुम्हाला कशाविषयी जाणून घ्यायचे आहे?",
  },
  Gujarati: {
    monument: "આર્કાઇવમાં આ નોંધાયેલું છે:",
    craft: "હસ્તકલા વિશે:",
    festival: "જાણવા જેવા તહેવારો:",
    oral: "મૌખિક ઇતિહાસ રેકોર્ડ કરવો:",
    trail: "વારસા યાત્રાઓ:",
    guru: "ગુરુ-શિષ્ય માસ્ટરક્લાસ:",
    figure: "એ વ્યક્તિ વિશે:",
    ask: "તમે કોના વિશે જાણવા માગો છો?",
  },
};

export const GREETINGS: Record<ChatLang, string> = {
  English:
    "Namaste! I am Virasat Sathi, your heritage companion. Ask me about monuments, artisans and crafts, festivals, oral histories, heritage trails or masterclasses.",
  Hindi:
    "नमस्ते! मैं विरासत साथी हूँ। स्मारक, कारीगर व शिल्प, त्योहार, मौखिक कथाएँ, धरोहर यात्राएँ या मास्टरक्लास — किसी के भी बारे में पूछिए।",
  Bengali:
    "নমস্কার! আমি বিরাসত সাথী। স্মৃতিসৌধ, কারিগর ও কারুশিল্প, উৎসব, মৌখিক ইতিহাস বা ঐতিহ্য ভ্রমণপথ নিয়ে জিজ্ঞাসা করুন।",
  Tamil:
    "வணக்கம்! நான் விராசத் சாத்தி. நினைவுச்சின்னங்கள், கைவினைஞர்கள், திருவிழாக்கள், வாய்மொழி வரலாறு அல்லது பாரம்பரியப் பயணங்கள் பற்றிக் கேளுங்கள்.",
  Telugu:
    "నమస్తే! నేను విరాసత్ సాథి. స్మారకాలు, చేతివృత్తులు, పండుగలు, మౌఖిక చరిత్ర లేదా వారసత్వ యాత్రల గురించి అడగండి.",
  Marathi:
    "नमस्कार! मी विरासत साथी. स्मारके, कारागीर व हस्तकला, सण, मौखिक कथा किंवा वारसा मार्गांविषयी विचारा.",
  Gujarati:
    "નમસ્તે! હું વિરાસત સાથી છું. સ્મારકો, કારીગરો અને હસ્તકલા, તહેવારો, મૌખિક ઇતિહાસ કે વારસા યાત્રાઓ વિશે પૂછો.",
};

/* ------------------------------------------------------------------ */
/* Intent detection                                                    */
/* ------------------------------------------------------------------ */

const ALL_STATES = [
  ...STATES,
  "Rajasthan",
  "Haryana",
  "Punjab",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
  "Bihar",
  "Jammu and Kashmir",
  "Himachal Pradesh",
  "Uttarakhand",
  "Goa",
  "Andhra Pradesh",
  "Chhattisgarh",
  "Jharkhand",
  "Sikkim",
  "Manipur",
  "Meghalaya",
  "Nagaland",
  "Tripura",
  "Mizoram",
  "Arunachal Pradesh",
];

/** State named inside the message itself wins over the dashboard selection. */
export function detectState(text: string): string | null {
  const t = text.toLowerCase();
  return ALL_STATES.find((s) => t.includes(s.toLowerCase())) ?? null;
}

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase();

  if (/^(hi|hello|hey|namaste|namaskar|नमस्ते|vanakkam)\b/.test(t.trim())) return "greeting";
  if (/thank|shukriya|धन्यवाद|dhanyavad/.test(t)) return "thanks";
  if (/help|what can you|kya kar sakte|options|guide me/.test(t)) return "help";

  if (/record|preserve|archive my|grandmother|grandfather|dadi|nani|oral history|interview|रिकॉर्ड|कहानी कैसे/.test(t))
    return "oral_record";
  if (/oral|folklore|folk tale|legend|story|kissa|katha|कथा|गल्प/.test(t)) return "oral_history";
  if (/artisan|karigar|weaver|potter|craftsman|कारीगर/.test(t)) return "artisan";
  if (/craft|handicraft|textile|embroidery|pottery|weav|handloom|शिल्प|हस्तकला/.test(t)) return "craft";
  if (/festival|utsav|mela|celebration|jatra|त्योहार|उत्सव/.test(t)) return "festival";
  if (/trail|itinerary|route|tour|quiz|quest|travel plan|यात्रा/.test(t)) return "trail";
  if (/guru|shishya|masterclass|workshop|learn|class|teacher|गुरु/.test(t)) return "guru";
  if (/unesco|world heritage/.test(t)) return "unesco";

  if (FIGURES.some((f) => f.keys.some((k) => t.includes(k)))) return "figure";
  if (MONUMENT_FACTS.some((m) => m.keys.some((k) => t.includes(k)))) return "monument";
  if (/monument|temple|fort|palace|heritage site|historical place|historic|architecture|stupa|caves|mandir|masjid|smarak|स्मारक|मंदिर|किला/.test(t))
    return "monument_generic";

  if (detectState(t)) return "monument_generic";
  return "unknown";
}

/* ------------------------------------------------------------------ */
/* Response building                                                   */
/* ------------------------------------------------------------------ */

const fact = (f: MonumentFact) =>
  `**${f.name}** — ${f.where}.\n• Built: ${f.built}\n• Commissioned by: ${f.by}\n• Architecture: ${f.style}\n• Status: ${f.unesco}\n${f.note}`;

function monumentsForState(state: string): MonumentFact[] {
  const s = state.toLowerCase();
  return MONUMENT_FACTS.filter((f) => f.where.toLowerCase().includes(s));
}

function craftLine(state: string): string {
  const local = CRAFTS.filter((c) => c.state === state);
  if (!local.length) return "";
  return local
    .map((c) => `• ${c.craft} — ${c.artisan}, ${c.place} (₹${c.price.toLocaleString("en-IN")})`)
    .join("\n");
}

function localResponse(req: ChatRequest): string {
  const language: ChatLang = req.language ?? "English";
  const lead = LEAD[language];
  const msg = req.userMessage.trim();
  const intent = detectIntent(msg);
  const state = detectState(msg) ?? req.selectedState ?? "Uttar Pradesh";
  const inFocus = detectState(msg) ? state : req.selectedState ? `${state} (currently selected)` : state;

  switch (intent) {
    case "greeting":
      return GREETINGS[language];

    case "thanks":
      return language === "English"
        ? "Any time. Ask me about another monument, craft or trail whenever you like."
        : GREETINGS[language];

    case "help":
      return `${GREETINGS[language]}\n\nTry: “famous monuments in ${state}”, “traditional crafts of Kerala”, “festivals in Assam”, “how do I record my grandmother's story?”, “plan a heritage trail”.`;

    case "monument": {
      const t = msg.toLowerCase();
      const hits = MONUMENT_FACTS.filter((f) => f.keys.some((k) => t.includes(k))).slice(0, 2);
      return `${lead.monument}\n\n${hits.map(fact).join("\n\n")}`;
    }

    case "monument_generic": {
      const hits = monumentsForState(state);
      if (!hits.length) {
        const local = MONUMENTS.filter((m) => m.state === state);
        if (local.length) {
          return `${lead.monument}\n\nIn ${state} the archive narrates:\n${local
            .map((m) => `• ${m.name} — ${m.place}, ${m.era}`)
            .join("\n")}\n\nOpen the Time Portal tab for the full narrated story, or name a specific monument and I will give you its history.`;
        }
        return `${lead.ask}\n\nI can give you the history, builder, period and UNESCO status of monuments such as the Taj Mahal, Khajuraho, Sanchi, Konark, Rani ki Vav, Hampi, Qutub Minar or Majuli. Which one — or which state should I focus on?`;
      }
      return `${lead.monument} key heritage sites of ${inFocus}.\n\n${hits.slice(0, 3).map(fact).join("\n\n")}`;
    }

    case "artisan":
    case "craft": {
      const local = craftLine(state);
      const masters = MASTERCLASSES.filter((m) => m.state === state);
      const body = local
        ? `In ${inFocus}:\n${local}`
        : `I don't yet hold verified artisans for ${state}. Nearest listed makers are in ${STATES.join(", ")}.`;
      const teach = masters.length
        ? `\n\nLiving masters teaching there: ${masters.map((m) => `${m.artisan} (${m.artform})`).join(", ")}.`
        : "";
      return `${lead.craft}\n\n${body}${teach}\n\nEvery piece in Craft Connect carries a provenance record on the heritage ledger, so payment reaches the maker directly.`;
    }

    case "festival": {
      const f = FESTIVAL_BY_STATE[state];
      return f
        ? `${lead.festival}\n\n${state} keeps ${f}.\n\nAsk me about any one of them and I will tell you when it falls and how it is observed.`
        : `${lead.ask}\n\nName a state — for example Kerala, Odisha, Gujarat or Rajasthan — and I will list its major festivals and what happens at them.`;
    }

    case "oral_record":
      return `${lead.oral}\n\n1. **Prepare** — write 8–10 open questions (childhood, work, migration, songs, food, festivals). Ask “tell me about…”, never yes/no questions.\n2. **Consent** — record a spoken permission at the start: name, date, and that the recording may be archived and shared publicly.\n3. **Setup** — a quiet room, phone or recorder about a hand's width away, airplane mode on, one 45–60 minute session with pauses left in.\n4. **Record** — let silences run, don't interrupt, and ask for the story behind names, places and songs.\n5. **Metadata** — log narrator name, age, place, language/dialect, date, topics and any sensitivity (sacred or family-private material).\n6. **Preserve** — keep the original uncompressed file plus a copy in two places, add a short summary and, where possible, a transcript.\n\nIn the app: open the **Oral Vault** tab, press the red record button, speak, then stop — the take is saved to the vault index with its state and language. Vault currently holds ${RECORDINGS.length} recordings, including ${RECORDINGS.filter((r) => r.state === state)
        .map((r) => `“${r.title}” by ${r.narrator}`)
        .join(", ") || "takes from six states"}.`;

    case "oral_history": {
      const local = RECORDINGS.filter((r) => r.state === state);
      return `${lead.oral}\n\n${
        local.length
          ? `From ${inFocus}: ${local.map((r) => `“${r.title}” — ${r.narrator}, in ${r.language} (${r.duration})`).join("; ")}.`
          : `The vault holds ${RECORDINGS.length} takes across six states.`
      }\n\nOral traditions carry what no monument records: work songs, creation stories, ritual chants and family memory. Open the Oral Vault tab to listen, or ask me how to record one yourself.`;
    }

    case "trail": {
      const stops = TRAIL.filter((s) => s.state === state);
      return `${lead.trail}\n\n${
        stops.length
          ? `In ${inFocus}: ${stops.map((s) => `${s.site} (${s.points} pts)`).join(", ")}. ${stops[0]?.fact ?? ""}`
          : `The Trail Quest route runs through ${TRAIL.map((s) => s.site).join(" → ")}.`
      }\n\nOpen the Trail Quest tab to answer each site's riddle and collect points along the route.`;
    }

    case "guru": {
      const local = MASTERCLASSES.filter((m) => m.state === state);
      const list = (local.length ? local : MASTERCLASSES)
        .map((m) => `• ${m.artform} — ${m.artisan}, ${m.place} · ${m.duration} · ₹${m.fee.toLocaleString("en-IN")} (${m.mode})`)
        .join("\n");
      return `${lead.guru}\n\n${local.length ? `Taught in ${inFocus}:` : "Across the archive:"}\n${list}\n\nEach booking shows the curriculum and the material kit before checkout, and the fee goes to the guru.`;
    }

    case "figure": {
      const t = msg.toLowerCase();
      const f = FIGURES.find((x) => x.keys.some((k) => t.includes(k)));
      return `${lead.figure}\n\n${f?.text ?? ""}`;
    }

    case "unesco":
      return `${lead.monument}\n\nUNESCO World Heritage Sites in the archive include the Taj Mahal (1983), Konark Sun Temple (1984), Khajuraho and Fatehpur Sikri (1986), Sanchi (1989), Qutub Minar (1993), Bhimbetka (2003), Red Fort (2007), Rani ki Vav (2014) and Dholavira (2021). India also holds UNESCO intangible heritage listings such as Kutiyattam, Ramlila, Chhau, Kumbh Mela, Durga Puja and Garba.\n\nName any of them for its full history.`;

    default:
      return `I couldn't place that one precisely — but I can help with monuments and historical places, artisans and traditional crafts, festivals, oral histories and how to record them, heritage trails, historical figures and masterclasses.\n\nRight now I'm focused on **${state}**. Try “famous monuments in ${state}”, “crafts of ${state}”, or name any monument, and I'll answer in detail.`;
  }
}

/**
 * Swap point for a real AI backend: call the server function here and fall back
 * to `localResponse` on failure. Signature stays identical for the UI.
 */
export async function generateResponse(req: ChatRequest): Promise<string> {
  return localResponse(req);
}

export { localResponse as generateLocalResponse };
