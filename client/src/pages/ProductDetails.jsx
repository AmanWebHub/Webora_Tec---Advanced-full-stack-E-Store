import { Link, useParams } from "react-router-dom";
import useProductDetail from "../hooks/useProductDetail";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProductDetailsView from "../components/ProductDetailsView";
import RelatedProducts from "../components/RelatedProducts";
import "../Assets/Home.css"; 
import "../Assets/ProductDetails.css";

const messages = {
  loading: "Loading product\u2026",
  error: "We couldn\u2019t load this product. Refresh the page to try again.",
  ready: "We couldn\u2019t find that product. It may have been removed.",
};

const ProductDetails = () => {
  const { id } = useParams();
  const { product, related, status } = useProductDetail(id);

  useDocumentTitle(product?.name);  

  return ( 
    <main className="home">
      <div className="container pdp">
        <Link to="/shop" className="home-link pdp-back">
          Back to shop
        </Link>

        {product ? (
          <>
            <ProductDetailsView product={product} />
            <RelatedProducts items={related} />
          </>
        ) : (
          <p className="home-note" role="status">
            {messages[status]}
          </p>
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
