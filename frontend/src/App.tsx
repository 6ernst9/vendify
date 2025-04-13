import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeWidget from "./widgets/home-widget/HomeWidget";
import ProductWidget from "./widgets/product-widget/ProductWidget";
import CartWidget from "./widgets/cart-widget/CartWidget";
import WishlistWidget from "./widgets/wishlist-widget/WishlistWidget";
import ContactWidget from "./widgets/contact-us-widget/ContactWidget";
import NotFoundWidget from "./widgets/not-found-widget/NotFoundWidget";
import AdminHomeWidget from "./widgets/admin-home-widget/AdminHomeWidget";
import AdminOrdersWidget from "./widgets/admin-orders-widget/AdminOrdersWidget";
import AdminStoreWidget from "./widgets/admin-store-widget/AdminStoreWidget";
import AdminStoreCreateWidget from "./widgets/admin-store-create-widget/AdminStoreCreateWidget";

function App() {
  return (
      <Router>
        <Routes>
          <Route index Component={HomeWidget} />
          <Route path="/home" Component={HomeWidget} />
          <Route path="/admin" Component={AdminHomeWidget} />
          <Route path="/admin/dashboard" Component={AdminHomeWidget} />
          <Route path="/admin/company" Component={AdminStoreWidget} />
          <Route path="/admin/company/create" Component={AdminStoreCreateWidget} />
          <Route path="/admin/orders" Component={AdminOrdersWidget} />
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
