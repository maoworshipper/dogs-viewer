import { fetchAllItems, fetchDogImages, fetchBreedInfo } from './api';
import { IDataResponse, IDogImages, IBreedInfo } from '../types/dataTypes';

globalThis.fetch = jest.fn();

describe('API service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchAllItems', () => {
    it('should fetch dog breeds list successfully', async () => {
      // Mock successful response
      const mockResponse: IDataResponse = {
        message: {
          'labrador': [],
          'bulldog': ['english', 'french'],
          'retriever': ['golden']
        },
        status: 'success'
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchAllItems();
      
      expect(globalThis.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
      expect(result).toEqual([
        { name: 'labrador', subBreeds: [] },
        { name: 'bulldog', subBreeds: ['english', 'french'] },
        { name: 'retriever', subBreeds: ['golden'] }
      ]);
    });

    it('should throw an error when fetch fails', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchAllItems()).rejects.toThrow('Error fetching data: 404');
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(fetchAllItems()).rejects.toThrow(`Failed to fetch from https://dog.ceo/api/breeds/list/all: Network error`);
    });
  });

  describe('fetchDogImages', () => {
    it('should fetch dog images for a breed successfully', async () => {
      const breed = 'labrador';
      // Mock successful response
      const mockResponse: IDogImages = {
        message: [
          'https://images.dog.ceo/breeds/labrador/n02099712_1.jpg',
          'https://images.dog.ceo/breeds/labrador/n02099712_2.jpg'
        ],
        status: 'success'
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchDogImages(breed);
      
      expect(globalThis.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breed/labrador/images');
      expect(result).toEqual(mockResponse);
    });

    it('should fetch dog images for a sub-breed successfully', async () => {
      const breed = 'bulldog';
      const subBreed = 'english';
      // Mock successful response
      const mockResponse: IDogImages = {
        message: [
          'https://images.dog.ceo/breeds/bulldog-english/n02108551_1.jpg'
        ],
        status: 'success'
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchDogImages(breed, subBreed);
      
      expect(globalThis.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breed/bulldog/english/images');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when fetch fails', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchDogImages('unknown')).rejects.toThrow('Error fetching data: 404');
    });
  });

  describe('fetchBreedInfo', () => {
    it('should fetch breed info successfully', async () => {
      const breedName = 'labrador';
      // Mock successful response
      const mockResponse: IBreedInfo[] = [
        {
          weight: { imperial: '55-80 lbs', metric: '25-36 kg' },
          height: { imperial: '21.5-24.5 inches', metric: '55-62 cm' },
          life_span: '10-12 years',
          temperament: 'Outgoing, Even Tempered, Gentle, Agile, Kind, Intelligent',
          origin: 'Canada',
          bred_for: 'Water retrieval'
        }
      ];

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchBreedInfo(breedName);
      
      expect(globalThis.fetch).toHaveBeenCalledWith('https://api.thedogapi.com/v1/breeds/search?q=labrador');
      expect(result).toEqual(mockResponse);
    });

    it('should return fallback data when fetch fails', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await fetchBreedInfo('unknown');
      
      expect(result).toEqual([{
        weight: { imperial: "20-40 lbs", metric: "9-18 kg" },
        height: { imperial: "12-16 inches", metric: "30-41 cm" },
        life_span: "10-14 years",
        temperament: "Friendly, Loyal, Energetic",
        origin: "Unknown",
        bred_for: "Companionship"
      }]);
    });

    it('should handle network errors with fallback data', async () => {
      const networkError = new Error('Network error');
      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      const result = await fetchBreedInfo('labrador');
      
      expect(result).toEqual([{
        weight: { imperial: "20-40 lbs", metric: "9-18 kg" },
        height: { imperial: "12-16 inches", metric: "30-41 cm" },
        life_span: "10-14 years",
        temperament: "Friendly, Loyal, Energetic",
        origin: "Unknown",
        bred_for: "Companionship"
      }]);
    });
  });
});