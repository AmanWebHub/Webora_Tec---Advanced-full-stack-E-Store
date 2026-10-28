import { Link } from "react-router-dom";

const ClosingCta = () => (
  <section className="home-closing">
    <div className="container">
      <h2>Ready to start browsing?</h2>
      <Link to="/shop" className="btn home-btn-primary">
        Explore products
      </Link>
    </div>
  </section>
);

export default ClosingCta;
