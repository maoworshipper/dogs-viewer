import React from "react";
import { IPokemon } from "../../types/dataTypes";
import { useAppContext, usePokemonSprite } from "../../hooks/index";
import "./ItemTableRow.css";

interface ItemTableRowProps {
  pokemonInfo: IPokemon;
}

const isTouchDevice = navigator.maxTouchPoints > 0;

const ItemTableRow: React.FC<ItemTableRowProps> = ({ pokemonInfo }) => {
  const { openPokemonModal } = useAppContext();

  const {
    data: imageUrl,
    isLoading,
    isError,
  } = usePokemonSprite(pokemonInfo.url);

  const handleClick = () => {
    if (isTouchDevice) {
      console.log(`Tap detected on touch device for: ${pokemonInfo.name}`);
      openPokemonModal(pokemonInfo.url);
    }
  };

  const handleDoubleClick = () => {
    openPokemonModal(pokemonInfo.url);
  };

  return (
    <tr
      className="pokemon-table-row"
    >
      <td data-label="Nombre">{pokemonInfo.name}</td>
      <td data-label="Imagen">
        <div className="image-container">
          {isLoading && <div className="spinner small"></div>}
          {isError && <span className="error-text small">Error</span>}
          {!isLoading && !isError && imageUrl && (
            <img
              src={imageUrl}
              alt={`Imagen de ${pokemonInfo.name}`}
              className="pokemon-image"
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
              loading="lazy"
              style={{ touchAction: "manipulation" }}
            />
          )}
          {!isLoading && !isError && !imageUrl && (
            <div className="image-placeholder">?</div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ItemTableRow;
