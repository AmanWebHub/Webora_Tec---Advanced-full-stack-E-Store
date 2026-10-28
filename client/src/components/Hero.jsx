import { Link } from "react-router-dom";
import HeroStack from "./HeroStack";

const Hero = ({ items, status, hasProducts }) => (
  <section className="home-hero">
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <h1 className="home-title">Find something you&rsquo;ll love.</h1>
          <p className="home-lead">
            Everyday things, chosen with care. Browse the Shopora collection
            and find your next favourite.
          </p>
          <div className="home-actions">
            <Link to="/shop" className="btn home-btn-primary">
              Shop all products
            </Link>
            {hasProducts && (
              <a href="#new-arrivals" className="home-link">
                See what&rsquo;s new
              </a>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <HeroStack items={items} status={status} />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
