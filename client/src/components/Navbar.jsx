
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Navbar.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
];

const Navbar = ({
  cartCount = 0,
  onSearch,
  accountHref = "/login",
  cartHref = "/cart",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query && onSearch) {
      onSearch(query);
    }
  };

  const closeMobileMenu = () => {
    const navbarContent = document.getElementById("storeNavbar");

    if (navbarContent && window.bootstrap?.Collapse) {
      window.bootstrap.Collapse
        .getInstance(navbarContent)
        ?.hide();
    }
  };

  const renderSearchForm = (mobile = false) => (
    <form
      className={`d-flex ${mobile ? "w-100" : "navbar-search"}`}
      role="search"
      onSubmit={handleSearch}
    >
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search products..."
          aria-label="Search products"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <button
          className="btn btn-dark"
          type="submit"
          aria-label="Submit search"
        >
          <i className="bi bi-search" aria-hidden="true" />
        </button>
      </div>
    </form>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top store-navbar">
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          to="/"
          onClick={closeMobileMenu}
        >
          <span className="brand-icon">
            <i className="bi bi-bag-heart-fill" aria-hidden="true" />
          </span>

          <span>Shopora</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#storeNavbar"
          aria-controls="storeNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible navigation */}
        <div className="collapse navbar-collapse" id="storeNavbar">
          <ul className="navbar-nav mx-lg-auto my-3 my-lg-0 gap-lg-2">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.label}>
                <Link
                  className="nav-link px-lg-3"
                  to={link.href}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop search */}
          <div className="d-none d-lg-block">
            {renderSearchForm()}
          </div>

          {/* Account and cart */}
          <div className="d-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0">
            <Link
              to={accountHref}
              className="store-action"
              aria-label="Account or login"
              title="Account"
              onClick={closeMobileMenu}
            >
              <i className="bi bi-person" aria-hidden="true" />
              <span className="d-lg-none ms-2">Account / Login</span>
            </Link>

            <Link
              to={cartHref}
              className="store-action cart-action"
              aria-label={`Shopping cart with ${cartCount} items`}
              title="Shopping cart"
              onClick={closeMobileMenu}
            >
              <i className="bi bi-bag" aria-hidden="true" />

              <span className="cart-count">
                {cartCount}
              </span>

              <span className="d-lg-none ms-2">Shopping Cart</span>
            </Link>
          </div>

          {/* Mobile search */}
          <div className="d-lg-none mt-3 mb-3">
            {renderSearchForm(true)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
