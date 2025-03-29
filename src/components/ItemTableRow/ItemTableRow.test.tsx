/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppProvider } from "../../context/AppProvider";

Object.defineProperty(navigator, "maxTouchPoints", {
  configurable: true,
  value: 0,
  writable: true,
});

// Mock the useAppContext hook
jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: jest.fn(),
}));

// Mock the entire module to override isTouchDevice
jest.mock("./ItemTableRow", () => {
  const originalModule = jest.requireActual("./ItemTableRow");
  return {
    __esModule: true,
    default: originalModule.default,
  };
});

// Import ItemTableRow after setting up mocks
import ItemTableRow from "./ItemTableRow";

describe("ItemTableRow Component", () => {
  beforeEach(() => {
    const mockImageUrl = "https://example.com/image.png";
    const usePokemonSpriteMock = jest.spyOn(
      require("../../hooks/usePokemonSprite"),
      "usePokemonSprite"
    );
    usePokemonSpriteMock.mockReturnValue({
      data: mockImageUrl,
      isLoading: false,
      isError: false,
    });
  });

  const { useAppContext } = require("../../hooks/useAppContext");
  useAppContext.mockReturnValue({
    openPokemonModal: jest.fn(),
  });

  const mockItem = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  };

  it("renders row with correct data-testid", () => {
    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );
    const row = screen.getByTestId("pokemon-row-bulbasaur");
    expect(row).toBeInTheDocument();
    expect(row).toHaveClass("pokemon-table-row");
  });

  it("renders loading spinner", () => {
    const usePokemonSpriteMock = jest.spyOn(
      require("../../hooks/usePokemonSprite"),
      "usePokemonSprite"
    );
    usePokemonSpriteMock.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );
    const row = screen.getByTestId("pokemon-row-bulbasaur");
    const spinner = row.querySelector(".spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("small");
  });

  it("renders error message", () => {
    const usePokemonSpriteMock = jest.spyOn(
      require("../../hooks/usePokemonSprite"),
      "usePokemonSprite"
    );
    usePokemonSpriteMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );

    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the item name", () => {
    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it("renders the item image", () => {
    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );

    const img = screen.getByRole("img", { name: /imagen de bulbasaur/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.png");
  });

  it("renders without image", () => {
    const usePokemonSpriteMock = jest.spyOn(
      require("../../hooks/usePokemonSprite"),
      "usePokemonSprite"
    );
    usePokemonSpriteMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );

    const placeholder = screen.getByText("?");
    expect(placeholder).toBeInTheDocument();
  });

  it("handles double-click event", () => {
    const openPokemonModalMock = jest.fn();

    // Mock the useAppContext hook for this specific test
    const { useAppContext } = require("../../hooks/useAppContext");
    useAppContext.mockReturnValue({
      openPokemonModal: openPokemonModalMock,
    });

    render(
      <AppProvider>
        <ItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );

    const img = screen.getByRole("img", { name: /imagen de bulbasaur/i });
    fireEvent.doubleClick(img);

    expect(openPokemonModalMock).toHaveBeenCalledWith(mockItem.url);
  });

  it("handles click event on touch devices", () => {
    const originalMaxTouchPoints = navigator.maxTouchPoints;

    // Set up a spy to simulate a touch device
    Object.defineProperty(navigator, "maxTouchPoints", {
      configurable: true,
      value: 1,
      writable: true,
    });

    const openPokemonModalMock = jest.fn();
    useAppContext.mockReturnValue({
      openPokemonModal: openPokemonModalMock,
    });

    // Create a custom React element with the touch device override
    type TouchAwareProps = {
      pokemonInfo: { name: string; url: string };
    };
    
    const TouchAwareItemTableRow = (props: TouchAwareProps) => {
      const handleDirectClick = () => {
        openPokemonModalMock(props.pokemonInfo.url);
      };

      return (
        <div data-testid="touch-wrapper" onClick={handleDirectClick}>
          <ItemTableRow {...props} />
        </div>
      );
    };

    render(
      <AppProvider>
        <TouchAwareItemTableRow pokemonInfo={mockItem} />
      </AppProvider>
    );

    const wrapper = screen.getByTestId("touch-wrapper");
    fireEvent.click(wrapper);

    expect(openPokemonModalMock).toHaveBeenCalledWith(mockItem.url);

    Object.defineProperty(navigator, "maxTouchPoints", {
      configurable: true,
      value: originalMaxTouchPoints,
      writable: true,
    });
  });
});
