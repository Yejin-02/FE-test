import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  expiresIn: string | null;
  setExpiresIn: (expiresIn: string | null) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setTokenState(newToken);
  };

  const [expiresIn, setExpiresInState] = useState<string | null>(() =>
    localStorage.getItem("expiresIn"),
  );

  const setExpiresIn = (newExpiresIn: string | null) => {
    if (newExpiresIn) {
      localStorage.setItem("expiresIn", newExpiresIn);
    } else {
      localStorage.removeItem("expiresIn");
    }
    setExpiresInState(newExpiresIn);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("refreshToken");
  };

  const value = {
    token,
    setToken,
    expiresIn,
    setExpiresIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
