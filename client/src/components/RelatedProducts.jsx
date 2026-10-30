import HomeProductCard from "./HomeProductCard";

const RelatedProducts = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section className="pdp-related" aria-labelledby="related-title">
      <h2 id="related-title">More to explore</h2>
      <div className="row g-4">
        {items.map((item) => (
          <div className="col-6 col-lg-3" key={item._id}>
            <HomeProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
