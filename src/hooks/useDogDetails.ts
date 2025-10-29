import { useQuery } from '@tanstack/react-query';
import { fetchDogImages, fetchBreedInfo } from '../services/api';
import { IDogImages, IBreedInfo } from '../types/dataTypes';

export const useDogDetails = (breed: string | null) => {
  const imagesQuery = useQuery<IDogImages, Error>({
    queryKey: ['dogImages', breed],
    queryFn: () => fetchDogImages(breed!),
    enabled: !!breed,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const infoQuery = useQuery<IBreedInfo[], Error>({
    queryKey: ['breedInfo', breed],
    queryFn: () => fetchBreedInfo(breed!),
    enabled: !!breed,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return {
    images: imagesQuery.data,
    breedInfo: infoQuery.data?.[0],
    isLoading: imagesQuery.isLoading || infoQuery.isLoading,
    isError: imagesQuery.isError || infoQuery.isError,
    error: imagesQuery.error || infoQuery.error,
  };
};