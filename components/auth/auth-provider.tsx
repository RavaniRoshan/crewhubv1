"use client";

import { createContext, useContext, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: (provider: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // This is a mock implementation
  // In the final implementation, we'll use NextAuth.js
  const user: User = null;

  const signIn = async (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // Implementation will be added later with NextAuth
  };

  const signOut = async () => {
    console.log("Sign out");
    // Implementation will be added later with NextAuth
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;