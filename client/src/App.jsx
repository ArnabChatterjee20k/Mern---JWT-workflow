import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from "./Pages/Dashboard";

import Navbar from "./Pages/Navbar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <hr />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} />
            </BrowserRouter>
        </div>
    )
}

export default App