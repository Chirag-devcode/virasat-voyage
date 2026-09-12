import chikankari from "@/assets/craft-chikankari.jpg";
import pottery from "@/assets/craft-pottery.jpg";
import lamp from "@/assets/craft-lamp.jpg";
import textile from "@/assets/craft-textile.jpg";
import pattachitra from "@/assets/craft-pattachitra.jpg";
import bamboo from "@/assets/craft-bamboo.jpg";

export const STATES = [
  "Uttar Pradesh",
  "Haryana",
  "Gujarat",
  "Madhya Pradesh",
  "Kerala",
  "Odisha",
  "Assam",
] as const;

export type StateName = (typeof STATES)[number];

export const LANGUAGES = [
  "English",
  "हिन्दी",
  "ગુજરાતી",
  "മലയാളം",
  "ଓଡ଼ିଆ",
  "অসমীয়া",
] as const;

export type Language = (typeof LANGUAGES)[number];

export type Monument = {
  id: string;
  state: StateName;
  name: string;
  place: string;
  era: string;
  duration: string;
  image: string;
  stories: Partial<Record<Language, string>> & { English: string };
};

export const MONUMENTS: Monument[] = [
  {
    id: "Agra",
    state: "Uttar Pradesh",
    name: "The Taj Mahal, Symbol of Love",
    place: "Agra",
    era: "1632 CE",
    duration: "07:12",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "Commissioned in 1632 by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, this ivory-white marble mausoleum on the banks of the Yamuna River stands as an eternal symbol of love and a masterpiece of Mughal architecture.",
      "हिन्दी":
        "मुगल सम्राट शाहजहाँ द्वारा 1632 में अपनी प्रिय पत्नी मुमताज़ महल की याद में बनवाया गया, यमुना नदी के तट पर स्थित यह सफेद संगमरमर का मकबरा प्रेम का एक अमर प्रतीक और स्थापत्य कला का अद्भुत नमूना है।"
    }
  },
  {
    id: "kurukshetra",
    state: "Haryana",
    name: "Brahma Sarovar & Sacred Kurukshetra",
    place: "Kurukshetra",
    era: "c. 3000 BCE",
    duration: "08:45",
    image: "https://share.google/mZBFocX7UpJJ8Vsik",
    stories: {
      English:
        "Brahma Sarovar is an ancient water tank dedicated to Lord Brahma, believed to be the cradle of civilization and the site where Brahma performed a yajna to create the universe. Spanning over 1,800 feet in length, it was chronicled by 11th-century scholar Al-Biruni as an engineering marvel. Nearby lies Jyotisar, where Lord Krishna delivered the sermon of the Bhagavad Gita to Arjuna.",
      "हिन्दी":
        "ब्रह्म सरोवर कुरुक्षेत्र का एक अति प्राचीन और पवित्र जलाशय है, जिसका उल्लेख 11वीं शताब्दी में अल-बिरूनी ने भी अपनी पुस्तकों में किया था। इसी पावन भूमि पर भगवान श्रीकृष्ण ने अर्जुन को श्रीमद्भगवद्गीता का अमर उपदेश दिया था।"
    }
  },
  {
    id: "kashi",
    state: "Uttar Pradesh",
    name: "The Ghats That Never Sleep",
    place: "Varanasi",
    era: "c. 1780 CE",
    duration: "05:26",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "Eighty-eight ghats descend into the Ganga, each built by a different kingdom paying for a place at the river's edge. The stone steps record floods as faint horizontal scars — a ledger of two centuries of monsoons.",
    },
  },
  {
    id: "rani-ki-vav",
    state: "Gujarat",
    name: "Rani ki Vav, The Inverted Temple",
    place: "Patan",
    era: "1063 CE",
    duration: "06:40",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "A queen built a staircase seven storeys down into the earth to find water, and lined it with five hundred sculptures facing inward. Silted over for eight centuries, the river itself preserved what it buried.",
      "ગુજરાતી":
        "એક રાણીએ પાણી શોધવા ધરતીમાં સાત માળ ઊંડે ઊતરતી વાવ બંધાવી, અને તેની દીવાલો પર પાંચસો શિલ્પો કોતરાવ્યાં.",
    },
  },
  {
    id: "khajuraho",
    state: "Madhya Pradesh",
    name: "Khajuraho Group of Temples",
    place: "Chhatarpur",
    era: "c. 950–1050 CE",
    duration: "08:04",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGiuuQnQOf2NDJ4-YAc3n4Hlv_ni8DQyvO81_OHZ0bZ2PKpdKVFs0doE&s=10",
    stories: {
      English:
        "Built during the Chandela dynasty between 950 and 1050 CE, the Khajuraho temples represent the zenith of Nagara-style architecture. Of eighty-five original temples, twenty-five remain, featuring the towering Kandariya Mahadeva Temple. The Chandela masons oriented each shikhara so that dawn strikes the sanctum before it touches the plinth — the god wakes before the temple does.",
      "हिन्दी":
        "चंदेल राजवंश द्वारा 950 से 1050 ईस्वी के बीच निर्मित, खजुराहो के मंदिर नागर शैली की वास्तुकला के उत्कृष्ट नमूने हैं। बलुआ पत्थर पर उकेरी गई इसकी मूर्तियां और भव्य कंदरिया महादेव मंदिर भारतीय कला की अमूल्य धरोहर हैं।"
    },
  },
  {
    id: "bhimbetka",
    state: "Madhya Pradesh",
    name: "The Painted Shelters of Bhimbetka",
    place: "Raisen",
    era: "c. 8000 BCE",
    duration: "04:55",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "Seven hundred rock shelters hold ochre figures painted across ten thousand years — hunters over horsemen over medieval script, each generation drawing on the last without erasing it.",
    },
  },
  {
    id: "vadakkunnathan",
    state: "Kerala",
    name: "The Vena Pillars of Vadakkunnathan",
    place: "Thrissur",
    era: "c. 1200 CE",
    duration: "06:12",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "Twin columns split and rejoined — a mason's signature carved into the temple's breathing walls. The koothambalam roof is held by joinery alone; not a single nail was driven into this hall.",
      "മലയാളം":
        "രണ്ട് തൂണുകൾ പിരിഞ്ഞ് വീണ്ടും ചേരുന്നു — ക്ഷേത്രഭിത്തിയിൽ കൊത്തിവെച്ച ഒരു ശിൽപിയുടെ ഒപ്പ്.",
    },
  },
  {
    id: "konark",
    state: "Odisha",
    name: "The Ratha of Konark",
    place: "Puri",
    era: "1250 CE",
    duration: "08:40",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "A stone chariot of twenty-four wheels, each spoke a different measure of the day. Place a finger at the axle at noon and the shadow still tells the hour, eight hundred years after the sculptor set it.",
      "ଓଡ଼ିଆ":
        "ଚବିଶ ଚକର ଏକ ପଥର ରଥ, ପ୍ରତ୍ୟେକ ଅରା ଦିନର ଏକ ଭିନ୍ନ ମାપ।",
    },
  },
  {
    id: "majuli",
    state: "Assam",
    name: "The Floating Monastery of Majuli",
    place: "Majuli",
    era: "1663 CE",
    duration: "05:33",
    image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?auto=format&fit=crop&q=80&w=1200",
    stories: {
      English:
        "Clay, bamboo and thatch on the world's largest river island — where the bronzes were lost to the Brahmaputra and only the verses were kept. The satras move house each decade as the river takes the bank.",
      "অসমীয়া":
        "পৃথিৱীৰ আটাইতকৈ ডাঙৰ নদী দ্বীপত মাটি, বাঁহ আৰু খেৰৰ সত্ৰ — য'ত ব্ৰহ্মপুত্ৰই धातুবোৰ লৈ গ'ল, ৰৈ গ'ল কেৱল পদবোৰ।",
    },
  },
];

