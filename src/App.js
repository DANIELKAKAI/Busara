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
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
            <li>
              <Link to="/form">Forms Page</Link>
            </li>
          </ul>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/form" component={Form}/>
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
