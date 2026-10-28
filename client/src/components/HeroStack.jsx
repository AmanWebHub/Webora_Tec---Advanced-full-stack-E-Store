import { Link } from "react-router-dom";
import { formatPrice } from "../hooks/useHomeProducts";
import ProductImage from "./ProductImage";

const messages = {
  loading: "Loading products\u2026",
  error: "We couldn\u2019t load products right now.",
  ready: "New products are on the way.",
};

const HeroStack = ({ items, status }) => {
  if (items.length === 0) {
    return (
      <div className="home-stack-empty" role="status">
        {messages[status]}
      </div>
    );
  }

  return (
    <div className="home-stack">
      {items.map((item, i) => (
        <Link
          to={`/products/${item._id}`}
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
  );
};

export default HeroStack;
