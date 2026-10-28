import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EditProduct from "./pages/EditProduct.jsx";

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
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
      </Routes>
    </>
  );
}

export default App;
