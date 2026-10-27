
import { useEffect, useState } from "react";
import { useProductStore } from "../stores/productStore";
import ProductCard from "./ProductCard";
import "../assets/ProductGrid.css";

const ProductGrid = () => {
  const { products, fetchProducts } = useProductStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        await fetchProducts();
      } catch (err) {
        if (active) {
          setError(
            err.message || "Unable to load products. Please try again."
          );
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

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading products...</span>
        </div>
        <p className="text-secondary mt-3">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-box-seam display-4 text-secondary" />
        <h3 className="mt-3">No products yet</h3>
        <p className="text-secondary">
          Products will appear here when they're available.
        </p>
      </div>
    );
  }

  return (
    <div className="row g-4 product-grid">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
