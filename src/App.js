import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import PlatformGames from "./pages/Platforms";
import AllGames from "./pages/allGames";
import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<ProductDetail />} />
        <Route path="/games/:genre" element={<ProductList />} />
        <Route path="/games/platform/:platform" element={<PlatformGames />} />
        <Route path="/games/all" element={<AllGames />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
