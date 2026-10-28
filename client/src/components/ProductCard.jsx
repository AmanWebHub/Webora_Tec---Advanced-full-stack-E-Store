
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, price, description, image } = product;

  return (
    <div className="card product-card h-100">
      <Link
        to={`/products/${_id}`}
        className="product-image-wrapper"
        aria-label={`View ${name}`}
      >
        <img
          src={image}
          className="card-img-top product-image"
          alt={name}
          loading="lazy"
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title product-title">{name}</h5>

        <p className="card-text product-description">
          {description}
        </p>

        <div className="mt-auto">
          <p className="product-price mb-3">
            Rs. {Number(price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <Link
            to={`/products/${_id}`}
            className="btn btn-dark w-100"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