export type Recording = {
  id: string;
  title: string;
  narrator: string;
  state: StateName;
  duration: string;
  language: string;
};

export const RECORDINGS: Recording[] = [
  { id: "r1", title: "Chikan embroidery work-song", narrator: "Zubaida Begum", state: "Uttar Pradesh", duration: "03:12", language: "Awadhi" },
  { id: "r2", title: "Kutchi shepherd's dawn call", narrator: "Hamir Rabari", state: "Gujarat", duration: "02:41", language: "Kachchhi" },
  { id: "r3", title: "Gond creation story", narrator: "Sukhram Marawi", state: "Madhya Pradesh", duration: "07:55", language: "Gondi" },
  { id: "r4", title: "Kathakali padam recitation", narrator: "K. Ramankutty", state: "Kerala", duration: "05:48", language: "Malayalam" },
  { id: "r5", title: "Pattachitra painter's chant", narrator: "Bhagyalaxmi Maharana", state: "Odisha", duration: "04:20", language: "Odia" },
  { id: "r6", title: "Bihu naam of the river bank", narrator: "Bina Deka", state: "Assam", duration: "04:05", language: "Assamese" },
];

export type TrailStop = {
  id: string;
  state: StateName;
  site: string;
  points: number;
  question: string;
  options: string[];
  answer: number;
  fact: string;
  x: number;
  y: number;
};

