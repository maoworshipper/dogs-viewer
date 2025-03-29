import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppProvider } from "../../context/AppProvider";
import MainTable from "./MainTable";
import { IPokemon } from "../../types/dataTypes";

// Mock ItemTableRow component to isolate MainTable tests
jest.mock("../ItemTableRow/ItemTableRow", () => ({
  __esModule: true,
  default: ({ pokemonInfo }: { pokemonInfo: IPokemon }) => (
    <tr data-testid={`mocked-row-${pokemonInfo.name}`}>
      <td>{pokemonInfo.name}</td>
      <td>Mocked Image</td>
    </tr>
  ),
}));

describe("MainTable Component", () => {
  const mockPokemonList: IPokemon[] = [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  ];

  it("should render loading message when isLoading is true", () => {
    render(
      <AppProvider>
        <MainTable pokemonList={[]} isLoading={true} />
      </AppProvider>
    );
    
    const loadingMessage = screen.getByText(/Cargando Pokémones.../i);
    expect(loadingMessage).toBeInTheDocument();
    expect(loadingMessage).toHaveClass("loading-message");
  });

  it("should render no results message when pokemonList is empty", () => {
    render(
      <AppProvider>
        <MainTable pokemonList={[]} isLoading={false} />
      </AppProvider>
    );
    
    const noResultsMessage = screen.getByText(/No se encontraron Pokémones con ese nombre/i);
    expect(noResultsMessage).toBeInTheDocument();
    expect(noResultsMessage).toHaveClass("no-results-message");
  });

  it("should render table with correct headers when pokemonList has items", () => {
    render(
      <AppProvider>
        <MainTable pokemonList={mockPokemonList} isLoading={false} />
      </AppProvider>
    );
    
    // Check that the table is rendered
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("pokemon-table");
    
    // Check that the table headers are rendered
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent("Nombre");
    expect(headers[1]).toHaveTextContent("Imagen");
  });

  it("should render rows for each Pokémon in the list", () => {
    render(
      <AppProvider>
        <MainTable pokemonList={mockPokemonList} isLoading={false} />
      </AppProvider>
    );
    
    // Check that each Pokémon has a row in the table
    mockPokemonList.forEach(pokemon => {
      const row = screen.getByTestId(`mocked-row-${pokemon.name}`);
      expect(row).toBeInTheDocument();
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  it("should render the correct number of rows", () => {
    render(
      <AppProvider>
        <MainTable pokemonList={mockPokemonList} isLoading={false} />
      </AppProvider>
    );
    
    // The table should have the same number of rows as Pokémon in the list
    const rows = screen.getAllByTestId(/mocked-row-/);
    expect(rows).toHaveLength(mockPokemonList.length);
  });
});