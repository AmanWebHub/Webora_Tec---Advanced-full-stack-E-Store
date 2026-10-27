
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/productStore";
import "../Assets/CreateProduct.css";

function CreateProduct() {
  const navigate = useNavigate();
  const createProduct = useProductStore((state) => state.createProduct);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    const product = {
      ...formData,
      price: Number(formData.price),
    };

    setLoading(true);

    try {
      const result = await createProduct(product);

      if (result?.success === false) {
        throw new Error(result.message || "Failed to create product.");
      }

      navigate("/shop");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5 create-product-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="create-product-form">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
              <h1 className="mb-0">Create Product</h1>

              <Link
                to="/shop"
                className="btn create-product-cancel"
              >
                Cancel
              </Link>
            </div>

            <p className="text-secondary mb-4">
              Add a new product to your Shopora store.
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
                  placeholder="Enter product name"
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
                  placeholder="Enter price"
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
                  placeholder="Describe the product"
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
                  placeholder="https://example.com/product.jpg"
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
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    />
                    Creating Product...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-lg me-2" />
                    Create Product
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

export default CreateProduct;
