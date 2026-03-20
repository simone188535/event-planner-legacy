import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/Auth";
import type { FC } from "react";

const AuthProvider: FC = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Function to set the authentication token
  const assignSetToken = (newToken: string) => {
    setToken(newToken);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      assignSetToken,
    }),
    [token]
  );

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
