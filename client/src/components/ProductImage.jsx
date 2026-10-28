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

export default ProductImage;
