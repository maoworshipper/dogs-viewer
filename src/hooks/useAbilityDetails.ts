import { useQuery } from '@tanstack/react-query';
import { fetchAbilityDetails } from '../services/api';
import { IAbilityDetails } from '../types/dataTypes';

export const useAbilityDetails = (abilityUrl: string | null) => {
  return useQuery<IAbilityDetails, Error>({
    queryKey: ['abilityDetails', abilityUrl],
    queryFn: () => fetchAbilityDetails(abilityUrl!),
    enabled: !!abilityUrl,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};