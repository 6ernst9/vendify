import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import StoreInitializer from "./components/StoreInitializer/StoreInitializer";

function App() {
    return (
        <Router>
            <StoreInitializer/>
            <AppRoutes/>
        </Router>
    )
}

export default App;
