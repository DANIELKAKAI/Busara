import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const [authToken] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken || localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: {} }} />
        )
      }
    />
  );
}

export default PrivateRoute;
