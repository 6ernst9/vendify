import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeWidget from "./widgets/home-widget/HomeWidget";
import ProductWidget from "./widgets/product-widget/ProductWidget";
import CartWidget from "./widgets/cart-widget/CartWidget";
import WishlistWidget from "./widgets/wishlist-widget/WishlistWidget";
import ContactWidget from "./widgets/contact-us-widget/ContactWidget";
import NotFoundWidget from "./widgets/not-found-widget/NotFoundWidget";

function App() {
  return (
      <Router>
        <Routes>
          <Route index Component={HomeWidget} />
          <Route path="/home" Component={HomeWidget} />
          <Route path="/product" Component={ProductWidget} />
          <Route path="/cart" Component={CartWidget} />
          <Route path="/wishlist" Component={WishlistWidget} />
          <Route path="/contact" Component={ContactWidget} />
          <Route path="/*" Component={NotFoundWidget} />
        </Routes>
      </Router>
  )
}

export default App;
