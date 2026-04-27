import { createContext, useContext, useEffect, useState } from "react";
import { authApi, setToken, getToken } from "@/integrations/api/client";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier le token au chargement
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await authApi.verifyToken();
          setUser(response.user);
          setIsAdmin(response.user?.isAdmin || false);
        } catch (error) {
          console.error('Token verification failed:', error);
          setToken(null);
          setUser(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signUp = async (email, password, fullName, phone) => {
    try {
      const response = await authApi.signup(email, password, fullName, phone);
      if (response && response.token) {
        setToken(response.token);
        setUser(response.user);
        setIsAdmin(response.user?.isAdmin || false);
      }
      return response;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await authApi.signin(email, password);
      if (response && response.token) {
        setToken(response.token);
        setUser(response.user);
        setIsAdmin(response.user?.isAdmin || false);
      }
      return response;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const adminSignIn = async (email, password) => {
    try {
      const response = await authApi.adminSignin(email, password);
      if (response && response.token) {
        setToken(response.token);
        setUser(response.user);
        setIsAdmin(response.user?.isAdmin || false);
      }
      return response;
    } catch (error) {
      console.error('Admin sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  const value = { 
    user, 
    isAdmin, 
    loading, 
    signUp, 
    signIn, 
    adminSignIn, 
    signOut 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
