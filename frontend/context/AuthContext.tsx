import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { getToken, removeToken } from "@/utils/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Vérifie si le token existe au montage
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};