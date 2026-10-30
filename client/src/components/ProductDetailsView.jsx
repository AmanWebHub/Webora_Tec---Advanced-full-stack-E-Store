import { formatPrice } from "../hooks/useHomeProducts";
import ProductImage from "./ProductImage";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

const ProductDetailsView = ({ product }) => {
  const added = formatDate(product.createdAt);

  return (
    <article className="pdp-grid">
      <ProductImage product={product} className="pdp-img" />

      <div className="pdp-body">
        <h1 className="pdp-name">{product.name}</h1>
        <p className="pdp-price">{formatPrice(product.price)}</p>
        <p className="pdp-desc">{product.description}</p>
        {added && <p className="pdp-meta">Added on {added}</p>}
      </div>
    </article>
  );
};

export default ProductDetailsView;
