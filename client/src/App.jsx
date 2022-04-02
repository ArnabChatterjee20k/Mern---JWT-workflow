import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Register from './Pages/Register';
import Login from './Pages/Login';

import Navbar from "./Pages/Navbar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <hr />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </BrowserRouter>
        </div>
    )
}

export default App