"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    // Only access localStorage in client-side environment
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem("isAdminAuthenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (password: string): boolean => {
    // Check if password matches the admin password
    if (password === "admin") {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem("isAdminAuthenticated", "true");
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("isAdminAuthenticated");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};