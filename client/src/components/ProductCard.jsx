import { Link } from "react-router-dom";
import { formatPrice } from "../hooks/useHomeProducts";
import ProductImage from "./ProductImage";
import "../Assets/ProductCard.css";

// Shop page card: same design as the home card, plus a button to the details page.
const ProductCard = ({ product }) => {
  const { _id, name, description, price } = product;

  return (
    <div className="pcard pcard-shop">
      <Link
        to={`/products/${_id}`}
        className="pcard-imglink"
        aria-label={`View ${name}`}
      >
        <ProductImage product={product} className="pcard-img" />
      </Link>

      <div className="pcard-body">
        <span className="pcard-name">{name}</span>
        <span className="pcard-desc">{description}</span>
        <strong className="pcard-price">{formatPrice(price)}</strong>

        <Link to={`/products/${_id}`} className="pcard-action">
          View details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
