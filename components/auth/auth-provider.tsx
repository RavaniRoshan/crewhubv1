"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
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