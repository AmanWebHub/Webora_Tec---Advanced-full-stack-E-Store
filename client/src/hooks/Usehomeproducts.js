import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "../stores/productStore";

const CURRENCY = "Rs.";

export const formatPrice = (n) => `${CURRENCY} ${Number(n).toLocaleString("en-US")}`;

const useHomeProducts = () => {
  const products = useProductStore((s) => s.products);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let active = true;
    fetchProducts().then((res) => {
      if (active) setStatus(res.success ? "ready" : "error");
    });
    return () => {
      active = false;
    };
  }, [fetchProducts]);

  const newest = useMemo(
    () =>
      [...products].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      ),
    [products]
  );

  return {
    status,
    hasProducts: products.length > 0,
    heroItems: newest.slice(0, 3),
    featured: newest.slice(0, 8),
  };
};

export default useHomeProducts;
