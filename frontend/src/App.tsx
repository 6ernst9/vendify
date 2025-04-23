import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import useInjectTheme from './redux/hooks/useInjectTheme';

function App() {
    useInjectTheme();

    return (
        <Router>
            <AppRoutes/>
        </Router>
    )
}

export default App;
