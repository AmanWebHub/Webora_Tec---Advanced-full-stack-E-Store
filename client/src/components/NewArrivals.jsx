import { Link } from "react-router-dom";
import HomeProductCard from "./HomeProductCard";

const NewArrivals = ({ items, status, hasProducts }) => (
  <section className="home-section" id="new-arrivals">
    <div className="container">
      <div className="home-section-head">
        <h2>New arrivals</h2>
        <Link to="/shop" className="home-link">
          View all
        </Link>
      </div>

      {!hasProducts && status === "loading" && (
        <div className="row g-4" aria-hidden="true">
          {[0, 1, 2, 3].map((n) => (
            <div className="col-6 col-lg-3" key={n}>
              <div className="pcard home-skeleton" />
            </div>
          ))}
        </div>
      )}

      {!hasProducts && status === "error" && (
        <p className="home-note">
          Something went wrong while loading products. Refresh the page to try
          again.
        </p>
      )}

      {!hasProducts && status === "ready" && (
        <p className="home-note">No products yet. Check back soon.</p>
      )}

      {items.length > 0 && (
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-6 col-lg-3" key={item._id}>
              <HomeProductCard product={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default NewArrivals;
