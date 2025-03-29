import React, { useState, ReactNode, useCallback } from "react";
import { AppContext } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string | null>(
    null
  );

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const openPokemonModal = useCallback((url: string) => {
    setSelectedPokemonUrl(url);
  }, []);

  const closePokemonModal = useCallback(() => {
    setSelectedPokemonUrl(null);
  }, []);

  const value = {
    searchTerm,
    currentPage,
    selectedPokemonUrl,
    setSearchTerm,
    setCurrentPage,
    setSelectedPokemonUrl,
    resetToFirstPage,
    openPokemonModal,
    closePokemonModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
