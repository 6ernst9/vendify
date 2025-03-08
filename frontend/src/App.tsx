import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeWidget from "./widgets/home-widget/HomeWidget";
import ProductWidget from "./widgets/product-widget/ProductWidget";

function App() {
  return (
      <Router>
        <Routes>
          <Route index Component={HomeWidget} />
          <Route path="/home" Component={HomeWidget} />
          <Route path="/product" Component={ProductWidget} />
        </Routes>
      </Router>
  )
}

export default App;
