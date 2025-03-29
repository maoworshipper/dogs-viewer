import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AbilityDetail from "./AbilityDetail";
import { IAbilityDetails } from "../../types/dataTypes";

describe("AbilityDetail", () => {
  // Mock data for testing
  const mockAbilityDetails: IAbilityDetails = {
    id: 1,
    name: "overgrow",
    effect_entries: [
      {
        effect:
          "When HP is below 1/3, power of grass moves is increased by 50%.",
        language: {
          name: "en",
          url: "https://pokeapi.co/api/v2/language/9/",
        },
        short_effect: "Strengthens grass moves when HP is low.",
      },
    ],
  };

  test("renders loading state correctly", () => {
    render(<AbilityDetail details={null} isLoading={true} error={null} />);

    expect(screen.getByText("Cargando efecto...")).toBeInTheDocument();
  });

  test("renders error state correctly", () => {
    const errorMessage = "Failed to fetch";
    render(
      <AbilityDetail details={null} isLoading={false} error={errorMessage} />
    );

    expect(
      screen.getByText(
        `Error cargando la información del efecto: ${errorMessage}`
      )
    ).toBeInTheDocument();
  });

  test("renders nothing when details is null and not loading", () => {
    const { container } = render(
      <AbilityDetail details={null} isLoading={false} error={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders ability details correctly with English effect entry", () => {
    render(
      <AbilityDetail
        details={mockAbilityDetails}
        isLoading={false}
        error={null}
      />
    );

    expect(
      screen.getByText(`Efecto de ${mockAbilityDetails.name}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockAbilityDetails.effect_entries[0].effect)
    ).toBeInTheDocument();
  });

  test("renders fallback message when no effect entry is found", () => {
    const detailsWithoutEffect = {
      ...mockAbilityDetails,
      effect_entries: [],
    };

    render(
      <AbilityDetail
        details={detailsWithoutEffect}
        isLoading={false}
        error={null}
      />
    );

    expect(
      screen.getByText(`Efecto de ${detailsWithoutEffect.name}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText("No se encontró descripción del efecto.")
    ).toBeInTheDocument();
  });

  test("uses first available effect entry when English is not available", () => {
    const detailsWithNonEnglishEffect = {
      ...mockAbilityDetails,
      effect_entries: [
        {
          effect:
            "Cuando el HP está por debajo de 1/3, el poder de los movimientos de tipo planta aumenta un 50%.",
          language: {
            name: "es",
            url: "https://pokeapi.co/api/v2/language/7/",
          },
          short_effect:
            "Fortalece movimientos de tipo planta cuando el HP es bajo.",
        },
      ],
    };

    render(
      <AbilityDetail
        details={detailsWithNonEnglishEffect}
        isLoading={false}
        error={null}
      />
    );

    expect(
      screen.getByText(`Efecto de ${detailsWithNonEnglishEffect.name}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(detailsWithNonEnglishEffect.effect_entries[0].effect)
    ).toBeInTheDocument();
  });
});
