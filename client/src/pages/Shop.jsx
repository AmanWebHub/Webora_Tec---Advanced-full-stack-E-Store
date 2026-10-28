import React from 'react'
import ProductGrid from "../components/ProductGrid";
import { Link } from "react-router-dom";

function Shop() {
  return (
   
    
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
  )
}

export default Shop
