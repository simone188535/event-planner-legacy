import { createContext, useContext } from "react";

interface AuthContextInterface {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<AuthContextInterface>({
    token: null,
    setToken: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
