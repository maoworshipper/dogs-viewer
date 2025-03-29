import { useQuery } from "@tanstack/react-query";
import { fetchAllItems } from "../services/api";
import { IPokemon } from "../types/dataTypes";

export const usePokemonList = (limit: number = 1400) => {
  return useQuery<IPokemon[], Error>({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const data = await fetchAllItems(limit);
      return data.results;
    },
    staleTime: Infinity, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
