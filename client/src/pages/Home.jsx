import useHomeProducts from "../hooks/useHomeProducts";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import Promises from "../components/Promises";
import ClosingCta from "../components/ClosingCta";
import "../Assets/Home.css";

const Home = () => {
  const { status, hasProducts, heroItems, featured } = useHomeProducts();

  return (
    <main className="home">
      <Hero items={heroItems} status={status} hasProducts={hasProducts} />
      <NewArrivals items={featured} status={status} hasProducts={hasProducts} />
      <Promises />
      <ClosingCta />
    </main>
  );
};

export default Home;
