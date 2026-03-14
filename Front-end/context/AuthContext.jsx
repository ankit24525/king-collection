"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user ONCE when app starts
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userInfo");

      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.log("Auth load error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ LOGIN
  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData); // instantly updates navbar
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLoggedIn: !!user,
      }}
    >
      {/* ✅ Prevent UI render before auth loads */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};