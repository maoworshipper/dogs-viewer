import { createContext, Dispatch, SetStateAction } from "react";
import { AppContextState } from "../types/dataTypes";

export interface AppContextType extends AppContextState {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSelectedPokemonUrl: Dispatch<SetStateAction<string | null>>;
  resetToFirstPage: () => void;
  openPokemonModal: (url: string) => void;
  closePokemonModal: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
