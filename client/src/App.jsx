import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";

function App() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <>
      <Navbar cartCount={0} onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/new" element={<CreateProduct />} />
        
      </Routes>
    </>
  );
}

export default App;
