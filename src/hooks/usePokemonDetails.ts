import { useQuery } from '@tanstack/react-query';
import { fetchItemDetails } from '../services/api';
import { IPokemonDetail } from '../types/dataTypes';

export const usePokemonDetails = (pokemonUrl: string | null) => {
  return useQuery<IPokemonDetail, Error>({
    queryKey: ['pokemonDetails', pokemonUrl],
    queryFn: () => fetchItemDetails(pokemonUrl!),
    enabled: !!pokemonUrl,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};