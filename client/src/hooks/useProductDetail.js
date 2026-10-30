import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "../stores/productStore";

const useProductDetail = (id) => {
  const products = useProductStore((s) => s.products);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const [fetchStatus, setFetchStatus] = useState(
    products.length > 0 ? "ready" : "loading"
  ); 

  useEffect(() => {
    if (products.length > 0) return;
    let active = true;
    fetchProducts().then((res) => {
      if (active) setFetchStatus(res.success ? "ready" : "error");
    });
    return () => {
      active = false;
    };
  }, [products.length, fetchProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = useMemo(
    () => products.find((p) => p._id === id) || null,
    [products, id]
  );

  const related = useMemo(
    () =>
      products
        .filter((p) => p._id !== id)
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 4),
    [products, id]
  );

  const status = product ? "ready" : fetchStatus;

  return { product, related, status };
};

export default useProductDetail;
