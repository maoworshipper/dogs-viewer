import React, { useEffect } from "react";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import "./ItemDetailModal.css";

interface ItemDetailModalProps {
  pokemonUrl: string;
  onClose: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  pokemonUrl,
  onClose,
}) => {
  const {
    data: pokemonDetails,
    isLoading: isLoadingDetails,
    isError: isDetailsError,
    error: detailsError,
  } = usePokemonDetails(pokemonUrl);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-modal-title"
    >
      <div
        className="modal-content"
        onClick={handleModalContentClick}
        role="document"
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {isLoadingDetails && (
          <div className="modal-loading">
            <div className="spinner large"></div>
            <p>Cargando detalles...</p>
          </div>
        )}

        {isDetailsError && (
          <div className="modal-error">
            <p>Error al cargar detalles:</p>
            <p className="error-message-detail">
              {detailsError?.message || "Error al cargar detalles"}
            </p>
          </div>
        )}

        {pokemonDetails && !isLoadingDetails && !isDetailsError && (
          <>
            <h2 id="pokemon-modal-title" className="modal-title">
              {pokemonDetails.name}
            </h2>
            <div className="modal-body">
              <div className="modal-image-section">
                {pokemonDetails.sprites.front_default === null ? (
                  <div className="image-placeholder">?</div>
                ) : (
                  <img
                    src={pokemonDetails.sprites.front_default}
                    alt={`Imagen de ${pokemonDetails.name}`}
                    className="modal-pokemon-image"
                    width="150"
                    height="150"
                  />
                )}
              </div>
              <div className="modal-details-section">
                <p>
                  <strong>Tipo(s):</strong>{" "}
                  {pokemonDetails.types.map((t) => t.type.name).join(", ")}
                </p>
                <p>
                  <strong>Peso:</strong> {pokemonDetails.weight / 10} kg
                </p>
                <div className="abilities-section">
                  <strong>Habilidades:</strong>
                  <ul className="abilities-list">
                    {pokemonDetails.abilities.map((a) => (
                      <li key={a.ability.name}></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDetailModal;
