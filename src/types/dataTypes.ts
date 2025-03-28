export interface AppContextState {
  searchTerm: string;
  currentPage: number;
  selectedPokemonUrl: string | null;
}

export interface IPokemon {
  id?: string;
  name: string;
  url: string;
}

export interface IDataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}

export interface IAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonDetail {
  id: number;
  name: string;
  abilities: IAbility[];
  weight: number;
  types: IType[];
  sprites: {
    front_default: string | null;
  };
}

export interface IAbilityEffectEntry {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

export interface IAbilityDetails {
  id: number;
  name: string;
  effect_entries: IAbilityEffectEntry[];
}
