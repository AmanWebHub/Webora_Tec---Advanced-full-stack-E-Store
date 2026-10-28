
import "../assets/DeleteProductModal.css";

function DeleteProductModal({
  product,
  deleting,
  error,
  onCancel,
  onConfirm,
}) {
  if (!product) return null;

  return (
    <div
      className="delete-modal-overlay"
      onClick={() => {
        if (!deleting) onCancel();
      }}
    >
      <div
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="delete-modal-icon">
          <i className="bi bi-trash3" />
        </div>

        <h2 id="delete-modal-title">Delete product?</h2>

        <p className="delete-modal-message">
          Are you sure you want to delete{" "}
          <strong>{product.name}</strong>?
          This action cannot be undone.
        </p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="delete-modal-actions">
          <button
            type="button"
            className="delete-modal-cancel"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-modal-confirm"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash3" />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
