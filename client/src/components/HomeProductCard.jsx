import { Link } from "react-router-dom";
import { formatPrice } from "../hooks/useHomeProducts";
import ProductImage from "./ProductImage";
import "../Assets/ProductCard.css";

const HomeProductCard = ({ product }) => (
  <Link to={`/products/${product._id}`} className="pcard">
    <ProductImage product={product} className="pcard-img" />
    <div className="pcard-body">
      <span className="pcard-name">{product.name}</span>
      <span className="pcard-desc">{product.description}</span>
      <strong className="pcard-price">{formatPrice(product.price)}</strong>
    </div>
  </Link>
);

export default HomeProductCard;
