import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import useInjectTheme from './redux/hooks/useInjectTheme';
import useStoreFromPath from "./redux/hooks/useStoreFromPath";

function App() {
    useStoreFromPath();
    useInjectTheme();

    return (
        <Router>
            <AppRoutes/>
        </Router>
    )
}

export default App;