export const TRAIL: TrailStop[] = [
  {
    id: "t1",
    state: "Uttar Pradesh",
    site: "Fatehpur Sikri",
    points: 300,
    question: "Why was the imperial capital at Fatehpur Sikri abandoned within fifteen years?",
    options: ["Invasion from the north", "Water shortage", "A great fire", "The emperor's death"],
    answer: 1,
    fact: "The lake that fed the city ran dry, and the court moved back to Agra by 1585.",
    x: 34,
    y: 30,
  },
  {
    id: "t2",
    state: "Gujarat",
    site: "Rani ki Vav",
    points: 350,
    question: "Rani ki Vav is a stepwell built in which architectural style?",
    options: ["Dravidian", "Maru-Gurjara", "Indo-Saracenic", "Kalinga"],
    answer: 1,
    fact: "Its Maru-Gurjara carving covers seven levels and over five hundred principal sculptures.",
    x: 15,
    y: 47,
  },
  {
    id: "t3",
    state: "Madhya Pradesh",
    site: "Khajuraho",
    points: 400,
    question: "Which dynasty raised the Khajuraho temple group?",
    options: ["Chandela", "Chola", "Pallava", "Solanki"],
    answer: 0,
    fact: "The Chandelas built eighty-five temples between 885 and 1050 CE; twenty-five survive.",
    x: 40,
    y: 45,
  },
  {
    id: "t4",
    state: "Odisha",
    site: "Konark Sun Temple",
    points: 450,
    question: "How many carved wheels flank the Konark chariot?",
    options: ["Twelve", "Sixteen", "Twenty-four", "Thirty-two"],
    answer: 2,
    fact: "Twenty-four wheels, drawn by seven stone horses — one for each day of the week.",
    x: 62,
    y: 52,
  },
  {
    id: "t5",
    state: "Assam",
    site: "Majuli Satras",
    points: 400,
    question: "Majuli sits on which river?",
    options: ["Teesta", "Brahmaputra", "Barak", "Subansiri"],
    answer: 1,
    fact: "The Brahmaputra has eroded more than half of Majuli's landmass since 1950.",
    x: 82,
    y: 30,
  },
  {
    id: "t6",
    state: "Kerala",
    site: "Vadakkunnathan",
    points: 500,
    question: "The koothambalam theatre hall at Vadakkunnathan is built chiefly from what?",
    options: ["Laterite blocks", "Interlocking timber", "Fired brick", "Granite slabs"],
    answer: 1,
    fact: "Its jackwood roof is joined without nails, tuned so a whisper carries to the back row.",
    x: 33,
    y: 76,
  },
];

export type Craft = {
  id: string;
  name: string;
  craft: string;
  artisan: string;
  state: StateName;
  place: string;
  price: number;
  image: string;
  hash: string;
  minted: string;
  ledger: string;
  provenance: string[];
};

