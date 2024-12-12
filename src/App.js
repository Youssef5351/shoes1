import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Components/CartContext/CartContext';
import { WishlistProvider } from './Components/Whishlistcontext/Whishlistcontext';
import ProductDetail from './Components/ProductsDetails/ProductDetails';
import SideCart from './Components/Cart/Cart';
import CartPage from './Components/CartPage/CartPage';
import Home from './Components/Home/Home';
import Wishlist from './Components/Wishlist/Wishlist';
import Curve from './Components/Curve/Curve';
function App() {
  
  return (
    <CartProvider>
      <WishlistProvider> 
        <Router>
          <SideCart />
          <div className="main-content">
          <Curve backgroundColor="#24A5A8" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
