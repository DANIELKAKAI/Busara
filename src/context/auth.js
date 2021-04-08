import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [authToken, setAuthToken] = useState();

  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
