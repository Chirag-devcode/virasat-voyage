import { useQuery } from "@tanstack/react-query";
import {
  getContentCards,
  getCrafts,
  getCulturalTrails,
  getDancesMusic,
  getDidYouKnow,
  getFestivals,
  getGuruShishya,
  getHeritage,
  getMonuments,
  getOralStories,
  getStates,
  getUnescoIch,
  type QueryOptions,
} from "@/services/heritage";

const opt = <T>(key: string, fn: () => Promise<T>, o?: QueryOptions) => ({
  queryKey: [key, o ?? {}] as const,
  queryFn: fn,
  staleTime: 5 * 60 * 1000,
});

export const useHeritage = (o?: QueryOptions) => useQuery(opt("heritage_master", () => getHeritage(o), o));
export const useStatesUts = (o?: QueryOptions) => useQuery(opt("states_uts", () => getStates(o), o));
export const useMonuments = (o?: QueryOptions) => useQuery(opt("monuments", () => getMonuments(o), o));
export const useFestivals = (o?: QueryOptions) => useQuery(opt("festivals", () => getFestivals(o), o));
export const useCrafts = (o?: QueryOptions) => useQuery(opt("crafts", () => getCrafts(o), o));
export const useDancesMusic = (o?: QueryOptions) => useQuery(opt("dances_music", () => getDancesMusic(o), o));
export const useOralStories = (o?: QueryOptions) => useQuery(opt("oral_vault", () => getOralStories(o), o));
export const useCulturalTrails = (o?: QueryOptions) =>
  useQuery(opt("cultural_trails", () => getCulturalTrails(o), o));
export const useGuruShishya = (o?: QueryOptions) => useQuery(opt("guru_shishya", () => getGuruShishya(o), o));
export const useUnescoIch = (o?: QueryOptions) => useQuery(opt("unesco_ich", () => getUnescoIch(o), o));
export const useContentCards = (o?: QueryOptions) => useQuery(opt("content_cards", () => getContentCards(o), o));
export const useDidYouKnow = (o?: QueryOptions) => useQuery(opt("did_you_know", () => getDidYouKnow(o), o));
