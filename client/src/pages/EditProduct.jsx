
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../stores/productStore";
import "../Assets/CreateProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        let product = useProductStore
          .getState()
          .products.find((item) => item._id === id);

        if (!product) {
          const result = await fetchProducts();

          if (!result?.success) {
            throw new Error(
              result?.message || "Unable to load products."
            );
          }

          product = useProductStore
            .getState()
            .products.find((item) => item._id === id);
        }

        if (!product) {
          throw new Error("Product not found.");
        }

        if (active) {
          setFormData({
            name: product.name || "",
            price: String(product.price ?? ""),
            description: product.description || "",
            image: product.image || "",
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load product.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [id, fetchProducts]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const result = await updateProduct(id, {
        ...formData,
        price: Number(formData.price),
      });

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to update product."
        );
      }

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="container py-5">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error && !formData.name) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/admin" className="btn btn-outline-secondary">
          Back to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5 create-product-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="create-product-form">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
              <h1 className="mb-0">Edit Product</h1>

              <Link to="/admin" className="btn create-product-cancel">
                Cancel
              </Link>
            </div>

            <p className="text-secondary mb-4">
              Update the product information in your store.
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price (LKR)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="form-control"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
                <div className="form-text">
                  Enter a publicly accessible image URL.
                </div>
              </div>

              <button
                type="submit"
                className="btn w-100 create-product-submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-2" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditProduct;
