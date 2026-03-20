import { createContext, useContext } from "react";

interface AuthContextInterface {
    token: string | null;
    assignSetToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<AuthContextInterface>({
    token: null,
    assignSetToken: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
