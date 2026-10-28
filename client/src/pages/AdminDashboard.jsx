import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/productStore";
import "../assets/AdminDashboard.css";
import DeleteProductModal from "../components/DeleteProductModal";

function AdminDashboard() {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState("");

  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

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
          throw new Error(result.message || "Unable to load products.");
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

  const handleDelete = async (product) => {
    setDeleteError("");
    setProductToDelete(product);
  };

  // Delete only after confirmation
  const confirmDelete = async () => {
    if (!productToDelete) return;

    const product = productToDelete;

    setDeletingId(product._id);
    setDeleteError("");

    try {
      const result = await deleteProduct(product._id);

      if (!result?.success) {
        setDeleteError(result?.message || "Failed to delete product.");
        return;
      }

      setProductToDelete(null);
    } catch (error) {
      setDeleteError("Something went wrong while deleting the product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <span className="admin-brand-icon">
            <i className="bi bi-shop" />
          </span>
          <span>Shopora</span>
        </Link>

        <p className="admin-sidebar-label">MANAGEMENT</p>

        <nav className="admin-sidebar-nav">
          <Link to="/admin/products" className="admin-nav-link active">
            <i className="bi bi-grid-1x2" />
            <span>Dashboard</span>
          </Link>

          <Link to="/shop" className="admin-nav-link">
            <i className="bi bi-bag" />
            <span>View Store</span>
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <span className="admin-status-dot" />
          Admin Panel
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">SHOPORA MANAGEMENT</p>
            <h1>Dashboard</h1>
          </div>

          <Link to="/products/new" className="admin-primary-button">
            <i className="bi bi-plus-lg" />
            Add Product
          </Link>
        </header>

        <section className="admin-welcome">
          <div>
            <h2>Product Management</h2>
            <p>Manage your store inventory from one place.</p>
          </div>
          <i className="bi bi-box-seam admin-welcome-icon" />
        </section>

        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="admin-stat-icon">
              <i className="bi bi-box-seam" />
            </div>

            <div>
              <p>Total Products</p>
              <h3>{loading ? "—" : products.length}</h3>
            </div>
          </article>
        </section>

        <section className="admin-products-section">
          <div className="admin-section-heading">
            <div>
              <h2>All Products</h2>
              <p>Products currently stored in your database.</p>
            </div>

            <span className="admin-product-count">
              {products.length} products
            </span>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {actionError && (
            <div className="alert alert-danger mx-3 mt-3" role="alert">
              {actionError}
            </div>
          )}

          <div className="admin-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="admin-table-message">
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />
                      Loading products...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="3" className="admin-table-message">
                      Products could not be loaded.
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="admin-table-message">
                      <i className="bi bi-inbox admin-empty-icon" />
                      <p>No products found.</p>
                      <span>Add your first product to get started.</span>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="admin-product-info">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="admin-product-image"
                          />

                          <span className="admin-product-name">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      <td className="admin-product-price">
                        LKR{" "}
                        {Number(product.price).toLocaleString("en-LK", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td className="admin-product-description">
                        {product.description}
                      </td>

                      <td>
                        <div className="admin-product-actions">
                          <button
                            type="button"
                            className="admin-action-button admin-edit-button"
                            onClick={() =>
                              navigate(`/products/${product._id}/edit`)
                            }
                            aria-label={`Edit ${product.name}`}
                            title="Edit product"
                          >
                            <i className="bi bi-pencil-square" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="admin-action-button admin-delete-button"
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product._id}
                            aria-label={`Delete ${product.name}`}
                            title="Delete product"
                          >
                            {deletingId === product._id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <i className="bi bi-trash3" />
                            )}
                            <span>
                              {deletingId === product._id
                                ? "Deleting..."
                                : "Delete"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <DeleteProductModal
        product={productToDelete}
        deleting={deletingId === productToDelete?._id}
        error={deleteError}
        onCancel={() => {
          setProductToDelete(null);
          setDeleteError("");
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AdminDashboard;
