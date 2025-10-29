import React, { useEffect } from "react";
import { useDogDetails } from "../../hooks/useDogDetails";
import "./ItemDetailModal.css";

interface ItemDetailModalProps {
  dogBreed: string;
  onClose: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  dogBreed,
  onClose,
}) => {
  const {
    images,
    breedInfo,
    isLoading,
    isError,
    error,
  } = useDogDetails(dogBreed);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {isLoading && (
          <div className="modal-loading">
            <div className="spinner large"></div>
            <p>Cargando detalles...</p>
          </div>
        )}

        {isError && (
          <div className="modal-error">
            <p>Error al cargar detalles:</p>
            <p className="error-message-detail">
              {error?.message || "Error al cargar detalles"}
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <h2 id="dog-modal-title" className="modal-title">
              {dogBreed.charAt(0).toUpperCase() + dogBreed.slice(1)}
            </h2>
            <div className="modal-body">
              <div className="modal-image-section">
                {images && images.message.length > 0 ? (
                  <img
                    src={images.message[0]}
                    alt={`Imagen de ${dogBreed}`}
                    className="modal-dog-image"
                    width="150"
                    height="150"
                  />
                ) : (
                  <div className="image-placeholder">?</div>
                )}
              </div>
              <div className="modal-details-section">
                {breedInfo && (
                  <>
                    <p>
                      <strong>Peso:</strong> {breedInfo.weight?.metric || "No disponible"}
                    </p>
                    <p>
                      <strong>Altura:</strong> {breedInfo.height?.metric || "No disponible"}
                    </p>
                    <p>
                      <strong>Esperanza de vida:</strong> {breedInfo.life_span || "No disponible"}
                    </p>
                    <p>
                      <strong>Temperamento:</strong> {breedInfo.temperament || "No disponible"}
                    </p>
                    {breedInfo.origin && (
                      <p>
                        <strong>Origen:</strong> {breedInfo.origin}
                      </p>
                    )}
                    {breedInfo.bred_for && (
                      <p>
                        <strong>Criado para:</strong> {breedInfo.bred_for}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDetailModal;
