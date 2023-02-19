import React from "react";

let AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  let [loggedIn, setLoggedIn] = React.useState(false);

  let login = (data, cb) => {
    localStorage.setItem("token", data.token);
    setLoggedIn(true);
    cb();
  };

  let logout = (cb) => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    cb();
  };

  let value = { loggedIn, setLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
