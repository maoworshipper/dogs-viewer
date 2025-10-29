import React from "react";
import { IDogBreed } from "../../types/dataTypes";
import { useAppContext, useDogImage } from "../../hooks/index";
import "./ItemTableRow.css";

interface ItemTableRowProps {
  dogBreedInfo: IDogBreed;
}

const ItemTableRow: React.FC<ItemTableRowProps> = ({ dogBreedInfo }) => {
  const { openDogModal } = useAppContext();

  const {
    data: imageUrl,
    isLoading,
    isError,
  } = useDogImage(dogBreedInfo.name);

  const handleClick = () => {
    openDogModal(dogBreedInfo.name);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDogModal(dogBreedInfo.name);
    }
  };

  return (
    <tr
      className="dog-table-row"
      data-testid={`dog-row-${dogBreedInfo.name}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Ver detalles de ${dogBreedInfo.name}`}
      style={{ cursor: "pointer" }}
    >
      <td data-label="Nombre">{dogBreedInfo.name}</td>
      <td data-label="Imagen">
        <div className="image-container">
          {isLoading && <div className="spinner small"></div>}
          {isError && <span className="error-text small">Error</span>}
          {!isLoading && !isError && imageUrl && (
            <img
              src={imageUrl}
              alt={`Imagen de ${dogBreedInfo.name}`}
              className="dog-image"
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
