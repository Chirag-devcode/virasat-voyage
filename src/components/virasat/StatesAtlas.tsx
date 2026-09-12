import React, { useState } from "react";
import {
  MapPin,
  Search,
  Building2,
  Sparkles,
  Palette,
  Compass,
  ChevronRight,
  Award,
  Globe,
  Layers,
  CheckCircle2,
} from "lucide-react";

export type RegionType =
  | "North"
  | "South"
  | "East"
  | "West"
  | "Central"
  | "North-East"
  | "Union Territory";

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
  region: RegionType;
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

export const REGIONS = [
  "All",
  "North",
  "South",
  "East",
  "West",
  "Central",
  "North-East",
  "Union Territory",
] as const;

export const STATES_DATA: StateHeritage[] = [
  // --- STATES ---
  {
    id: "ap",
    name: "Andhra Pradesh",
    code: "AP",
    capital: "Amaravati",
    region: "South",
    image: "https://images.unsplash.com/photo-1626014903708-69213197f9c8?auto=format&fit=crop&w=800&q=80",
    description: "Home to ancient Dravidian temples, Buddhist rock-cut monuments, and world-renowned Kalamkari hand-printed textiles.",
    stats: { unescoSites: 0, giTags: 18, monuments: 500, craftGuilds: 65 },
    famousMonuments: [
      { name: "Tirumala Venkateswara", period: "300 CE", type: "Dravidian Temple" },
      { name: "Lepakshi Veerbhadra", period: "1530 CE", type: "Vijayanagara Style" },
      { name: "Undavalli Caves", period: "7th Century CE", type: "Rock-cut Architecture" }
    ],
    traditionalCrafts: [
      { name: "Srikalahasti Kalamkari", tag: "GI Tagged" },
      { name: "Kondapalli Toys", tag: "GI Tagged" },
      { name: "Dharmavaram Handloom", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Kuchipudi Classical Dance", "Sankranti Haridasu", "Shadow Puppetry (Tholu Bommalata)"]
  },
  {
    id: "ar",
    name: "Arunachal Pradesh",
    code: "AR",
    capital: "Itanagar",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "The land of dawn-lit mountains featuring ancient Buddhist monasteries, tribal carpet weaving, and bamboo architecture.",
    stats: { unescoSites: 0, giTags: 6, monuments: 120, craftGuilds: 30 },
    famousMonuments: [
      { name: "Tawang Monastery", period: "1680 CE", type: "Gelugpa Buddhist Citadel" },
      { name: "Ita Fort", period: "14th Century CE", type: "Ahom Brick Fortification" },
      { name: "Dirang Dzong", period: "17th Century CE", type: "Tibetan Style Citadel" }
    ],
    traditionalCrafts: [
      { name: "Monpa Handwoven Carpet", tag: "GI Tagged" },
      { name: "Sherdukpen Textile", tag: "Tribal Loom" },
      { name: "Apatani Cane & Bamboo", tag: "Heritage Craft" }
    ],
    culturalHighlights: ["Torgya Dance Festival", "Losar New Year", "Apatani Facial Tattoo Culture"]
  },
  {
    id: "as",
    name: "Assam",
    code: "AS",
    capital: "Dispur",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80",
    description: "Gateway to Brahmaputra riverine cultures, sacred neo-Vaishnavite Satras, and golden Muga silk weaving.",
    stats: { unescoSites: 2, giTags: 11, monuments: 290, craftGuilds: 60 },
    famousMonuments: [
      { name: "Rang Ghar", period: "1746 CE", type: "Ahom Amphitheatre" },
      { name: "Kamakhya Temple", period: "8th-17th Century CE", type: "Nilachal Architecture" },
      { name: "Majuli Satras", period: "15th Century CE", type: "Monastic Centers" }
    ],
    traditionalCrafts: [
      { name: "Muga Silk Weaving", tag: "GI Tagged" },
      { name: "Majuli Mask Making", tag: "Heritage Craft" },
      { name: "Assamese Jaapi & Cane Craft", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Bihu Folk Festival", "Sattriya Classical Dance", "Bhakti Drama Traditions"]
  },
  {
    id: "br",
    name: "Bihar",
    code: "BR",
    capital: "Patna",
    region: "East",
    image: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=800&q=80",
    description: "Cradle of Buddhism and Jainism, featuring ancient seats of higher learning, stupas, and Madhubani folk art.",
    stats: { unescoSites: 2, giTags: 15, monuments: 420, craftGuilds: 70 },
    famousMonuments: [
      { name: "Mahabodhi Temple", period: "3rd Century BCE", type: "Buddhist Sacred Complex" },
      { name: "Nalanda Mahavihara", period: "5th Century CE", type: "Ancient University" },
      { name: "Barabar Caves", period: "3rd Century BCE", type: "Mauryan Rock-Cut" }
    ],
    traditionalCrafts: [
      { name: "Madhubani Painting", tag: "GI Tagged" },
      { name: "Bhagalpuri Silk", tag: "GI Tagged" },
      { name: "Sikki Grass Craft", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Chhath Puja Rituals", "Bhojpuri Folk Songs", "Sonepur Cattle Fair"]
  },
  {
    id: "cg",
    name: "Chhattisgarh",
    code: "CG",
    capital: "Raipur",
    region: "Central",
    image: "https://images.unsplash.com/photo-1623059882285-d85023fa5d90?auto=format&fit=crop&w=800&q=80",
    description: "Heartland of ancient tribal kingdoms, lost-wax Bell Metal casting (Dhokra), and dense forested sanctuaries.",
    stats: { unescoSites: 0, giTags: 7, monuments: 210, craftGuilds: 45 },
    famousMonuments: [
      { name: "Bhoramdeo Temple", period: "11th Century CE", type: "Nagara Style" },
      { name: "Sirpur Brick Temple", period: "7th Century CE", type: "Lakhshmana Complex" },
      { name: "Chitrakote Waterfalls", period: "Natural", type: "Niagara of India" }
    ],
    traditionalCrafts: [
      { name: "Dhokra Metal Craft", tag: "GI Tagged" },
      { name: "Bastar Iron Craft", tag: "GI Tagged" },
      { name: "Kosa Silk Weaving", tag: "Heritage Craft" }
    ],
    culturalHighlights: ["Bastar Dussehra", "Panthi Tribal Dance", "Raut Nacha Folk Performers"]
  },
  {
    id: "ga",
    name: "Goa",
    code: "GA",
    capital: "Panaji",
    region: "West",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    description: "Enchanting coastal enclave renowned for Manueline Baroque churches, Portuguese forts, and coastal crafts.",
    stats: { unescoSites: 1, giTags: 5, monuments: 150, craftGuilds: 25 },
    famousMonuments: [
      { name: "Basilica of Bom Jesus", period: "1605 CE", type: "Baroque Architecture" },
      { name: "Aguada Fort", period: "1612 CE", type: "Portuguese Citadel" },
      { name: "Se Cathedral", period: "1619 CE", type: "Portuguese Gothic" }
    ],
    traditionalCrafts: [
      { name: "Goan Azulejos Tiles", tag: "Heritage Craft" },
      { name: "Feni Craft Spirits", tag: "GI Tagged" },
      { name: "Terracotta Pottery", tag: "Handicraft" }
    ],
    culturalHighlights: ["Goa Carnival", "Shigmo Festival", "Fado & Mando Music"]
  },
  {
    id: "gj",
    name: "Gujarat",
    code: "GJ",
    capital: "Gandhinagar",
    region: "West",
    image: "https://images.unsplash.com/photo-1609947017136-9efa23bba2ed?auto=format&fit=crop&w=800&q=80",
    description: "Cradle of subterranean stepwells, intricate double-ikat weaving, and Harappan maritime trade settlements.",
    stats: { unescoSites: 4, giTags: 17, monuments: 512, craftGuilds: 95 },
    famousMonuments: [
      { name: "Rani ki Vav", period: "1063 CE", type: "Maru-Gurjara Stepwell" },
      { name: "Sun Temple, Modhera", period: "1026 CE", type: "Solanki Dynastic Style" },
      { name: "Dholavira", period: "2500 BCE", type: "Harappan Metropolis" }
    ],
    traditionalCrafts: [
      { name: "Patan Double Ikat Patola", tag: "GI Tagged" },
      { name: "Kutch Rogan Painting", tag: "Rare Craft" },
      { name: "Tangaliya Shawl Weaving", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Garba & Raas Folk Arts", "Rann Craft Guilds", "Sankheda Lacquered Woodwork"]
  },
  {
    id: "hr",
    name: "Haryana",
    code: "HR",
    capital: "Chandigarh",
    region: "North",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    description: "Vedic cradle associated with the Mahabharata war, stepwells, brass metalworking, and rural craft fairs.",
    stats: { unescoSites: 0, giTags: 2, monuments: 110, craftGuilds: 40 },
    famousMonuments: [
      { name: "Sheikh Chilli Tomb", period: "1650 CE", type: "Mughal Architecture" },
      { name: "Surajkund Stepwell", period: "10th Century CE", type: "Tomar Dynasty Reservoir" },
      { name: "Pinjore Gardens", period: "17th Century CE", type: "Mughal Terraced Garden" }
    ],
    traditionalCrafts: [
      { name: "Phulkari Embroidery", tag: "GI Tagged" },
      { name: "Rewari Brass Metalwork", tag: "Handicraft" },
      { name: "Panipat Handlooms", tag: "Textile Craft" }
    ],
    culturalHighlights: ["Surajkund International Crafts Mela", "Ragini Folk Singing", "Saang Theatre"]
  },
  {
    id: "hp",
    name: "Himachal Pradesh",
    code: "HP",
    capital: "Shimla",
    region: "North",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
    description: "Himalayan abode featuring Kath-Kuni wooden architecture, miniature Kangra paintings, and handspun shawls.",
    stats: { unescoSites: 2, giTags: 10, monuments: 180, craftGuilds: 50 },
    famousMonuments: [
      { name: "Kalka-Shimla Railway", period: "1903 CE", type: "Mountain Railway" },
      { name: "Tabo Monastery", period: "996 CE", type: "Tibetan Buddhist Complex" },
      { name: "Kangra Fort", period: "4th Century BCE", type: "Royal Citadel" }
    ],
    traditionalCrafts: [
      { name: "Kullu Shawl", tag: "GI Tagged" },
      { name: "Kangra Miniature Painting", tag: "GI Tagged" },
      { name: "Chamba Rumal", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Kullu Dussehra", "Losar Traditions", "Nati Folk Dance"]
  },
  {
    id: "jh",
    name: "Jharkhand",
    code: "JH",
    capital: "Ranchi",
    region: "East",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80",
    description: "Forest realm celebrated for Jain pilgrimage hills, Sohrai tribal cave art, and masked Chhau performers.",
    stats: { unescoSites: 0, giTags: 2, monuments: 95, craftGuilds: 35 },
    famousMonuments: [
      { name: "Shikharji (Parasnath)", period: "Ancient", type: "Jain Sacred Pilgrimage" },
      { name: "Maluti Temples", period: "17th Century CE", type: "Terracotta Group" },
      { name: "Baidyanath Temple", period: "1596 CE", type: "Jyotirlinga Shrine" }
    ],
    traditionalCrafts: [
      { name: "Sohrai-Khovar Painting", tag: "GI Tagged" },
      { name: "Pyhkar Painting", tag: "Scroll Art" },
      { name: "Jadopatiya Art", tag: "Tribal Painting" }
    ],
    culturalHighlights: ["Seraikela Chhau Mask Dance", "Sarhul Forest Festival", "Karam Tribal Dance"]
  },
  {
    id: "ka",
    name: "Karnataka",
    code: "KA",
    capital: "Bengaluru",
    region: "South",
    image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80",
    description: "Realm of Badami Chalukya rock caves, Hoysala star-shaped temples, and Mysuru royal silk weaving.",
    stats: { unescoSites: 4, giTags: 46, monuments: 800, craftGuilds: 110 },
    famousMonuments: [
      { name: "Hampi Monuments", period: "14th Century CE", type: "Vijayanagara Imperial Capital" },
      { name: "Pattadakal Group", period: "8th Century CE", type: "Badami Chalukya Temples" },
      { name: "Belur & Halebidu", period: "12th Century CE", type: "Hoysala Sacred Ensembles" }
    ],
    traditionalCrafts: [
      { name: "Mysore Silk", tag: "GI Tagged" },
      { name: "Bidriware Metal Inlay", tag: "GI Tagged" },
      { name: "Channapatna Wooden Toys", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Yakshagana Dance-Drama", "Mysore Dasara Procession", "Kambala Buffalo Race"]
  },
  {
    id: "kl",
    name: "Kerala",
    code: "KL",
    capital: "Thiruvananthapuram",
    region: "South",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    description: "Maritime spice route hub known for wooden temple architecture, classical performance, and natural dyes.",
    stats: { unescoSites: 2, giTags: 31, monuments: 380, craftGuilds: 75 },
    famousMonuments: [
      { name: "Vadakkunnathan Temple", period: "10th Century CE", type: "Keralite Wood Architecture" },
      { name: "Bekal Fort", period: "1650 CE", type: "Coastal Citadel" },
      { name: "Padmanabhapuram Palace", period: "1601 CE", type: "Traditional Wooden Palace" }
    ],
    traditionalCrafts: [
      { name: "Kasavu Handloom Saree", tag: "GI Tagged" },
      { name: "Aranmula Kannadi Mirror", tag: "GI Tagged" },
      { name: "Nettur Petti Wooden Chest", tag: "Heritage Woodwork" }
    ],
    culturalHighlights: ["Kathakali Dance Drama", "Koodiyattam Sanskrit Theatre", "Theyyam Ritual Arts"]
  },
  {
    id: "mp",
    name: "Madhya Pradesh",
    code: "MP",
    capital: "Bhopal",
    region: "Central",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
    description: "Center of Chandela temple craftsmanship, prehistoric rock shelters, and historic hand-blocked textiles.",
    stats: { unescoSites: 3, giTags: 12, monuments: 860, craftGuilds: 88 },
    famousMonuments: [
      { name: "Khajuraho Group", period: "950 CE", type: "Nagara Architecture" },
      { name: "Sanchi Stupa", period: "3rd Century BCE", type: "Mauryan Heritage" },
      { name: "Bhimbetka Shelters", period: "10,000 BCE", type: "Paleolithic Rock Art" }
    ],
    traditionalCrafts: [
      { name: "Chanderi Weaving", tag: "GI Tagged" },
      { name: "Maheshwari Saree", tag: "GI Tagged" },
      { name: "Bagh Hand Block Print", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Gond Tribal Painting", "Malwa Folk Traditions", "Tansen Music Festival"]
  },
  {
    id: "mh",
    name: "Maharashtra",
    code: "MH",
    capital: "Mumbai",
    region: "West",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    description: "Land of Maratha hill forts, Ajanta and Ellora rock-cut monasteries, and iconic Paithani silks.",
    stats: { unescoSites: 5, giTags: 34, monuments: 920, craftGuilds: 105 },
    famousMonuments: [
      { name: "Ellora Kailasa Temple", period: "8th Century CE", type: "Monolithic Rock-cut" },
      { name: "Ajanta Caves", period: "2nd Century BCE", type: "Buddhist Murals" },
      { name: "Raigad Fort", period: "1674 CE", type: "Maratha Imperial Citadel" }
    ],
    traditionalCrafts: [
      { name: "Paithani Saree", tag: "GI Tagged" },
      { name: "Warli Folk Painting", tag: "GI Tagged" },
      { name: "Kolhapuri Chappl", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Ganesh Chaturthi Processions", "Lavani Dance Performance", "Powada Ballads"]
  },
  {
    id: "mn",
    name: "Manipur",
    code: "MN",
    capital: "Imphal",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1610211242337-1e5b1eb72851?auto=format&fit=crop&w=800&q=80",
    description: "Jewel of the Northeast, famed for floating Loktak Lake, Manipuri Classical Raas Leela, and black stone pottery.",
    stats: { unescoSites: 0, giTags: 5, monuments: 80, craftGuilds: 40 },
    famousMonuments: [
      { name: "Kangla Fort", period: "33 CE", type: "Ancient Royal Palace" },
      { name: "INA Memorial Moirang", period: "1944 CE", type: "Freedom Movement Monument" },
      { name: "Thalon Cave", period: "Prehistoric", type: "Natural Cave System" }
    ],
    traditionalCrafts: [
      { name: "Shaphee Lanphee Fabric", tag: "GI Tagged" },
      { name: "Longpi Black Pottery", tag: "Heritage Craft" },
      { name: "Moirang Phee Loom", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Manipuri Raas Leela Dance", "Yaoshang Festival", "Thang-Ta Martial Art"]
  },
  {
    id: "ml",
    name: "Meghalaya",
    code: "ML",
    capital: "Shillong",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    description: "Abode of clouds boasting living root bridges, Khasi megalithic stones, and Eri silk hand-weaving.",
    stats: { unescoSites: 0, giTags: 2, monuments: 60, craftGuilds: 30 },
    famousMonuments: [
      { name: "Nartiang Monoliths", period: "1500 CE", type: "Jaintia Megalithic Site" },
      { name: "Living Root Bridges", period: "Indigenous", type: "Bio-engineering Heritage" },
      { name: "Kyllang Rock", period: "Geological", type: "Granite Dome Peak" }
    ],
    traditionalCrafts: [
      { name: "Ryndia Eri Silk", tag: "Heritage Organic Textile" },
      { name: "Tlyngsi Bamboo Mat", tag: "Tribal Weave" },
      { name: "Khasi Cane Baskets", tag: "Handicraft" }
    ],
    culturalHighlights: ["Nongkrem Dance Festival", "Shad Suk Mynsiem", "Wangala Drum Festival"]
  },
  {
    id: "mz",
    name: "Mizoram",
    code: "MZ",
    capital: "Aizawl",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
    description: "Land of rolling hills, bamboo Cheraw dances, and complex geometric tribal loin-loom textiles.",
    stats: { unescoSites: 0, giTags: 4, monuments: 45, craftGuilds: 25 },
    famousMonuments: [
      { name: "Sibuta Lung Monument", period: "1500 CE", type: "Mizo Heritage Monolith" },
      { name: "Kawtchhuah Ropui", period: "Ancient", type: "Archaeological Site" },
      { name: "Castle of Be abuses", period: "Natural", type: "Geological Rock Wall" }
    ],
    traditionalCrafts: [
      { name: "Puan Loom Weaving", tag: "GI Tagged" },
      { name: "Pawndum Fabric", tag: "GI Tagged" },
      { name: "Mizo Bamboo Work", tag: "Craft Guild" }
    ],
    culturalHighlights: ["Cheraw Bamboo Dance", "Chapchar Kut Spring Festival", "Mim Kut"]
  },
  {
    id: "nl",
    name: "Nagaland",
    code: "NL",
    capital: "Kohima",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    description: "Land of warrior tribes, the Hornbill Festival, and vibrant Naga shawl motifs woven on backstrap looms.",
    stats: { unescoSites: 0, giTags: 4, monuments: 50, craftGuilds: 35 },
    famousMonuments: [
      { name: "Dimapur Kachari Ruins", period: "10th Century CE", type: "Mushroom Monoliths" },
      { name: "Kohima War Cemetery", period: "1944 CE", type: "WWII Heritage Site" },
      { name: "Khonoma Fort Village", period: "1879 CE", type: "Angami Tribal Settlement" }
    ],
    traditionalCrafts: [
      { name: "Naga Shawl Weaving", tag: "GI Tagged" },
      { name: "Naga Wood Carving", tag: "Heritage Art" },
      { name: "Spear & Shield Crafting", tag: "Tribal Armor" }
    ],
    culturalHighlights: ["Hornbill Festival", "Sekrenyi Purification Festival", "Moatsu Harvest Festival"]
  },
  {
    id: "od",
    name: "Odisha",
    code: "OD",
    capital: "Bhubaneswar",
    region: "East",
    image: "https://images.unsplash.com/photo-1608889825103-705188729586?auto=format&fit=crop&w=800&q=80",
    description: "Land of Kalinga architectural marvels, palm-leaf manuscripts, and ancient silk ikat weaving guilds.",
    stats: { unescoSites: 1, giTags: 19, monuments: 630, craftGuilds: 110 },
    famousMonuments: [
      { name: "Konark Sun Temple", period: "1250 CE", type: "Kalinga Stone Chariot" },
      { name: "Jagannath Temple, Puri", period: "1161 CE", type: "Kalinga Sacred Temple" },
      { name: "Udayagiri Caves", period: "2nd Century BCE", type: "Rock-cut Chambers" }
    ],
    traditionalCrafts: [
      { name: "Pattachitra Scroll Painting", tag: "GI Tagged" },
      { name: "Sambalpuri Bandha Ikat", tag: "GI Tagged" },
      { name: "Cuttack Silver Filigree", tag: "Handicraft" }
    ],
    culturalHighlights: ["Odissi Classical Dance", "Chhau Masked Dance", "Ratha Yatra Chariot Festival"]
  },
  {
    id: "pb",
    name: "Punjab",
    code: "PB",
    capital: "Chandigarh",
    region: "North",
    image: "https://images.unsplash.com/photo-1588096344356-9a2f2679848e?auto=format&fit=crop&w=800&q=80",
    description: "Land of five rivers, sacred Sikh shrines, vibrant Phulkari floral embroidery, and folk martial traditions.",
    stats: { unescoSites: 0, giTags: 3, monuments: 190, craftGuilds: 45 },
    famousMonuments: [
      { name: "Golden Temple (Sri Harmandir Sahib)", period: "1589 CE", type: "Sikh Sacred Gurdwara" },
      { name: "Qila Mubarak, Bathinda", period: "6th Century CE", type: "Ancient Brick Fort" },
      { name: "Jallianwala Bagh", period: "1919 CE", type: "Freedom Movement Memorial" }
    ],
    traditionalCrafts: [
      { name: "Phulkari Needlework", tag: "GI Tagged" },
      { name: "Jutti Footwear", tag: "Heritage Leathercraft" },
      { name: "Thatheras Metal Craft", tag: "UNESCO Heritage Craft" }
    ],
    culturalHighlights: ["Bhangra & Giddha Folk Dances", "Holla Mohalla Martial Fair", "Baisakhi Harvest Celebrations"]
  },
  {
    id: "rj",
    name: "Rajasthan",
    code: "RJ",
    capital: "Jaipur",
    region: "West",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    description: "Imperial land of Rajput fortresses, Thar desert palace architecture, block-printed muslins, and blue pottery.",
    stats: { unescoSites: 9, giTags: 16, monuments: 950, craftGuilds: 140 },
    famousMonuments: [
      { name: "Amer Fort, Jaipur", period: "1592 CE", type: "Rajput Citadel" },
      { name: "Jaisalmer Fort", period: "1156 CE", type: "Golden Sandstone Fort" },
      { name: "Chittorgarh Fort", period: "7th Century CE", type: "Massive Hill Citadel" }
    ],
    traditionalCrafts: [
      { name: "Jaipur Blue Pottery", tag: "GI Tagged" },
      { name: "Sanganeri Block Printing", tag: "GI Tagged" },
      { name: "Kathputli Puppetry", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Ghoomar Dance", "Kalbelia Folk Dance", "Desert Music & Manganiyar Ballads"]
  },
  {
    id: "sk",
    name: "Sikkim",
    code: "SK",
    capital: "Gangtok",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    description: "Himalayan kingdom overlooked by Kangchenjunga, rich in Vajrayana Buddhist art and Thangka scroll paintings.",
    stats: { unescoSites: 1, giTags: 1, monuments: 70, craftGuilds: 20 },
    famousMonuments: [
      { name: "Rumtek Monastery", period: "1966 CE", type: "Kagyu Buddhist Seat" },
      { name: "Pemayangtse Monastery", period: "1705 CE", type: "Nyingma Monastery" },
      { name: "Rabdentse Ruins", period: "1670 CE", type: "Former Royal Capital" }
    ],
    traditionalCrafts: [
      { name: "Thangka Painting", tag: "Sacred Art" },
      { name: "Choktse Carved Wooden Table", tag: "Heritage Craft" },
      { name: "Sikkimese Carpet Weaving", tag: "Handloom" }
    ],
    culturalHighlights: ["Cham Masked Dance", "Losoong Festival", "Pang Lhabsol Sacred Tribute"]
  },
  {
    id: "tn",
    name: "Tamil Nadu",
    code: "TN",
    capital: "Chennai",
    region: "South",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    description: "Cradle of Dravidian temple gopurams, ancient Chola bronzes, and heavy Kanchipuram woven silks.",
    stats: { unescoSites: 6, giTags: 58, monuments: 1100, craftGuilds: 150 },
    famousMonuments: [
      { name: "Brihadisvara Temple, Thanjavur", period: "1010 CE", type: "Great Living Chola Temple" },
      { name: "Mamallapuram Monuments", period: "7th Century CE", type: "Pallava Rock Sculptures" },
      { name: "Meenakshi Temple, Madurai", period: "1623 CE", type: "Dravidian Gopuram Complex" }
    ],
    traditionalCrafts: [
      { name: "Kanchipuram Silk Saree", tag: "GI Tagged" },
      { name: "Thanjavur Bronze Icons", tag: "GI Tagged" },
      { name: "Pattamadai Mat Weaving", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Bharatanatyam Classical Dance", "Thanjavur Art Plates", "Pongal Harvest Festival"]
  },
  {
    id: "ts",
    name: "Telangana",
    code: "TS",
    capital: "Hyderabad",
    region: "South",
    image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
    description: "Land of Kakatiya stone gateways, Qutb Shahi domes, Pochampally Ikat silk, and silver filigree.",
    stats: { unescoSites: 1, giTags: 15, monuments: 340, craftGuilds: 60 },
    famousMonuments: [
      { name: "Ramappa Temple", period: "1213 CE", type: "Kakatiya Sandbox Temple" },
      { name: "Charminar", period: "1591 CE", type: "Indo-Islamic Arch Monument" },
      { name: "Golconda Fort", period: "16th Century CE", type: "Acoustic Citadel" }
    ],
    traditionalCrafts: [
      { name: "Pochampally Ikat", tag: "GI Tagged" },
      { name: "Pembarthi Metal Craft", tag: "GI Tagged" },
      { name: "Cheriyal Scroll Painting", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Bathukamma Floral Festival", "Bonalu Celebrations", "Perini Thandavam Dance"]
  },
  {
    id: "tr",
    name: "Tripura",
    code: "TR",
    capital: "Agartala",
    region: "North-East",
    image: "https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=800&q=80",
    description: "Ancient Manikya royal seat featuring floating lake palaces, rock-cut bas-relief sculptures, and bamboo weaving.",
    stats: { unescoSites: 0, giTags: 3, monuments: 85, craftGuilds: 30 },
    famousMonuments: [
      { name: "Unakoti Rock Carvings", period: "7th-9th Century CE", type: "Shaivite Relief Sculptures" },
      { name: "Neermahal Palace", period: "1930 CE", type: "Water Palace" },
      { name: "Ujjayanta Palace", period: "1901 CE", type: "Indo-Saracenic Palace" }
    ],
    traditionalCrafts: [
      { name: "Tripura Cane & Bamboo", tag: "GI Tagged" },
      { name: "Rignai Tribal Loom", tag: "Heritage Handloom" },
      { name: "Handmade Wooden Carvings", tag: "Handicraft" }
    ],
    culturalHighlights: ["Garia Puja Festival", "Hojagiri Reang Dance", "Kharchi Puja Rituals"]
  },
  {
    id: "up",
    name: "Uttar Pradesh",
    code: "UP",
    capital: "Lucknow",
    region: "North",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    description: "The historical heartland of India's classical architecture, ancient riverfront cities, and regal handloom traditions.",
    stats: { unescoSites: 3, giTags: 34, monuments: 742, craftGuilds: 120 },
    famousMonuments: [
      { name: "Taj Mahal", period: "1632 CE", type: "Mughal Architecture" },
      { name: "Fatehpur Sikri", period: "1571 CE", type: "Imperial Mughal Citadel" },
      { name: "Sarnath Dhamek Stupa", period: "249 BCE", type: "Buddhist Heritage" }
    ],
    traditionalCrafts: [
      { name: "Chikan Embroidery", tag: "GI Tagged" },
      { name: "Banarasi Brocade Silk", tag: "GI Tagged" },
      { name: "Moradabad Brassware", tag: "Handicraft" }
    ],
    culturalHighlights: ["Kathak Dance Tradition", "Varanasi Ganga Aarti", "Awadhi Culinary Legacy"]
  },
  {
    id: "uk",
    name: "Uttarakhand",
    code: "UK",
    capital: "Dehradun",
    region: "North",
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=80",
    description: "Sacred Himalayan Devbhumi featuring wooden stone temples, Aipan floor art, and ringal cane weaves.",
    stats: { unescoSites: 1, giTags: 18, monuments: 230, craftGuilds: 45 },
    famousMonuments: [
      { name: "Kedarnath Temple", period: "8th Century CE", type: "Himalayan Stone Temple" },
      { name: "Jageshwar Dham", period: "7th-14th Century CE", type: "Cluster of 124 Temples" },
      { name: "Badrinath Temple", period: "Ancient", type: "Sacred Char Dham Shrine" }
    ],
    traditionalCrafts: [
      { name: "Aipan Ritual Painting", tag: "GI Tagged" },
      { name: "Ringal Bamboo Craft", tag: "GI Tagged" },
      { name: "Uttarakhand Woolen Shawls", tag: "Handloom" }
    ],
    culturalHighlights: ["Nanda Devi Raj Jat Yatra", "Choliya Dance", "Kumbh Mela at Haridwar"]
  },
  {
    id: "wb",
    name: "West Bengal",
    code: "WB",
    capital: "Kolkata",
    region: "East",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
    description: "Cultural hub of terracotta temples, colonial heritage, Baluchari silk weaving, and Durga Puja artistry.",
    stats: { unescoSites: 2, giTags: 25, monuments: 510, craftGuilds: 115 },
    famousMonuments: [
      { name: "Bishnupur Terracotta Temples", period: "17th Century CE", type: "Malla Dynasty Terracotta" },
      { name: "Victoria Memorial", period: "1921 CE", type: "Indo-Gothic Marble" },
      { name: "Hazarduari Palace", period: "1837 CE", type: "Greek Doric Architecture" }
    ],
    traditionalCrafts: [
      { name: "Baluchari Saree", tag: "GI Tagged" },
      { name: "Purulia Chhau Mask", tag: "GI Tagged" },
      { name: "Dokra Metal Art", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Durga Puja Festival", "Rabindra Sangeet & Baul Singers", "Patuatola Scroll Singing"]
  },

  // --- UNION TERRITORIES ---
  {
    id: "an",
    name: "Andaman & Nicobar Islands",
    code: "AN",
    capital: "Port Blair",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    description: "Tropical archipelago known for penal freedom movement heritage, Indigenous Nicobari crafts, and marine biodiversity.",
    stats: { unescoSites: 0, giTags: 1, monuments: 30, craftGuilds: 15 },
    famousMonuments: [
      { name: "Cellular Jail", period: "1906 CE", type: "Freedom Movement Monument" },
      { name: "Ross Island Ruins", period: "19th Century CE", type: "Colonial Headquarters" },
      { name: "Viper Island Gallows", period: "1867 CE", type: "Historical Penal Site" }
    ],
    traditionalCrafts: [
      { name: "Nicobari Mat Weaving", tag: "GI Tagged" },
      { name: "Shell Carving & Jewelry", tag: "Coastal Handicraft" },
      { name: "Coconut Shell Crafts", tag: "Artisan Craft" }
    ],
    culturalHighlights: ["Island Tourism Festival", "Indigenous Tribal Lore", "Coastal Sea Traditions"]
  },
  {
    id: "ch",
    name: "Chandigarh",
    code: "CH",
    capital: "Chandigarh",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    description: "Modern planned city created by Le Corbusier, famous for modernist concrete Capitol architecture and the Rock Garden.",
    stats: { unescoSites: 1, giTags: 0, monuments: 15, craftGuilds: 10 },
    famousMonuments: [
      { name: "Capitol Complex", period: "1953 CE", type: "Le Corbusier Modernist Site" },
      { name: "Nek Chand Rock Garden", period: "1957 CE", type: "Outsider Recycled Art" },
      { name: "Open Hand Monument", period: "1985 CE", type: "Modern Sculptural Symbol" }
    ],
    traditionalCrafts: [
      { name: "Phulkari Textiles", tag: "Shared Regional Tag" },
      { name: "Terracotta Planters", tag: "Local Craft" },
      { name: "Modernist Furniture Inlay", tag: "Design Heritage" }
    ],
    culturalHighlights: ["Rose Festival", "Chandigarh Carnival", "Modern Urban Planning Legacy"]
  },
  {
    id: "dn",
    name: "Dadra and Nagar Haveli and Daman and Diu",
    code: "DN",
    capital: "Daman",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    description: "Enchanting coastal enclaves with 400 years of Portuguese fort architecture, sea walls, and Warli art influence.",
    stats: { unescoSites: 0, giTags: 0, monuments: 40, craftGuilds: 12 },
    famousMonuments: [
      { name: "Diu Fort", period: "1535 CE", type: "Portuguese Sea Fortress" },
      { name: "Moti Daman Fort", period: "1559 CE", type: "Colonial Walled Town" },
      { name: "St. Paul's Church, Diu", period: "1610 CE", type: "Baroque Architecture" }
    ],
    traditionalCrafts: [
      { name: "Tortoise Shell Carving", tag: "Traditional Craft" },
      { name: "Mat Weaving", tag: "Handicraft" },
      { name: "Warli Tribal Motif Art", tag: "Regional Print" }
    ],
    culturalHighlights: ["Folk Dance Festivals", "Nariyal Poornima", "Portuguese Coastal Heritage"]
  },
  {
    id: "dl",
    name: "Delhi",
    code: "DL",
    capital: "New Delhi",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    description: "The historic capital of empires, bridging ancient Sultanate and Mughal monuments with imperial British architecture.",
    stats: { unescoSites: 3, giTags: 1, monuments: 1200, craftGuilds: 85 },
    famousMonuments: [
      { name: "Qutb Minar Complex", period: "1192 CE", type: "Delhi Sultanate Victory Tower" },
      { name: "Humayun's Tomb", period: "1572 CE", type: "Mughal Garden Tomb" },
      { name: "Red Fort (Lal Qila)", period: "1648 CE", type: "Mughal Imperial Palace" }
    ],
    traditionalCrafts: [
      { name: "Zardozi Gold Embroidery", tag: "GI Tagged" },
      { name: "Delhi Bone & Horn Inlay", tag: "Heritage Handicraft" },
      { name: "Ittar Perfumery", tag: "Old Delhi Craft" }
    ],
    culturalHighlights: ["Old Delhi Street Food Traditions", "Qutub Festival of Music", "Republic Day Parade"]
  },
  {
    id: "jk",
    name: "Jammu and Kashmir",
    code: "JK",
    capital: "Srinagar (Summer) / Jammu (Winter)",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
    description: "Fabled valley of Mughal terraced gardens, wooden shrines, fine Pashmina weaving, and papier-mâché art.",
    stats: { unescoSites: 0, giTags: 9, monuments: 310, craftGuilds: 90 },
    famousMonuments: [
      { name: "Shalimar Bagh, Srinagar", period: "1619 CE", type: "Mughal Terraced Garden" },
      { name: "Martand Sun Temple", period: "8th Century CE", type: "Karkota Dynasty Ruin" },
      { name: "Hari Parbat Fort", period: "18th Century CE", type: "Durrani Citadel" }
    ],
    traditionalCrafts: [
      { name: "Kashmir Pashmina Shawl", tag: "GI Tagged" },
      { name: "Kashmiri Papier-Mâché", tag: "GI Tagged" },
      { name: "Walnut Wood Carving", tag: "GI Tagged" }
    ],
    culturalHighlights: ["Shikara Culture on Dal Lake", "Rouf Folk Dance", "Sufiyana Kalam Music"]
  },
  {
    id: "la",
    name: "Ladakh",
    code: "LA",
    capital: "Leh",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    description: "High-altitude desert wonderland marked by Tibetan Buddhist monasteries, mountain passes, and Ladakhi Pashmina.",
    stats: { unescoSites: 0, giTags: 2, monuments: 90, craftGuilds: 30 },
    famousMonuments: [
      { name: "Hemis Monastery", period: "1672 CE", type: "Drukpa Lineage Complex" },
      { name: "Leh Palace", period: "1600 CE", type: "Namgyal Dynasty Citadel" },
      { name: "Thiksey Monastery", period: "1430 CE", type: "Gelugpa Monastery" }
    ],
    traditionalCrafts: [
      { name: "Ladakh Pashmina (Pashm)", tag: "GI Tagged" },
      { name: "Ladakhi Wood Carving", tag: "GI Tagged" },
      { name: "Metal Repoussé Prayer Wheels", tag: "Sacred Craft" }
    ],
    culturalHighlights: ["Hemis Tsechu Festival", "Ladakhi Archery Contests", "Monastic Cham Dances"]
  },
  {
    id: "ld",
    name: "Lakshadweep",
    code: "LD",
    capital: "Kavaratti",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    description: "Coral atoll enclave characterized by traditional wooden boat building, coir crafts, and marine traditions.",
    stats: { unescoSites: 0, giTags: 0, monuments: 20, craftGuilds: 10 },
    famousMonuments: [
      { name: "Ujra Mosque, Kavaratti", period: "17th Century CE", type: "Carved Wooden Shrine" },
      { name: "Minicoy Lighthouse", period: "1885 CE", type: "British Maritime Tower" },
      { name: "Kalpeni Atoll Heritage", period: "Historical", type: "Maritime Settlement" }
    ],
    traditionalCrafts: [
      { name: "Coir Mat & Rope Crafts", tag: "Island Fiber" },
      { name: "Coral Stone Carving", tag: "Heritage Craft" },
      { name: "Traditional Boat (Oda) Building", tag: "Maritime Guild" }
    ],
    culturalHighlights: ["Lava Dance of Minicoy", "Kolkali Folk Dance", "Traditional Island Sea Lore"]
  },
  {
    id: "py",
    name: "Puducherry",
    code: "PY",
    capital: "Puducherry",
    region: "Union Territory",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    description: "French colonial coastal enclave featuring Franco-Tamil architecture, handmade paper, and spiritual communes.",
    stats: { unescoSites: 0, giTags: 2, monuments: 65, craftGuilds: 25 },
    famousMonuments: [
      { name: "Auroville Matrimandir", period: "1971 CE", type: "Modernist Golden Dome" },
      { name: "French Quarter (White Town)", period: "18th Century CE", type: "French Colonial Precinct" },
      { name: "Arikamedu Archaeological Site", period: "2nd Century BCE", type: "Ancient Roman Trade Port" }
    ],
    traditionalCrafts: [
      { name: "Puducherry Handmade Paper", tag: "GI Tagged" },
      { name: "Tanjore Style Glass Painting", tag: "Handicraft" },
      { name: "Terracotta Doll Craft", tag: "GI Tagged" }
    ],
    culturalHighlights: ["International Yoga Festival", "Franco-Tamil Culinary Fusion", "Auroville Eco-Living Culture"]
  }
];

export function StatesAtlas() {
  const [selectedStateId, setSelectedStateId] = useState<string>("up");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<typeof REGIONS[number]>("All");

  const filteredStates = STATES_DATA.filter((st) => {
    const matchesRegion = activeRegion === "All" || st.region === activeRegion;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.traditionalCrafts.some((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesRegion && matchesSearch;
  });

  const activeState =
    STATES_DATA.find((s) => s.id === selectedStateId) || STATES_DATA[0];

  return (
    <section
      id="states-atlas"
      className="w-full bg-slate-50 text-slate-900 py-10 px-4 md:px-6 border-b border-slate-200"
    >
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
              Explore regional monuments, GI-tagged heritage crafts, and indigenous architectural footprints across India&apos;s 28 States and 8 Union Territories.
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
              <span>Select Territory ({filteredStates.length})</span>
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
                  No state or territory matching your search criteria.
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
                      {activeState.region}
                    </span>
                    <span className="text-xs text-slate-300 font-mono">CODE: {activeState.code}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">{activeState.name}</h2>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-amber-400" /> Capital: <span className="text-white font-bold">{activeState.capital}</span>
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