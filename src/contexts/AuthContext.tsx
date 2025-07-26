"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type User = {
  email: string;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signup: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  validarSessao: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

type Conta = {
  email: string;
  password: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [contasLocalStorage, setContasLocalStorage] = useLocalStorage(
    "contas",
    [] as Conta[],
  );
  const [acessToken, setAccessToken] = useLocalStorage(
    "accessToken",
    null as string | null,
  );

  const router = useRouter();

  const logout = useCallback(() => {
    setAccessToken(null);
    setIsUserAuthenticated(false);
    setUser(null);
  }, [setAccessToken]);

  const validarSessao = useCallback(async () => {
    if (!acessToken) {
      return false;
    }

    const resp = await fetch("/api/auth/verify-token", {
      body: JSON.stringify({ token: acessToken }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.ok && resp.status === 200) {
      return true;
    }

    logout();

    return false;
  }, [acessToken, logout]);

  const login: AuthContextType["login"] = async (email, password) => {
    try {
      const usuarioComMesmoEmail = contasLocalStorage.find(
        (conta) => conta.email === email,
      );

      if (!usuarioComMesmoEmail) {
        return false;
      }

      const hashedPassword = (
        await (
          await fetch("/api/auth/verify-hash", {
            body: JSON.stringify({
              content: password,
              hashedContent: usuarioComMesmoEmail.password,
            }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()
      ).isValid;

      const at = (
        await (
          await fetch("/api/auth/generate-token", {
            body: JSON.stringify({ sub: email }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()
      ).accessToken;

      setAccessToken(at);

      setContasLocalStorage((prev) => [
        ...structuredClone(prev),
        { email, password: hashedPassword },
      ]);

      setIsUserAuthenticated(true);

      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  };

  useEffect(() => {
    validarSessao().then((validarSessaoResp) => {
      if (!validarSessaoResp) {
        router.push("/acesso/login");
      }
    });
  }, [validarSessao, router]);

  const signup: AuthContextType["signup"] = async (email, password) => {
    try {
      const usuarioComMesmoEmail = contasLocalStorage.some(
        (conta) => conta.email === email,
      );

      if (usuarioComMesmoEmail) {
        return false;
      }

      const hashedPassword = (
        await (
          await fetch("/api/auth/hash-password", {
            body: JSON.stringify({ password }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()
      ).hashedPassword;

      const at = (
        await (
          await fetch("/api/auth/generate-token", {
            body: JSON.stringify({ sub: email }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()
      ).accessToken;

      setAccessToken(at);

      setContasLocalStorage((prev) => [
        ...structuredClone(prev),
        { email, password: hashedPassword },
      ]);

      setIsUserAuthenticated(true);

      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  };

  const value: AuthContextType = {
    isAuthenticated: isUserAuthenticated,
    user,
    validarSessao,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
