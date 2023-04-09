import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../types/auth";

type AuthContextValue = {
  user: UserType;
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
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  function logIn(name: string) {
    setUser({ name });
    sessionStorage.setItem("user", JSON.stringify({ name }));
  }

  function logOut() {
    setUser(null);
    sessionStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
