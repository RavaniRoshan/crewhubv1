import { useSession, signIn, signOut } from 'next-auth/react';
import type { AppSession } from '@/lib/types';

export function useAuth() {
  const { data, status } = useSession();
  return {
    user: (data as AppSession | undefined)?.user,
    session: data as AppSession | undefined,
    status,
    signIn,
    signOut,
  };
}

export { useSession, signIn, signOut }; 