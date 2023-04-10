import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../types/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../../hooks/useSessionStorage";

type AuthContextValue = {
  user: UserType | null;
  logIn: (name: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = (): AuthContextValue => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useSessionStorage("user", null);

  function logIn(name: string) {
    setUser({ name });
    return <Navigate to="/" replace />;
  }

  function logOut() {
    setUser(null);
    return <Navigate to="/login" />;
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
