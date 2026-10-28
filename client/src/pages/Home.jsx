
import { Link } from "react-router-dom";

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

    </>
  );
};

export default Home;
