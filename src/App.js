import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Form from "./pages/Form";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens:authTokens,
        setAuthTokens: setTokens,
      }}
    >
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/form">
                    Form
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/signup">
                    Sign Up
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Log In
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/form" component={Form} />
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
