import axios from "axios";
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "../../context/Auth";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || null);

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
