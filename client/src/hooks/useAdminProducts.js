import { useEffect, useState } from "react";
import { useProductStore } from "../stores/productStore";

export function useAdminProducts() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await fetchProducts();

        if (result?.success === false) {
          throw new Error(
            result.message || "Unable to load products."
          );
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load products.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
  };
}