export const CRAFTS: Craft[] = [
  {
    id: "c1",
    name: "Chikankari Kurta, Shadow Stitch",
    craft: "Chikankari hand embroidery",
    artisan: "Zubaida Begum",
    state: "Uttar Pradesh",
    place: "Lucknow",
    price: 4200,
    image: chikankari,
    hash: "0x7a41…f3c2",
    minted: "12 Nov 2025",
    ledger: "Virasat Heritage Chain",
    provenance: ["Cotton sourced — Barabanki", "Hand-stitched 41 days", "Guild seal verified", "Minted on-chain"],
  },
  {
    id: "c2",
    name: "Kutch Blue Pottery Bowl",
    craft: "Tin-glazed earthenware",
    artisan: "Hamir Rabari",
    state: "Gujarat",
    place: "Bhuj",
    price: 1850,
    image: pottery,
    hash: "0x2c90…9b17",
    minted: "03 Jan 2026",
    ledger: "Virasat Heritage Chain",
    provenance: ["Clay dug — Rann edge", "Wheel-thrown, kiln 9 hrs", "Cobalt glaze, single fire", "Minted on-chain"],
  },
  {
    id: "c3",
    name: "Dhokra Bronze Temple Lamp",
    craft: "Lost-wax metal casting",
    artisan: "Sukhram Marawi",
    state: "Madhya Pradesh",
    place: "Betul",
    price: 6400,
    image: lamp,
    hash: "0x55ab…41de",
    minted: "27 Oct 2025",
    ledger: "Virasat Heritage Chain",
    provenance: ["Beeswax model formed", "Clay mould fired", "Bronze poured 1150°C", "Minted on-chain"],
  },
  {
    id: "c4",
    name: "Kasavu Handloom Drape",
    craft: "Pit-loom cotton weaving",
    artisan: "K. Ramankutty",
    state: "Kerala",
    place: "Balaramapuram",
    price: 5300,
    image: textile,
    hash: "0x91fe…7a05",
    minted: "18 Dec 2025",
    ledger: "Virasat Heritage Chain",
    provenance: ["Unbleached cotton spun", "Zari border set by hand", "Woven 11 days on pit loom", "Minted on-chain"],
  },
  {
    id: "c5",
    name: "Pattachitra Palm-Leaf Scroll",
    craft: "Natural-pigment scroll painting",
    artisan: "Bhagyalaxmi Maharana",
    state: "Odisha",
    place: "Raghurajpur",
    price: 3100,
    image: pattachitra,
    hash: "0x0dc4…b882",
    minted: "05 Feb 2026",
    ledger: "Virasat Heritage Chain",
    provenance: ["Palm leaves cured 3 months", "Stylus etched freehand", "Lampblack rubbed in", "Minted on-chain"],
  },
  {
    id: "c6",
    name: "Jaapi Bamboo Weave Basket",
    craft: "Split-bamboo basketry",
    artisan: "Bina Deka",
    state: "Assam",
    place: "Nalbari",
    price: 2300,
    image: bamboo,
    hash: "0x9e33…41aa",
    minted: "22 Sep 2025",
    ledger: "Virasat Heritage Chain",
    provenance: ["Bamboo cut at full moon", "Split and sun-dried", "Woven in one sitting", "Minted on-chain"],
  },
];

export type Masterclass = {
  id: string;
  artisan: string;
  artform: string;
  state: StateName;
  place: string;
  duration: string;
  fee: number;
  mode: "Live" | "Recorded";
  schedule: string;
  seats: number;
  blurb: string;
  curriculum: string[];
  kit: string[];
};

