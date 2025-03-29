import { useQuery } from "@tanstack/react-query";
import { fetchItemDetails } from "../services/api";
import { IPokemonDetail } from "../types/dataTypes";

export const usePokemonSprite = (pokemonUrl: string | null) => {
  return useQuery<
    IPokemonDetail,
    Error,
    string | null,
    readonly ["pokemonDetails", string | null]
  >({
    queryKey: ["pokemonDetails", pokemonUrl],
    queryFn: () => fetchItemDetails(pokemonUrl!),
    enabled: !!pokemonUrl,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (data: IPokemonDetail) => data.sprites.front_default,
  });
};
