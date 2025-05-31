import { useQuery as useTanstackQuery } from '@tanstack/react-query';

// This is a basic wrapper, extend as needed
export function useQuery(queryKey: any, queryFn: any, options?: any) {
  return useTanstackQuery(queryKey, queryFn, options);
} 