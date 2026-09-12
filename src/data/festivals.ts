export interface Festival {
  id: string;
  name: string;
  state: string;
  daysAway: number;
  dateStr: string;
  description: string;
  historicalFact: string;
  tradition: string;
}

export interface Competition {
  id: string;
  title: string;
  type: string;
  region: string;
  location: string;
  prizePool: string;
  teamSize: string;
  deadline: string;
}

export const UPCOMING_FESTIVALS: Festival[] = [
  {
    id: "f1",
    name: "Dahi Handi (Janmashtami)",
    state: "Maharashtra & North India",
    daysAway: 2,
    dateStr: "Upcoming in 2 Days",
    description: "Athletes form multi-layer human pyramids ('Govindas') to break an earthen pot filled with curd hanging high in the air.",
    historicalFact: "Reenacts Lord Krishna's childhood antics of stealing butter with his friends in Vrindavan.",
    tradition: "Requires immense teamwork, balance, and physical conditioning across multi-tier teams."
  },
  {
    id: "f2",
    name: "Vallam Kali (Snake Boat Race)",
    state: "Kerala (South India)",
    daysAway: 5,
    dateStr: "Upcoming in 5 Days",
    description: "Massive 100-foot-long Chundan Vallams (snake boats) with 100+ oarsmen row in synchronization to traditional Vanchipattu songs.",
    historicalFact: "Originated in the 14th century when local kings fought naval battles along the backwaters of Alappuzha.",
    tradition: "Teams train for months to master rhythmic rowing at speeds over 15 km/h."
  },
  {
    id: "f3",
    name: "Kambala Buffalo Sprint",
    state: "Karnataka",
    daysAway: 8,
    dateStr: "Upcoming in 8 Days",
    description: "An annual muddy paddy field buffalo sprint where jockey sprinters guide a pair of lashed buffaloes.",
    historicalFact: "Began over 800 years ago as an agricultural tribute to local deities for a fertile harvest.",
    tradition: "Inter-district speed competition evaluated on splash height and completion time."
  }
];

export const INTERSTATE_COMPETITIONS: Competition[] = [
  {
    id: "c1",
    title: "National Govinda Dahi Handi Challenge",
    type: "Human Pyramid",
    region: "North & West Zone",
    location: "Thane, Maharashtra",
    prizePool: "₹5,00,000",
    teamSize: "20 - 50 members",
    deadline: "Registration open"
  },
  {
    id: "c2",
    title: "All-India Champion Snake Boat League",
    type: "Aquatic Rowing",
    region: "South Zone",
    location: "Punnamada Lake, Kerala",
    prizePool: "₹7,50,000",
    teamSize: "60 - 110 members",
    deadline: "Registration open"
  }
];