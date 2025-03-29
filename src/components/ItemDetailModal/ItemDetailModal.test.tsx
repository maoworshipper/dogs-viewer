import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemDetailModal from "./ItemDetailModal";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { useAbilityDetails } from "../../hooks/useAbilityDetails";
import { IAbilityDetails } from "../../types/dataTypes";

// Mock the hooks
jest.mock("../../hooks/usePokemonDetails");
jest.mock("../../hooks/useAbilityDetails");

// Mock the AbilityDetail component
jest.mock("../AbilityDetail/AbilityDetail", () => ({
  __esModule: true,
  default: ({ details, isLoading, error }: {
    details: IAbilityDetails | null;
    isLoading: boolean;
    error: string | null;
  }) => (
    <div data-testid="ability-detail">
      {isLoading && <div data-testid="ability-loading">Loading...</div>}
      {error && <div data-testid="ability-error">{error}</div>}
      {details && <div data-testid="ability-content">{details.name}</div>}
    </div>
  )
}));

describe("ItemDetailModal Component", () => {
  const mockPokemonUrl = "https://pokeapi.co/api/v2/pokemon/1/";
  const mockOnClose = jest.fn();
  
  const mockPokemonDetails = {
    name: "bulbasaur",
    weight: 69,
    sprites: {
      front_default: "https://pokeapi.co/media/sprites/pokemon/1.png"
    },
    types: [
      { type: { name: "grass" } },
      { type: { name: "poison" } }
    ],
    abilities: [
      { ability: { name: "overgrow", url: "https://pokeapi.co/api/v2/ability/65/" } },
      { ability: { name: "chlorophyll", url: "https://pokeapi.co/api/v2/ability/34/" } }
    ]
  };

  const mockAbilityDetails = {
    name: "overgrow",
    effect_entries: [
      {
        effect: "When HP is below 1/3rd, Grass-type moves are strengthened to 1.5× their power.",
        language: { name: "en" }
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state when fetching pokemon details", () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    expect(screen.getByText(/Cargando detalles.../i)).toBeInTheDocument();
  });

  it("should show error state when pokemon details fetch fails", () => {
    const mockErrorMessage = "Failed to fetch pokemon details";
    
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: mockErrorMessage }
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    expect(screen.getByText(/Error al cargar detalles:/i)).toBeInTheDocument();
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  it("should display pokemon details when data is loaded successfully", () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    // Check pokemon information is rendered
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass, poison/i)).toBeInTheDocument();
    expect(screen.getByText(/Peso:/)).toBeInTheDocument();
    expect(screen.getByText(/6.9 kg/)).toBeInTheDocument();
    expect(screen.getByText(/Habilidades:/i)).toBeInTheDocument();
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();
    
    // Check image
    const image = screen.getByAltText(/Imagen de bulbasaur/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockPokemonDetails.sprites.front_default);
  });

  it("should display placeholder when pokemon has no sprite", () => {
    const mockPokemonWithoutSprite = {
      ...mockPokemonDetails,
      sprites: {
        front_default: null
      }
    };

    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonWithoutSprite,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    expect(screen.getByText("?")).toBeInTheDocument();
    expect(screen.getByText("?")).toHaveClass("image-placeholder");
  });

  it("should call onClose when clicking the close button", () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText(/Cerrar modal/i);
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking the overlay background", () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not close when clicking inside the modal content", () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    const modalContent = screen.getByRole("document");
    fireEvent.click(modalContent);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should call onClose when pressing Escape key", () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    fireEvent.keyDown(window, { key: "Escape" });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should load and show ability details when clicking an ability", async () => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    const abilityDetailsHook = jest.fn((url) => {
      if (!url) return { data: null, isLoading: false, isError: false, error: null };
      
      // Initial loading state
      if (abilityDetailsHook.mock.calls.length === 1) {
        return { data: null, isLoading: true, isError: false, error: null };
      }
      
      // Loaded state for subsequent calls
      return { 
        data: mockAbilityDetails,
        isLoading: false,
        isError: false,
        error: null
      };
    });
    
    (useAbilityDetails as jest.Mock).mockImplementation(abilityDetailsHook);

    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    // Find and click the ability button
    const abilityButton = screen.getByText(/overgrow/i);
    fireEvent.click(abilityButton);
    
    // Verify that the ability details hook was called with the correct URL
    expect(useAbilityDetails).toHaveBeenCalledWith(mockPokemonDetails.abilities[0].ability.url);
    
    // Simulate the update of the hook with ability data
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: mockAbilityDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    // Re-render with the updated hook data
    render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    // Check that the ability button has the active class
    const updatedButton = screen.getAllByRole("button", { name: /overgrow/i });
    const activeButton = updatedButton.find((button) => button.classList.contains("active"));
    expect(activeButton).toBeInTheDocument();
  });

  it("should reset ability selection when pokemonUrl changes", () => {
    // First render with one Pokemon
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      error: null
    });
    
    (useAbilityDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null
    });

    const { rerender } = render(<ItemDetailModal pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
    
    // Click an ability to select it
    const abilityButton = screen.getByText(/overgrow/i);
    fireEvent.click(abilityButton);
    
    // Verify the ability URL was passed to the hook
    expect(useAbilityDetails).toHaveBeenCalledWith(mockPokemonDetails.abilities[0].ability.url);
    
    // Now rerender with a different Pokemon URL
    const newPokemonUrl = "https://pokeapi.co/api/v2/pokemon/4/";
    rerender(<ItemDetailModal pokemonUrl={newPokemonUrl} onClose={mockOnClose} />);
    
    // Verify that the ability URL was reset to null
    expect(useAbilityDetails).toHaveBeenCalledWith(null);
  });
});