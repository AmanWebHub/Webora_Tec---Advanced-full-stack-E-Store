import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Register from "./pages/Register.jsx";

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
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
