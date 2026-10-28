import { Link } from "react-router-dom";
import useHomeProducts, { formatPrice } from "../hooks/Usehomeproducts"
import "../Assets/Home.css";

const promises = [
  { title: "Delivery island-wide", text: "Tracked from the moment we pack it." },
  { title: "30-day returns", text: "Not right? Send it back, no questions." },
  { title: "Secure checkout", text: "Your payment details stay protected." },
];

const ProductImage = ({ product, className }) => (
  <img
    src={product.image}
    alt={product.name}
    className={className}
    loading="lazy"
    onError={(e) => {
      e.currentTarget.style.visibility = "hidden";
    }}
  />
);

const Home = () => {
  const { status, hasProducts, heroItems, featured } = useHomeProducts();

  return (
    <main className="home">
      {/* Hero */}
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="home-title">Find something you&rsquo;ll love.</h1>
              <p className="home-lead">
                Everyday things, chosen with care. Browse the Shopora
                collection and find your next favourite.
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
              {heroItems.length > 0 ? (
                <div className="home-stack">
                  {heroItems.map((item, i) => (
                    <Link
                      to="/shop"
                      key={item._id}
                      className={`home-stack-card home-stack-card-${i + 1}`}
                    >
                      <ProductImage product={item} className="home-stack-img" />
                      <span className="home-stack-info">
                        <span className="home-ellipsis">{item.name}</span>
                        <strong>{formatPrice(item.price)}</strong>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="home-stack-empty" role="status">
                  {status === "loading" && "Loading products\u2026"}
                  {status === "error" && "We couldn\u2019t load products right now."}
                  {status === "ready" && "New products are on the way."}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="home-section" id="new-arrivals">
        <div className="container">
          <div className="home-section-head">
            <h2>New arrivals</h2>
            <Link to="/shop" className="home-link">
              View all
            </Link>
          </div>

          {status === "loading" && !hasProducts && (
            <div className="row g-4" aria-hidden="true">
              {[0, 1, 2, 3].map((n) => (
                <div className="col-6 col-lg-3" key={n}>
                  <div className="home-card home-skeleton" />
                </div>
              ))}
            </div>
          )}

          {status === "error" && !hasProducts && (
            <p className="home-note">
              Something went wrong while loading products. Refresh the page to
              try again.
            </p>
          )}

          {status === "ready" && !hasProducts && (
            <p className="home-note">
              No products yet. Check back soon.
            </p>
          )}

          {featured.length > 0 && (
            <div className="row g-4">
              {featured.map((item) => (
                <div className="col-6 col-lg-3" key={item._id}>
                  <Link to="/shop" className="home-card">
                    <ProductImage product={item} className="home-card-img" />
                    <div className="home-card-body">
                      <span className="home-card-name">{item.name}</span>
                      <span className="home-card-desc">{item.description}</span>
                      <strong className="home-card-price">
                        {formatPrice(item.price)}
                      </strong>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promises */}
      <section className="home-promises">
        <div className="container">
          <div className="row g-4">
            {promises.map((p) => (
              <div className="col-md-4" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="home-closing">
        <div className="container">
          <h2>Ready to start browsing?</h2>
          <Link to="/shop" className="btn home-btn-primary">
            Explore products
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;