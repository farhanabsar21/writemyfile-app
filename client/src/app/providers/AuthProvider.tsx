import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { authStorage } from "../../services/auth-storage";
import type { User } from "../../features/auth/types/auth.types";
import { getCurrentUser } from "../../features/auth/api/me";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (payload: { user: User; token: string }) => void;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(authStorage.getToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const storedToken = authStorage.getToken();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setToken(storedToken);
      } catch {
        authStorage.clearToken();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrapAuth();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      setAuth: ({ user, token }: { user: User; token: string }) => {
        authStorage.setToken(token);
        setUser(user);
        setToken(token);
      },
      logout: () => {
        authStorage.clearToken();
        setUser(null);
        setToken(null);
      },
    }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
