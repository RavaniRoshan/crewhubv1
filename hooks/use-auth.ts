import { useSession, signIn, signOut } from 'next-auth/react';
import type { AppSession } from '@/lib/types';

export function useAuth() {
  const session = useSession();
  return {
    user: session.data?.user,
    session: session.data,
    status: session.status,
    signIn,
    signOut,
  };
}

export { useSession, signIn, signOut }; 