export const MASTERCLASSES: Masterclass[] = [
  {
    id: "m1",
    artisan: "Abdul Gafur Khatri",
    artform: "Rogan Art",
    state: "Gujarat",
    place: "Nirona, Kutch",
    duration: "3 sessions · 6 hrs",
    fee: 2800,
    mode: "Live",
    schedule: "Sat 10:00 IST · from 12 Sep",
    seats: 8,
    blurb: "Castor-oil paint drawn in mid-air onto cloth by one surviving family.",
    curriculum: [
      "History of Rogan and the last practising household",
      "Boiling castor oil into rogan paste, pigment ratios",
      "The stylus lift: drawing without touching the cloth",
      "Mirror-fold transfer and the tree-of-life motif",
      "Finishing, curing and care of a rogan panel",
    ],
    kit: ["Rogan paste, 6 pigments", "Iron stylus (kalam)", "Pre-washed cotton cloth 2×", "Muslin wipes & oil pot"],
  },
  {
    id: "m2",
    artisan: "Sukhram Marawi",
    artform: "Dhokra Metal Casting",
    state: "Madhya Pradesh",
    place: "Betul",
    duration: "4 sessions · 10 hrs",
    fee: 4500,
    mode: "Live",
    schedule: "Sun 16:00 IST · from 20 Sep",
    seats: 6,
    blurb: "Four-thousand-year-old lost-wax bronze, taught at the furnace.",
    curriculum: [
      "Clay core shaping and drying",
      "Beeswax thread winding — the Dhokra line",
      "Investment moulding and dewaxing",
      "Bronze pour at 1150°C, safety drill",
      "Breaking the mould, filing and patina",
    ],
    kit: ["Beeswax thread 250g", "Core clay & sand mix", "Crucible tongs (loan)", "Files, brass brush, apron"],
  },
  {
    id: "m3",
    artisan: "Zubaida Begum",
    artform: "Chikankari Shadow Work",
    state: "Uttar Pradesh",
    place: "Lucknow",
    duration: "2 sessions · 5 hrs",
    fee: 1900,
    mode: "Recorded",
    schedule: "On demand · lifetime access",
    seats: 40,
    blurb: "Thirty-two stitches survive; you will learn the six most endangered.",
    curriculum: [
      "Reading a block-printed chikan pattern",
      "Bakhiya — the reverse shadow stitch",
      "Phanda and murri knots",
      "Jaali: cutting no thread, opening the weave",
      "Washing, starching and blueing the finished piece",
    ],
    kit: ["Cotton mulmul panel", "Untwisted cotton thread set", "Needles 9/11, wooden hoop", "Traced pattern sheets"],
  },
  {
    id: "m4",
    artisan: "Bhagyalaxmi Maharana",
    artform: "Pattachitra Palm-Leaf Etching",
    state: "Odisha",
    place: "Raghurajpur",
    duration: "3 sessions · 7 hrs",
    fee: 2400,
    mode: "Live",
    schedule: "Fri 18:00 IST · from 11 Sep",
    seats: 10,
    blurb: "Stylus lines on cured palm leaf, blackened with lamp soot.",
    curriculum: [
      "Curing and stitching palm leaves into a panel",
      "Freehand stylus discipline — no pencil marks",
      "Iconography of Jagannath and the Dasavatara",
      "Lampblack rubbing and pigment washes",
      "Folding, binding and archival storage",
    ],
    kit: ["Cured palm-leaf panel", "Iron stylus", "Lampblack, turmeric, hingula pigments", "Coconut-shell mixing cups"],
  },
  {
    id: "m5",
    artisan: "K. Ramankutty",
    artform: "Kasavu Pit-Loom Weaving",
    state: "Kerala",
    place: "Balaramapuram",
    duration: "5 sessions · 12 hrs",
    fee: 5200,
    mode: "Live",
    schedule: "Wed 17:30 IST · from 17 Sep",
    seats: 5,
    blurb: "Unbleached cotton and zari on a below-ground pit loom.",
    curriculum: [
      "Sizing and warping unbleached cotton",
      "Setting the pit loom, treadle rhythm",
      "Inserting the kasavu zari border",
      "Selvedge control and beat consistency",
      "Cutting off, knotting and the final wash",
    ],
    kit: ["Cotton warp bundle", "Zari spool", "Shuttle and bobbins", "Loom access at the shala"],
  },
  {
    id: "m6",
    artisan: "Bina Deka",
    artform: "Jaapi Bamboo Weave",
    state: "Assam",
    place: "Nalbari",
    duration: "2 sessions · 4 hrs",
    fee: 1500,
    mode: "Recorded",
    schedule: "On demand · lifetime access",
    seats: 60,
    blurb: "The sun-hat of the Brahmaputra plains, split and woven by hand.",
    curriculum: [
      "Selecting and splitting bamboo culms",
      "Sun-drying and sizing the splints",
      "The conical spiral weave",
      "Tokou-leaf lining and rim binding",
      "Dyed motif inlay for a bihu jaapi",
    ],
    kit: ["Pre-split bamboo splints", "Tokou palm leaf sheets", "Cane binding cord", "Splitting knife (dao)"],
  },
];