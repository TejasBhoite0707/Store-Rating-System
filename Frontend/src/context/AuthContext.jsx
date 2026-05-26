import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
} from "../api/authApi";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchUser =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          setLoading(false);
          return;
        }

        const response =
          await getCurrentUser();

        setUser(
          response.data.data
        );
      } catch (error) {
        localStorage.removeItem(
          "token"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};