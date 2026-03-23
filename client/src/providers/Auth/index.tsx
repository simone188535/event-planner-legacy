import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import type { FC } from "react";

const AuthProvider: FC = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Function to set the authentication token
  // const assignSetToken = (newToken: string) => {
  //   setToken(newToken);
  // };

  const contextValue = { token, setToken };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
