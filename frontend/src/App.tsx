import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeWidget from "./widgets/home-widget/HomeWidget";

function App() {
  return (
      <Router>
        <Routes>
          <Route index Component={HomeWidget} />
          <Route path="/home" Component={HomeWidget} />
        </Routes>
      </Router>
  )
}

export default App;
