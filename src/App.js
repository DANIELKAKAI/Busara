import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Form from "./pages/Form";
import Logout from "./pages/Login";

function App(props) {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand nav-link" href="/">BUSARA</a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/form">
                    Form
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Log In
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/form" component={Form} />
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
