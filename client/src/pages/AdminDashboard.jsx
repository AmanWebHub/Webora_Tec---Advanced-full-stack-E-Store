
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/productStore";
import "../assets/AdminDashboard.css";

function AdminDashboard() {
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
          <Link
            to="/admin/products"
            className="admin-nav-link active"
          >
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

          <Link
            to="/products/new"
            className="admin-primary-button"
          >
            <i className="bi bi-plus-lg" />
            Add Product
          </Link> 
        </header>

        <section className="admin-welcome">
          <div>
            <h2>Product Management</h2>
            <p>
              Manage your store inventory from one place.
            </p>
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

          <div className="admin-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Description</th>
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
                        {Number(product.price).toLocaleString(
                          "en-LK",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      <td className="admin-product-description">
                        {product.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
