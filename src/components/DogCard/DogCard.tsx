import React from "react";
import { IDogBreed } from "../../types/dataTypes";
import { useAppContext, useDogImage } from "../../hooks";
import "./DogCard.css";

interface DogCardProps {
  dogBreedInfo: IDogBreed;
}

const DogCard: React.FC<DogCardProps> = ({ dogBreedInfo }) => {
  const { openDogModal } = useAppContext();
  const { data: imageUrl, isLoading: isImageLoading, isError: isImageError } = useDogImage(dogBreedInfo.name);

  const handleClick = () => {
    openDogModal(dogBreedInfo.name);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className="dog-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalles de ${dogBreedInfo.name}`}
    >
      <div className="dog-card-image-container">
        {isImageLoading && <div className="spinner large"></div>}
        {isImageError && (
          <div className="error-text">Error cargando imagen</div>
        )}
        {imageUrl && !isImageLoading && (
          <img
            src={imageUrl}
            alt={`${dogBreedInfo.name} dog`}
            className="dog-card-image"
            loading="lazy"
          />
        )}
        {!imageUrl && !isImageLoading && !isImageError && (
          <div className="image-placeholder">🐕</div>
        )}
      </div>
      <div className="dog-card-content">
        <h3 className="dog-card-title">{dogBreedInfo.name}</h3>
        {dogBreedInfo.subBreeds.length > 0 && (
          <p className="dog-card-subbreeds">
            {dogBreedInfo.subBreeds.length} sub-razas
          </p>
        )}
      </div>
    </button>
  );
};

export default DogCard;