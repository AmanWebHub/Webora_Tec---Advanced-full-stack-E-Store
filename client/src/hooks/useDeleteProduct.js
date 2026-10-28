import { useState } from "react";
import { useProductStore } from "../stores/productStore";

export function useDeleteProduct() {
  const deleteProduct = useProductStore(
    (state) => state.deleteProduct
  );

  const [productToDelete, setProductToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = (product) => {
    setDeleteError("");
    setProductToDelete(product);
  };

  const cancelDelete = () => {
    if (deletingId !== null) return;

    setProductToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!productToDelete || deletingId !== null) return;

    const product = productToDelete;

    setDeletingId(product._id);
    setDeleteError("");

    try {
      const result = await deleteProduct(product._id);

      if (!result?.success) {
        setDeleteError(
          result?.message || "Failed to delete product."
        );
        return;
      }

      setProductToDelete(null);
    } catch (err) {
      setDeleteError(
        "Something went wrong while deleting the product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return {
    productToDelete,
    deletingId,
    deleteError,
    handleDelete,
    cancelDelete,
    confirmDelete,
  };
}
