import { fetchAllItems, fetchItemDetails, fetchAbilityDetails } from './api';
import { IDataResponse, IPokemonDetail, IAbilityDetails } from '../types/dataTypes';

global.fetch = jest.fn();

describe('API service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchAllItems', () => {
    it('should fetch pokemon list with default limit', async () => {
      // Mock successful response
      const mockResponse: IDataResponse = {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=1400&limit=1400',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchAllItems();
      
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=1400&offset=0');
      expect(result).toEqual(mockResponse);
    });

    it('should fetch pokemon list with custom limit', async () => {
      // Mock successful response
      const mockResponse: IDataResponse = {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=50&limit=50',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchAllItems(50);
      
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchAllItems()).rejects.toThrow('Error fetching data: 404');
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(fetchAllItems()).rejects.toThrow(`Failed to fetch from https://pokeapi.co/api/v2/pokemon?limit=1400&offset=0: Network error`);
    });
  });

  describe('fetchItemDetails', () => {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/1/';
    
    it('should fetch pokemon details successfully', async () => {
      // Mock successful response
      const mockResponse: IPokemonDetail = {
        id: 1,
        name: 'bulbasaur',
        abilities: [
          {
            ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
            is_hidden: false,
            slot: 1
          }
        ],
        weight: 69,
        types: [
          {
            slot: 1,
            type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
          }
        ],
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchItemDetails(pokemonUrl);
      
      expect(global.fetch).toHaveBeenCalledWith(pokemonUrl);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchItemDetails(pokemonUrl)).rejects.toThrow('Error fetching data: 404');
    });
  });

  describe('fetchAbilityDetails', () => {
    const abilityUrl = 'https://pokeapi.co/api/v2/ability/65/';
    
    it('should fetch ability details successfully', async () => {
      // Mock successful response
      const mockResponse: IAbilityDetails = {
        id: 65,
        name: 'overgrow',
        effect_entries: [
          {
            effect: 'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.',
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
            short_effect: 'Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.'
          }
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchAbilityDetails(abilityUrl);
      
      expect(global.fetch).toHaveBeenCalledWith(abilityUrl);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(fetchAbilityDetails(abilityUrl)).rejects.toThrow('Error fetching data: 404');
    });
  });
});