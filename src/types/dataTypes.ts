export interface IDataFetch {
  page?: number;
  limit?: number;
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IAbilitie {
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
  abilities: IAbilitie[];
  weight: number;
  types: IType[];
}
