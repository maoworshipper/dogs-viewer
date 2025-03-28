import { useMemo, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MainTable from "./components/MainTable/MainTable";
import Pagination from "./components/Pagination/Pagination";
import ItemDetailModal from "./components/ItemDetailModal/ItemDetailModal";
import { useAppContext, usePokemonList, usePagination } from "./hooks/index";
import { IPokemon } from "./types/dataTypes";
import "./App.css";

const ITEMS_PER_PAGE = 10;

function App() {
  const {
    searchTerm,
    currentPage,
    selectedPokemonUrl,
    closePokemonModal,
    resetToFirstPage,
  } = useAppContext();

  const {
    data: allPokemon = [],
    isLoading: isLoadingList,
    isError: isListError,
    error: listError,
  } = usePokemonList();

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) {
      return allPokemon;
    }
    return allPokemon.filter((pokemon: IPokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPokemon, searchTerm]);

  const { paginatedData: displayPokemon, totalPages } = usePagination({
    data: filteredPokemon,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      resetToFirstPage();
    }
  }, [
    currentPage,
    totalPages,
    resetToFirstPage,
    filteredPokemon.length,
    allPokemon.length,
  ]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PK Viewer</h1>
      </header>

      <main>
        <SearchBar />

        {isListError && (
          <p className="error-message">
            Error cargando la lista: {listError?.message || "Error desconocido"}
          </p>
        )}

        <MainTable
          pokemonList={displayPokemon}
          isLoading={isLoadingList && !allPokemon.length}
        />

        {!isLoadingList && filteredPokemon.length > 0 && totalPages > 1 && (
          <Pagination totalPages={totalPages} />
        )}
      </main>

      {selectedPokemonUrl && (
        <ItemDetailModal
          pokemonUrl={selectedPokemonUrl}
          onClose={closePokemonModal}
        />
      )}
    </div>
  );
}

export default App;
