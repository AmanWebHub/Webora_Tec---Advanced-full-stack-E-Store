
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  return (
    <>
      <section className="bg-light py-5">
        <div className="container py-lg-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="text-uppercase text-secondary small fw-semibold">
                Welcome to Shopora
              </span>

              <h1 className="display-5 fw-bold mt-2">
                Find something you'll love.
              </h1>

              <p className="lead text-secondary mt-3">
                Explore our collection and discover your next favourite item.
              </p>

              <Link to="/shop" className="btn btn-dark btn-lg mt-2">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Our Products</h2>
            <p className="text-secondary mb-0">
              Explore our latest collection.
            </p>
          </div>

          <Link to="/shop" className="btn btn-outline-dark">
            View All
          </Link>
        </div>

        <ProductGrid />
      </section>
    </>
  );
};

export default Home;
